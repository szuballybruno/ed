import { useContext, useCallback } from 'react';
import { ErrorType, LoadingFrameContext } from '../../components/system/LoadingFrameNew';
import { LoadingStateType } from '../../models/types';

export type LoadingLogicType = {
    loadingState?: LoadingStateType | LoadingStateType[],
    error?: ErrorType,
    onlyRenderIfLoaded?: boolean,
    setLoading: (state: LoadingStateType | LoadingStateType[]) => void
};

export const useLoading = () => {

    const loadingLogic = useContext(LoadingFrameContext);

    const setLoading = useCallback((state: LoadingStateType | LoadingStateType[]) => {

        loadingLogic?.setLoading(state);
    }, [loadingLogic]);

    return setLoading;
};
