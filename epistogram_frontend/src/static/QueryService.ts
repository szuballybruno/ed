import { useCallback, useMemo } from 'react';
import { EMPTY_ARRAY } from '../helpers/emptyArray';
import { LoadingStateType } from '../models/types';
import { httpGetAsync } from '../services/core/httpClient';
import { GetParametrizedRouteType, ParametrizedRouteType } from '../shared/types/apiRoutes';
import { ErrorWithCode } from '../shared/types/ErrorWithCode';
import { eventBus } from './EventBus';
import { useForceUpdate } from './frontendHelpers';
import { Logger } from './Logger';

export type QueryState<T> = {
    state: LoadingStateType;
    data: T;
    error: ErrorWithCode | null;
}

export type QueryResult<T> = QueryState<T> & {
    refetch: () => Promise<void>;
}

export type QueryEventData = {
    route: string;
} & QueryState<any>;

class GlobalQueryStateType {
    params: any[];
    qr: QueryState<any>;
};

class XQueryGlobalState {

    static globalState: { [K: string]: GlobalQueryStateType } = {};

    static getState(url: string) {

        // get item, and validate by key
        const state = this.globalState[url];
        if (!state) {

            return null;
        }

        return state;
    };

    static setState(url: string, state: GlobalQueryStateType) {

        Logger.logScoped('QUERY', `-- [${url}] Setting global state - ${state.qr.state} - ${JSON.stringify(state.params)}...`);
        this.globalState[url] = state;
    };
}

class XQueryCore<T> {

    private _idleState: QueryState<T | null> = {
        data: null,
        error: null,
        state: 'idle'
    };

    constructor(private _url, private _onChange: () => void) {
    }

    tryQuery(query: any, isEnabled?: boolean): QueryState<T | null> {

        const url = this._url;

        const queryRes = (() => {

            Logger.logScoped('QUERY', `[${url}] Querying begin...`);

            // get state from global store 
            const cachedState = XQueryGlobalState
                .getState(url);

            // process query object 
            const newQueryParams = this
                ._processQueryObj(query);

            /**
             * If querying is disabled 
             * return last state or idle 
             */
            const queryingEnabled = isEnabled === false ? false : true;
            if (!queryingEnabled) {

                Logger.logScoped('QUERY', `-- [${url}] Query is not enabled.`);

                return this._idleState;
            }

            /**
             * Never set cache - meaning query is still in IDLE state
             */
            if (!cachedState) {

                this.fetchAsync(newQueryParams, queryingEnabled);
                return this._idleState;
            }

            /**
             * If has been queried before, but querying again, 
             * and is currently loading, 
             * return last cahced state
             */
            if (cachedState?.qr?.state === 'loading') {

                Logger.logScoped('QUERY', `-- [${url}] Query is already in loading state.`);
                return cachedState.qr;
            }

            /**
             * Check if old cache is still valid 
             */
            if (!this._isCacheValid(url, newQueryParams, cachedState.params)) {

                // fetch data
                this.fetchAsync(newQueryParams, isEnabled);
            }

            /**
             * No exceptional state has been found, 
             * returning last cached data
             */
            Logger.logScoped('QUERY', `-- [${url}] Old data is still valid. `);
            return cachedState.qr;
        })();

        Logger.logScoped('QUERY', `-- [${url}] Result: ${queryRes.data === null ? 'null' : ''}`, queryRes.data);

        return queryRes;
    }

    async fetchAsync(queryObject: any, isEnabled?: boolean) {

        const url = this._url;

        // check if querying is enabled 
        const queryingEnabled = isEnabled === false ? false : true;
        if (!queryingEnabled) {

            Logger.logScoped('QUERY', `-- [${url}] Query is not enabled.`);
            return;
        }

        // get state from global store 
        const state = XQueryGlobalState
            .getState(url);

        Logger.logScoped('QUERY', `-- [${url}] Fetching...`);

        this._setGlobalState(url, {
            params: queryObject,
            qr: {
                state: 'loading',
                error: null,
                data: state?.qr?.data ?? null
            }
        });

        try {

            // fetch data
            const data = await httpGetAsync(url, queryObject);

            this._setGlobalState(url, {
                params: queryObject,
                qr: {
                    state: 'success',
                    error: null,
                    data: data
                }
            });
        }
        catch (e: any) {

            this._setGlobalState(url, {
                params: queryObject,
                qr: {
                    state: 'error',
                    error: e,
                    data: null
                }
            });
        }
    }

    private _isCacheValid(url: string, newQueryParams: any, cachedQueryParams: any): boolean {

        // Logger.logScoped('QUERY', `-- Comparing new/cahced query params: ${JSON.stringify(newQueryParams)} - ${JSON.stringify(cachedQueryParams)}`);

        if (!cachedQueryParams)
            return false;

        const unequalKeys = Object
            .keys(newQueryParams)
            .filter(key => {

                return cachedQueryParams[key] !== newQueryParams[key];
            });

        if (unequalKeys.length > 0) {

            Logger.logScoped('QUERY', `-- [${url}] ` + unequalKeys
                .map(key => `Cache key (${key}) value mismatch: ${JSON.stringify(cachedQueryParams[key])} <> ${JSON.stringify(newQueryParams[key])}`)
                .join('\n'));

            return false;
        }

        return true;
    }

    private _processQueryObj(query: any) {

        if (!query)
            return {};

        const obj = {} as any;
        Object
            .keys(query)
            .filter(key => query[key] !== undefined)
            .forEach(key => obj[key] = query[key]);
        return obj;
    }

    private _setGlobalState(url: string, newState: GlobalQueryStateType) {

        // set new state
        XQueryGlobalState
            .setState(url, newState);

        // call events
        this._onChange();
        this._execOnQueryEvent(url, newState.qr);
    }

    private _execOnQueryEvent(url: string, qr: QueryState<any>) {

        const data: QueryEventData = { ...qr, route: url };

        eventBus
            .fireEvent('onquery', data);
    }
}

const useXQuery = <TData extends Object>(url: string, query?: any, isEnabled?: boolean): QueryResult<TData | null> => {

    const forceUpdate = useForceUpdate();

    const xQuery = useMemo(() => new XQueryCore<TData>(url, forceUpdate), [url, forceUpdate]);

    const queryState = xQuery.tryQuery(query, isEnabled);

    const refetch = useCallback(() => xQuery.fetchAsync(query, isEnabled), [query, isEnabled, xQuery]);

    return { ...queryState, refetch };
};

const useXQueryParametrized = <
    TData extends Object,
    TRoute extends ParametrizedRouteType<any>>(
        route: TRoute,
        query?: GetParametrizedRouteType<TRoute>['query'],
        isEnabled?: boolean): QueryResult<TData | null> => {

    return useXQuery(route as string, query, isEnabled);
};

const useXQueryArray = <TData>(url: string, queryParams?: any, isEnabled?: boolean): QueryResult<TData[]> => {

    const { data, ...qr } = useXQuery<TData[]>(url, queryParams, isEnabled);

    return {
        ...qr,
        data: data ?? EMPTY_ARRAY
    };
};

const useXQueryArrayParametrized = <
    TData extends Object,
    TRoute extends ParametrizedRouteType<any>>(
        data: { new(): TData },
        route: TRoute,
        query?: GetParametrizedRouteType<TRoute>['query'],
        isEnabled?: boolean): QueryResult<TData[]> => {

    return useXQueryArray(route as string, query, isEnabled);
};

export const QueryService = {
    useXQuery,
    useXQueryParametrized,
    useXQueryArray,
    useXQueryArrayParametrized
};