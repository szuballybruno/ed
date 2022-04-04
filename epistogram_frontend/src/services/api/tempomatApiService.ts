import { apiRoutes } from '../../shared/types/apiRoutes';
import { TempomatModeType } from '../../shared/types/sharedTypes';
import { useReactQuery2 } from '../../static/frontendHelpers';
import { usePostDataUnsafe } from '../core/httpClient';

export const useTempomatMode = (courseId: number, enabled: boolean) => {

    const qr = useReactQuery2<TempomatModeType>(apiRoutes.tempomat.getTempomatMode, { courseId }, enabled);

    return {
        tempomatMode: qr.data ?? null,
        refetchTempomatMode: qr.refetch
    };
};

export const useSetTempomatMode = () => {

    const qr = usePostDataUnsafe<{ mode: TempomatModeType, courseId: number }, void>(apiRoutes.tempomat.setTempomatMode);

    return {
        setTempomatMode: qr.postDataAsync
    };
};