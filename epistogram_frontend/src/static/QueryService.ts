import { useCallback, useEffect, useMemo, useState } from 'react';
import { EMPTY_ARRAY } from '../helpers/emptyArray';
import { LoadingStateType } from '../models/types';
import { httpGetAsync } from '../services/core/httpClient';
import { ErrorWithCode } from '../shared/types/ErrorWithCode';
import { eventBus } from './EventBus';

export type QueryResultState<T> = {
    state: LoadingStateType;
    data: T;
    error: ErrorWithCode | null;
}

export type QueryResult<T> = QueryResultState<T> & {
    refetch: () => Promise<void>;
}

export type QueryEventData = {
    route: string;
} & QueryResultState<any>;

const useXQuery = <TData extends Object>(url: string, queryParams?: any, isEnabled?: boolean): QueryResult<TData | null> => {

    const queryValues = (() => {

        if (!queryParams)
            return EMPTY_ARRAY;

        return Object
            .values(queryParams)
            .filter(queryParam => !!queryParam);
    })();

    const queryingEnabled = isEnabled === false ? false : true;

    /**
     * State 
     */
    const [fetchState, setFetchState] = useState<LoadingStateType>('idle');
    const [error, setError] = useState<ErrorWithCode | null>(null);
    const [data, setData] = useState<TData | null>(null);

    /**
     * Fetch funciton 
     */
    const fetchDataAsync = useCallback(async () => {

        if (!queryingEnabled)
            return;

        setFetchState('loading');

        try {

            const data = await httpGetAsync(url, queryParams);
            setFetchState('success');
            setData(data);
        }
        catch (e: any) {

            setFetchState('error');
            setError(e);
            setData(null);
        }
    }, [url, queryParams, queryingEnabled]);

    /**
     * Auto fetch by watching for param changes 
     */
    const paramsArray = useMemo(() => ([url, ...queryValues]), [url, queryValues]);

    useEffect(() => {

        fetchDataAsync();
    }, paramsArray);

    /**
     * Result object 
     */
    const qr = useMemo(() => ({
        refetch: fetchDataAsync,
        state: fetchState,
        data,
        error
    }), [
        fetchDataAsync,
        fetchState,
        data,
        error
    ]);

    /**
     * Event handlers 
     */
    useEffect(() => {

        const data: QueryEventData = { ...qr, route: url };

        eventBus
            .fireEvent('onquery', data);
    }, [url, qr]);

    return qr;
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