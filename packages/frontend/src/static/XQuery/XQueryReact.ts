import { GetParametrizedRouteType, ParametrizedRouteType } from '@episto/communication';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useEventManagerContext } from '../../components/system/EventManagerFrame';
import { EMPTY_ARRAY } from '../../helpers/emptyArray';
import { HelperHooks } from '../../helpers/hooks';
import { Logger } from '../Logger';
import { XQueryCore } from './XQueryCore';
import { GlobalQueryStateType, QueryEventType, QueryHookResultType, QueryStateType } from './XQueryTypes';

/**
 * @deprecated Use: useXQueryNew
 */
const useXQuery = <TData extends Object>(url: string, query?: any, isEnabled?: boolean): QueryHookResultType<TData | null> => {

    return useXQueryNew(url, { query, isEnabled });
};

const useXQueryNew = <TData extends Object>(
    url: string,
    options?: {
        query?: any,
        isEnabled?: boolean,
        refetchOnMount?: boolean
    }): QueryHookResultType<TData | null> => {

    const { isEnabled, query, refetchOnMount } = options ?? {};

    const initalStateOnMount = useMemo(() => XQueryCore
        .getState(url), [url]);

    const [result, setResult] = useState<QueryStateType>(initalStateOnMount.qr);

    const globalEventManager = useEventManagerContext();

    const memoizedQuery = HelperHooks
        .useMemoize(query);

    const onQuery = useCallback((data: QueryEventType) => {

        globalEventManager
            .fireEvent('onquery', data);
    }, [globalEventManager]);

    const handleChange = useCallback((state: GlobalQueryStateType) => {

        const res = {
            ...state.qr
        };

        Logger.logScoped('QUERY', `${state.url} Setting result: `, state.qr.data);

        setResult(res);

        onQuery({
            ...state.qr,
            url: state.url
        });
    }, [setResult, onQuery]);

    const xQueryCore = useMemo(() => new XQueryCore<TData>(url, handleChange), [handleChange, url]);

    /**
     * Lifecycle 
     */
    useEffect(() => {

        return () => {

            xQueryCore.destroy();
        };
    }, [xQueryCore]);

    // ping xquery core on every render 
    xQueryCore
        .tryQuery(memoizedQuery, isEnabled);

    const refetch = useCallback(async () => {

        await xQueryCore
            .refetchAsync(memoizedQuery, isEnabled);
    }, [memoizedQuery, isEnabled, xQueryCore]);

    /**
     * Refetch on mount 
     */
    useEffect(() => {

        if (!refetchOnMount)
            return;

        // if state is idle, 
        // meaning this has never been fetched before,
        // do not refetch
        if (initalStateOnMount.qr.state === 'idle')
            return;

        refetch();
    }, [refetch, refetchOnMount, initalStateOnMount]);

    const finalResult = useMemo<QueryHookResultType<TData | null>>(() => ({
        ...result,
        refetch
    }), [result, refetch]);

    Logger.logScoped('QUERY', `${url} fr data `, finalResult.data);

    return finalResult;
};

const useXQueryParametrized = <
    TData extends Object,
    TRoute extends ParametrizedRouteType<any>>(
        route: TRoute,
        query?: GetParametrizedRouteType<TRoute>['query'],
        isEnabled?: boolean): QueryHookResultType<TData | null> => {

    return useXQuery(route as string, query, isEnabled);
};

/**
 * @deprecated Use: useXQueryArrayParametrized
 */
const useXQueryArray = <TData>(url: string, queryParams?: any, isEnabled?: boolean): QueryHookResultType<TData[]> => {

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
        isEnabled?: boolean): QueryHookResultType<TData[]> => {

    return useXQueryArray(route as string, query, isEnabled);
};

export const QueryService = {
    useXQuery,
    useXQueryNew,
    useXQueryParametrized,
    useXQueryArray,
    useXQueryArrayParametrized
};