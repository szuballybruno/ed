import { DailyTipDTO } from "../../models/shared_models/DailyTipDTO";
import { DailyTipEditDataDTO } from "../../models/shared_models/DailyTipEditDataDTO";
import { apiRoutes } from "../../models/shared_models/types/apiRoutes";
import { useReactQuery2 } from "../../static/frontendHelpers";
import { usePostDataUnsafe } from "../core/httpClient";

export const useDailyTip = () => {

    const qr = useReactQuery2<DailyTipDTO>(apiRoutes.dailyTip.getDailyTip);

    return {
        dailyTipData: qr.data,
        dailyTipError: qr.error,
        dailyTipState: qr.state
    }
}

export const useDailyTipEditData = (dailyTipId: number) => {

    const qr = useReactQuery2<DailyTipEditDataDTO>(apiRoutes.dailyTip.getDailyTipEditData, { dailyTipId });

    return {
        dailyTipEditData: qr.data,
        dailyTipEditError: qr.error,
        dailyTipEditState: qr.state
    }
}

export const useSaveDailyTip = () => {

    const qr = usePostDataUnsafe<DailyTipEditDataDTO, void>(apiRoutes.dailyTip.saveDailyTip);

    return {
        saveDailyTipAsync: qr.postDataAsync,
        saveDailyTipState: qr.state,
    }
}

export const useCreateDailyTip = () => {

    const qr = usePostDataUnsafe<{ personalityTraitCategoryId: number, isMax: boolean }, void>(apiRoutes.dailyTip.createDailyTip);

    return {
        createDailyTipAsync: qr.postDataAsync,
        createDailyTipState: qr.state
    }
}

export const useDeleteDailyTip = () => {

    const qr = usePostDataUnsafe<{ dailyTipId: number }, void>(apiRoutes.dailyTip.deleteDailyTip);

    return {
        deleteDailyTipAsync: qr.postDataAsync,
        deleteDailyTipState: qr.state
    }
}