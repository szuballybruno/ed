import { RecomendedItemQuotaDTO } from '../../shared/dtos/RecomendedItemQuotaDTO';
import { UserActiveCourseDTO } from '../../shared/dtos/UserActiveCourseDTO';
import { UserCourseProgressChartDTO } from '../../shared/dtos/UserCourseProgressChartDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { Id } from '../../shared/types/versionId';
import { QueryService } from '../../static/QueryService';

export const useUserCourseProgressChartData = (courseId: Id<'Course'> | null, enabled: boolean) => {

    const qr = QueryService.useXQuery<UserCourseProgressChartDTO | 'NO DATA'>(apiRoutes.userProgress.getUserProgressData, { courseId }, enabled);

    return {
        userProgressData: qr.data as UserCourseProgressChartDTO,
        userProgressDataState: qr.state,
        userProgressDataError: qr.error,
        userProgressDataIsValid: qr.data && qr.data != 'NO DATA'
    };
};

export const useRecommendedItemQuota = (courseId?: Id<'Course'>) => {

    const qr = QueryService.useXQuery<RecomendedItemQuotaDTO>(apiRoutes.userProgress.getRecommendedItemQuota, { courseId }, !!courseId);

    return {
        recommendedItemQuota: qr.data,
        recommendedItemQuotaState: qr.state,
        recommendedItemQuotaError: qr.error,
        refetchRecommendedItemQuota: qr.refetch
    };
};

export const useActiveCourses = () => {

    const qr = QueryService.useXQuery<UserActiveCourseDTO[]>(apiRoutes.userProgress.getActiveCourses);

    return {
        activeCourses: qr.data ?? [],
        activeCoursesState: qr.state,
        activeCoursesError: qr.error
    };
};