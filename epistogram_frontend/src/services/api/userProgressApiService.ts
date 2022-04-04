import { RecomendedItemQuotaDTO } from '../../shared/dtos/RecomendedItemQuotaDTO';
import { UserActiveCourseDTO } from '../../shared/dtos/UserActiveCourseDTO';
import { UserCourseProgressChartDTO } from '../../shared/dtos/UserCourseProgressChartDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { useReactQuery2 } from '../../static/frontendHelpers';

export const useUserProgressData = (courseId: number, enabled: boolean) => {

    const qr = useReactQuery2<UserCourseProgressChartDTO>(apiRoutes.userProgress.getUserProgressData, { courseId }, enabled);

    return {
        userProgressData: qr.data,
        userProgressDataState: qr.state,
        userProgressDataError: qr.error
    };
};

export const useRecommendedItemQuota = (courseId: number, enabled: boolean) => {

    const qr = useReactQuery2<RecomendedItemQuotaDTO>(apiRoutes.userProgress.getRecommendedItemQuota, { courseId }, enabled);

    return {
        recommendedItemQuota: qr.data,
        recommendedItemQuotaState: qr.state,
        recommendedItemQuotaError: qr.error,
        refetchRecommendedItemQuota: qr.refetch
    };
};

export const useActiveCourses = () => {

    const qr = useReactQuery2<UserActiveCourseDTO[]>(apiRoutes.userProgress.getActiveCourses);

    return {
        activeCourses: qr.data ?? [],
        activeCoursesState: qr.state,
        activeCoursesError: qr.error
    };
};