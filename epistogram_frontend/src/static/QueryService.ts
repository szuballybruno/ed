import { useCallback, useMemo, useState } from 'react';
import { EMPTY_ARRAY } from '../helpers/emptyArray';
import { LoadingStateType } from '../models/types';
import { httpGetAsync } from '../services/core/httpClient';
import { ErrorWithCode } from '../shared/types/ErrorWithCode';
import { eventBus } from './EventBus';

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

        console.log(`-- Setting cache item ${url}...`);
        this.globalState[url] = state;
    };
}

class XQueryCore<T> {

    constructor(private _url, private _onChange: (queryResult: QueryState<T | null>) => void) {

        this._onChange(XQueryGlobalState.getState(this._url)?.qr ?? { data: null, error: null, state: 'idle' });
    }

    async tryQueryAsync(query: any, isEnabled?: boolean) {

        const url = this._url;
        console.log(`Querying: ${url}`);

        // check if querying is enabled 
        const queryingEnabled = isEnabled === false ? false : true;
        if (!queryingEnabled) {

            console.log(`-- [CANCEL] Query is not enabled. ${url}`);
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

            console.log(`-- [CANCEL] Query is already in loading state. ${url}`);
            return;
        }

        // check data cache
        const isOldDataStillValid = this
            ._checkCache(newQueryParams, state?.params);

        if (isOldDataStillValid) {

            console.log(`-- [CANCEL] Old data is still valid. ${url}`);
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

            console.log(`-- [CANCEL] Query is not enabled. ${url}`);
            return;
        }

        console.log(`-- Fetching: ${url}`);

        this._setState(url, {
            params: queryObject,
            qr: {
                state: 'loading',
                error: null,
                data: null
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

            console.log('--' + unequalKeys
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

const useXQueryArray = <T>(url: string, queryParams?: any, isEnabled?: boolean): QueryResult<T[]> => {

    const { data, ...qr } = useXQuery<T[]>(url, queryParams, isEnabled);

    return {
        ...qr,
        data: data ?? EMPTY_ARRAY
    };
};

export const QueryService = {
    useXQuery,
    useXQueryArray
};