import { useReactQuery } from "../frontendHelpers";
import { DailyTipDTO } from "../models/shared_models/DailyTipDTO";
import { apiRoutes } from "../models/shared_models/types/apiRoutes";
import { httpGetAsync } from "./httpClient";

export const useDailyTip = () => {

    const qr = useReactQuery<DailyTipDTO>(
        ["getDailyTipQuery"],
        () => httpGetAsync(apiRoutes.misc.getDailyTip));

    return {
        dailyTipData: qr.data,
        dailyTipError: qr.error,
        dailyTipState: qr.status
    }
}