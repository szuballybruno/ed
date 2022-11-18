import { GetParametrizedRouteType, ParametrizedRouteType } from '@episto/communication';
import { useCallback, useMemo } from 'react';
import { useEventManagerContext } from '../../components/system/EventManagerFrame';
import { EMPTY_ARRAY } from '../../helpers/emptyArray';
import { useForceUpdate } from '../frontendHelpers';
import { XQueryCore } from './XQueryCore';
import { QueryResult, QueryEventData } from './XQueryTypes';

const useXQuery = <TData extends Object>(url: string, query?: any, isEnabled?: boolean): QueryResult<TData | null> => {

    const forceUpdate = useForceUpdate();
    const globalEventManager = useEventManagerContext();

    const onQuery = (data: QueryEventData) => {

        globalEventManager
            .fireEvent('onquery', data);
    };

    const xQuery = useMemo(() => new XQueryCore<TData>(url, forceUpdate, onQuery), [url, forceUpdate]);

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