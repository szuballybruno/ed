import { useCallback, useMemo, useState } from 'react';
import { EMPTY_ARRAY } from '../helpers/emptyArray';
import { LoadingStateType } from '../models/types';
import { httpGetAsync } from '../services/core/httpClient';
import { GetParametrizedRouteType, ParametrizedRouteType } from '../shared/types/apiRoutes';
import { ErrorWithCode } from '../shared/types/ErrorWithCode';
import { eventBus } from './EventBus';
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

class QueryStateType {
    params: any[];
    qr: QueryState<any>;
};

class XQueryGlobalState {

    static globalState: { [K: string]: QueryStateType } = {};

    static getState(url: string) {

        // get item, and validate by key
        const state = this.globalState[url];
        if (!state) {

            return null;
        }

        return state;
    };

    static setState(url: string, state: QueryStateType) {

        Logger.logScoped('QUERY', `-- Setting cache item ${url}...`);
        this.globalState[url] = state;
    };
}

class XQueryCore<T> {

    constructor(private _url, private _onChange: (queryResult: QueryState<T | null>) => void) {

        this._onChange(XQueryGlobalState.getState(this._url)?.qr ?? { data: null, error: null, state: 'idle' });
    }

    async tryQueryAsync(query: any, isEnabled?: boolean) {

        const url = this._url;
        Logger.logScoped('QUERY', `Querying: ${url}`);

        // check if querying is enabled 
        const queryingEnabled = isEnabled === false ? false : true;
        if (!queryingEnabled) {

            Logger.logScoped('QUERY', `-- [CANCEL] Query is not enabled. ${url}`);
            return;
        }

        // process query object 
        const newQueryParams = this
            ._processQueryObj(query);

        // get state from global store 
        const state = XQueryGlobalState
            .getState(url);

        // check if is loading currently 
        if (state?.qr?.state === 'loading') {

            Logger.logScoped('QUERY', `-- [CANCEL] Query is already in loading state. ${url}`);
            return;
        }

        // check data cache
        const isOldDataStillValid = this
            ._checkCache(newQueryParams, state?.params);

        if (isOldDataStillValid) {

            Logger.logScoped('QUERY', `-- [CANCEL] Old data is still valid. ${url}`);
            return;
        }

        // fetch data
        await this.fetchAsync(newQueryParams, isEnabled);
    }

    async fetchAsync(queryObject: any, isEnabled?: boolean) {

        const url = this._url;

        // check if querying is enabled 
        const queryingEnabled = isEnabled === false ? false : true;
        if (!queryingEnabled) {

            Logger.logScoped('QUERY', `-- [CANCEL] Query is not enabled. ${url}`);
            return;
        }

        // get state from global store 
        const state = XQueryGlobalState
            .getState(url);

        Logger.logScoped('QUERY', `-- Fetching: ${url}`);

        this._setState(url, {
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

            this._setState(url, {
                params: queryObject,
                qr: {
                    state: 'success',
                    error: null,
                    data: data
                }
            });
        }
        catch (e: any) {

            this._setState(url, {
                params: queryObject,
                qr: {
                    state: 'error',
                    error: e,
                    data: null
                }
            });
        }
    }

    private _checkCache(newParams: any, oldParams: any): boolean {

        if (!oldParams)
            return false;

        const unequalKeys = Object
            .keys(newParams)
            .filter(key => {

                const cacheParamsValue = oldParams[key];

                return cacheParamsValue !== newParams[key];
            });

        if (unequalKeys.length > 0) {

            Logger.logScoped('QUERY', '--' + unequalKeys
                .map(key => `Cache key (${key}) value mismatch: ${JSON.stringify(oldParams[key])} <> ${JSON.stringify(newParams[key])}`)
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

    private _setState(url: string, newState: QueryStateType) {

        // set new state
        XQueryGlobalState.setState(url, newState);

        // call events
        this._onChange(newState.qr);
        this._execOnQueryEvent(url, newState.qr);
    }

    private _execOnQueryEvent(url: string, qr: QueryState<any>) {

        const data: QueryEventData = { ...qr, route: url };

        eventBus
            .fireEvent('onquery', data);
    }
}

const useXQuery = <TData extends Object>(url: string, query?: any, isEnabled?: boolean): QueryResult<TData | null> => {

    const [queryState, setQueryState] = useState<QueryState<any>>({
        data: null,
        error: null,
        state: 'idle'
    });

    const xQuery = useMemo(() => new XQueryCore(url, setQueryState), [url]);

    xQuery.tryQueryAsync(query, isEnabled);

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