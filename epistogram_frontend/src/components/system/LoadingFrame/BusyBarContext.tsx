import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { LoadingStateType } from '../../../models/types';
import { useForceUpdate, useGetCurrentAppRoute } from '../../../static/frontendHelpers';

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

    const stateRef = useRef<{ [K: string]: BusyStateType }>({});
    const forceUpdate = useForceUpdate();

    const setBusy = useCallback((key: string, loadingState: LoadingStateType, error?: ErrorType) => {

        const state: BusyStateType = {
            key,
            error: error ?? null,
            loadingState
        };

        const newState = { ...stateRef.current };
        newState[key] = state;

        stateRef.current = newState;
        forceUpdate();
    }, []);

    const { error, isBusy } = useMemo(() => {

        const states = Object
            .values(stateRef.current);

        const isBusy = states
            .any(x => !!x.error || x.loadingState === 'error' || x.loadingState === 'loading');

        const error = states
            .filter(x => !!x.error)[0]?.error ?? null;

        return { isBusy, error };
    }, [stateRef.current]);

    const appRoute = useGetCurrentAppRoute();

    useEffect(() => {

        console.log('asd');
        stateRef.current = {};
        forceUpdate();
    }, [appRoute]);

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
    }, [setBusy, loadingState, error]);
};

