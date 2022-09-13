import { useCallback, useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
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

const useXQuery = <T extends Object>(url: string, queryParams?: any, isEnabled?: boolean): QueryResult<T | null> => {

    const queryValues = (() => {

        if (!queryParams)
            return EMPTY_ARRAY;

        return Object
            .values(queryParams)
            .filter(queryParam => !!queryParam);
    })();

    const getFunction = useCallback(() => {

        return httpGetAsync(url, queryParams);
    }, [url, queryParams]);

    const queryingEnabled = isEnabled === false ? false : true;

    const options = useMemo(() => ({
        retry: false,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        enabled: queryingEnabled
    }), [queryingEnabled]);

    const paramsArray = useMemo(() => ([url, ...queryValues]), [url, queryValues]);

    // useEffect(() => {


    // }, paramsArray);

    /**
     * Call react query 
     */
    const queryResult = useQuery(paramsArray, getFunction, options);

    const state = useMemo((): LoadingStateType => {

        if (queryResult.isIdle)
            return 'idle';

        if (queryResult.isFetching)
            return 'loading';

        if (queryResult.isError)
            return 'error';

        return 'success';
    }, [queryResult.isIdle, queryResult.isFetching, queryResult.isError]);

    const refetch = useCallback(async () => {

        if (!queryingEnabled)
            return;

        await queryResult.refetch();
    }, [queryingEnabled, queryResult]);

    const data = useMemo((): T => {

        return queryResult.data
            ? queryResult.data
            : null;
    }, [queryResult.data]);

    const error = queryResult.error as ErrorWithCode | null;

    const qr = useMemo(() => ({
        refetch,
        state,
        data,
        error
    }), [
        refetch,
        state,
        data,
        error
    ]);

    useEffect(() => {

        const data: QueryEventData = { ...qr, route: url };

        eventBus
            .fireEvent('onquery', data);
    }, [url, qr]);

    console.log(qr);

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