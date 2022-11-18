import { GetParametrizedRouteType, ParametrizedRouteType } from '@episto/communication';
import { useCallback, useMemo } from 'react';
import { useEventManagerContext } from '../../components/system/EventManagerFrame';
import { EMPTY_ARRAY } from '../../helpers/emptyArray';
import { HelperHooks } from '../../helpers/hooks';
import { useForceUpdate } from '../frontendHelpers';
import { XQueryCore } from './XQueryCore';
import { QueryEventData, QueryResult } from './XQueryTypes';

const useXQuery = <TData extends Object>(url: string, query?: any, isEnabled?: boolean): QueryResult<TData | null> => {

    const forceUpdate = useForceUpdate();
    const globalEventManager = useEventManagerContext();

    const memoizedQuery = HelperHooks
        .useMemoize(query);

    const onQuery = useCallback((data: QueryEventData) => {

        globalEventManager
            .fireEvent('onquery', data);
    }, [globalEventManager]);

    const xQuery = useMemo(() => new XQueryCore<TData>(url, forceUpdate, onQuery), [url, onQuery, forceUpdate]);

    const queryState = xQuery.tryQuery(memoizedQuery, isEnabled);

    const refetch = useCallback(() => xQuery.fetchAsync(memoizedQuery, isEnabled), [memoizedQuery, isEnabled, xQuery]);

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