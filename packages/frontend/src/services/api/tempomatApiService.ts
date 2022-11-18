import { apiRoutes } from '@episto/communication';
import { TempomatModeType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { QueryService } from '../../static/XQuery/XQueryReact';
import { usePostDataUnsafe } from '../core/httpClient';

export const useTempomatMode = (courseId: Id<'Course'>, enabled: boolean) => {

    const qr = QueryService.useXQuery<TempomatModeType>(apiRoutes.tempomat.getTempomatMode, { courseId }, enabled);

    return {
        tempomatMode: qr.data ?? null,
        refetchTempomatMode: qr.refetch
    };
};

export const useSetTempomatMode = () => {

    const qr = usePostDataUnsafe<{ mode: TempomatModeType, courseId: Id<'Course'> }, void>(apiRoutes.tempomat.setTempomatMode);

    return {
        setTempomatMode: qr.postDataAsync
    };
};