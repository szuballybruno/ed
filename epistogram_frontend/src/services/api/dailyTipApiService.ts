import { DailyTipDTO } from '../../shared/dtos/DailyTipDTO';
import { DailyTipEditDataDTO } from '../../shared/dtos/DailyTipEditDataDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { Id } from '../../shared/types/versionId';
import { useReactQuery2 } from '../../static/frontendHelpers';
import { usePostDataUnsafe } from '../core/httpClient';

export const useDailyTip = () => {

    const qr = useReactQuery2<DailyTipDTO>(apiRoutes.dailyTip.getDailyTip);

    return {
        dailyTipData: qr.data,
        dailyTipError: qr.error,
        dailyTipState: qr.state
    };
};

export const useDailyTipEditData = (dailyTipId: Id<'DailyTip'>) => {

    const qr = useReactQuery2<DailyTipEditDataDTO>(apiRoutes.dailyTip.getDailyTipEditData, { dailyTipId });

    return {
        dailyTipEditData: qr.data,
        dailyTipEditError: qr.error,
        dailyTipEditState: qr.state
    };
};

export const useSaveDailyTip = () => {

    const qr = usePostDataUnsafe<DailyTipEditDataDTO, void>(apiRoutes.dailyTip.saveDailyTip);

    return {
        saveDailyTipAsync: qr.postDataAsync,
        saveDailyTipState: qr.state,
    };
};

export const useCreateDailyTip = () => {

    const qr = usePostDataUnsafe<{ personalityTraitCategoryId: Id<'PersonalityTraitCategory'>, isMax: boolean }, void>(apiRoutes.dailyTip.createDailyTip);

    return {
        createDailyTipAsync: qr.postDataAsync,
        createDailyTipState: qr.state
    };
};

export const useDeleteDailyTip = () => {

    const qr = usePostDataUnsafe<{ dailyTipId: Id<'DailyTip'> }, void>(apiRoutes.dailyTip.deleteDailyTip);

    return {
        deleteDailyTipAsync: qr.postDataAsync,
        deleteDailyTipState: qr.state
    };
};