import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LoadingStateType } from '../../../models/types';
import { useGetCurrentAppRoute, useIsMatchingCurrentRoute } from '../../../static/frontendHelpers';

export type ErrorType = Object | null;

export type LoadingFramePropsType = {
    loadingState?: LoadingStateType | LoadingStateType[],
    error?: ErrorType,
    onlyRenderIfLoaded?: boolean
};

type BusyStateType = {
    loadingState: LoadingStateType,
    error: ErrorType,
    key: string
}

export const useBusyBarContext = () => {

    const [busyState, setBusyState] = useState<{ [K: string]: BusyStateType }>({});

    const setBusy = useCallback((key: string, loadingState: LoadingStateType, error?: ErrorType) => {

        const state: BusyStateType = {
            key,
            error: error ?? null,
            loadingState
        };

        const newState = { ...busyState };
        newState[key] = state;

        setBusyState(newState);
    }, [setBusyState, busyState]);

    const clearBusyState = useCallback(() => {

        setBusyState({});
    }, [setBusyState]);

    const { error, isBusy } = useMemo(() => {

        const states = Object
            .values(busyState);

        const isBusy = states
            .any(x => !!x.error || x.loadingState === 'error' || x.loadingState === 'loading');

        const error = states
            .filter(x => !!x.error)[0]?.error ?? null;

        return { isBusy, error };
    }, [busyState]);

    const appRoute = useGetCurrentAppRoute();

    useEffect(() => {

        clearBusyState();
    }, [clearBusyState, appRoute]);

    return {
        setBusy,
        error,
        isBusy
    };
};

export type BusyBarContextType = ReturnType<typeof useBusyBarContext>;

export const BusyBarContext = createContext<BusyBarContextType>({} as BusyBarContextType);

export const useSetBusy = (loadingFunction: (...args: any[]) => any, loadingState: LoadingStateType, error?: ErrorType) => {

    const { setBusy } = useContext(BusyBarContext);

    useEffect(() => {

        setBusy(loadingFunction.name, loadingState, error);
    }, [setBusy]);
};

