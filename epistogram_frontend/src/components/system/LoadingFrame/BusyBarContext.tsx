import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LoadingStateType } from '../../../models/types';
import { DictionaryOfT, useGetCurrentAppRoute } from '../../../static/frontendHelpers';
import { Logger } from '../../../static/Logger';

export type ErrorType = null | { message: string };

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

type StateType = DictionaryOfT<BusyStateType>;

export const useBusyBarContext = () => {

    const [managerState, setManagerState] = useState<StateType>({});

    const setBusy = useCallback((key: string, loadingState: LoadingStateType, error?: ErrorType) => {

        if (!key || key === '')
            throw new Error('Key cant be null or undefiend or empty string!');

        if (managerState[key]?.loadingState === loadingState)
            return;

        Logger.logScoped('BUSY', `Setting busy... ${key} - ${loadingState} - ${error?.message}`);

        const state: BusyStateType = {
            key,
            error: error ?? null,
            loadingState
        };

        const newManagerState = { ...managerState };
        newManagerState[key] = state;

        setManagerState(newManagerState);
    }, [managerState]);

    const { error, isError, isBusy } = useMemo(() => {

        const states = Object
            .values(managerState);

        const isBusy = states
            .some(x => x.loadingState === 'loading');

        const isError = states
            .some(x => !!x.error || x.loadingState === 'error');

        const error = states
            .filter(x => !!x.error)[0]?.error ?? null;

        return { isBusy, isError, error };
    }, [managerState]);

    const appRoute = useGetCurrentAppRoute();

    useEffect(() => {

        setManagerState({});
    }, [appRoute]);

    const busyStateOut = {
        setBusy,
        error,
        isBusy,
        isError
    };

    return busyStateOut;
};

export type BusyBarContextType = ReturnType<typeof useBusyBarContext>;

export const BusyBarContext = createContext<BusyBarContextType>({} as BusyBarContextType);

export const useSetBusy = (loadingFunction: (...args: any[]) => any, loadingState: LoadingStateType, error?: ErrorType) => {

    if (!loadingFunction.name || loadingFunction.name === '')
        throw new Error('Loading function has no valid name!');

    const { setBusy } = useContext(BusyBarContext);

    useEffect(() => {

        setBusy(loadingFunction.name, loadingState, error);
    }, [setBusy, loadingState, error, loadingFunction]);
};

