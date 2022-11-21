import { GetParametrizedRouteType, ParametrizedRouteType } from '@episto/communication';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useEventManagerContext } from '../../components/system/EventManagerFrame';
import { EMPTY_ARRAY } from '../../helpers/emptyArray';
import { HelperHooks } from '../../helpers/hooks';
import { XQueryCore } from './XQueryCore';
import { GlobalQueryStateType, QueryEventType, QueryHookResultType, QueryStateType } from './XQueryTypes';

const useXQuery = <TData extends Object>(url: string, query?: any, isEnabled?: boolean): QueryHookResultType<TData | null> => {

    const defState = useMemo(() => XQueryCore.getState(url), [url]);
    const [result, setResult] = useState<QueryStateType>(defState.qr);

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

        setResult(res);

        onQuery({
            ...state.qr,
            url: state.url
        });
    }, [setResult, onQuery]);

    const xQueryCore = useMemo(() => new XQueryCore<TData>(url), [url]);

    useEffect(() => {

        return () => {

            xQueryCore.destroy();
        };
    }, [xQueryCore]);

    useEffect(() => {

        xQueryCore
            .setOnChangeCallback(handleChange);
    }, [xQueryCore, handleChange]);

    // ping xquery core on every render 
    xQueryCore
        .tryQuery(url, memoizedQuery, isEnabled);

    const refetch = useCallback(async () => {

        await xQueryCore
            .refetchAsync(url, memoizedQuery, isEnabled);
    }, [url, memoizedQuery, isEnabled, xQueryCore]);

    const finalResult = useMemo<QueryHookResultType<TData | null>>(() => ({
        ...result,
        refetch
    }), [result, refetch]);

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
    useXQueryParametrized,
    useXQueryArray,
    useXQueryArrayParametrized
};