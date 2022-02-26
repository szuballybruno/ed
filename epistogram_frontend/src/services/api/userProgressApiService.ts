import { RecomendedItemQuotaDTO } from "../../shared/dtos/RecomendedItemQuotaDTO";
import { UserCourseProgressChartDTO } from "../../shared/dtos/UserCourseProgressChartDTO";
import { apiRoutes } from "../../shared/types/apiRoutes";
import { useReactQuery2 } from "../../static/frontendHelpers";

export const useUserProgressData = () => {

    const qr = useReactQuery2<UserCourseProgressChartDTO>(apiRoutes.userProgress.getUserProgressData);

    return {
        userProgressData: qr.data,
        userProgressDataState: qr.state,
        userProgressDataError: qr.error
    }
}

export const useRecommendedItemQuota = () => {

    const qr = useReactQuery2<RecomendedItemQuotaDTO>(apiRoutes.userProgress.getRecommendedItemQuota);

    return {
        recommendedItemQuota: qr.data,
        recommendedItemQuotaState: qr.state,
        recommendedItemQuotaError: qr.error
    }
}