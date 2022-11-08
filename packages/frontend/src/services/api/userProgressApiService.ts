import { RecomendedItemQuotaDTO } from '@episto/communication';
import { UserActiveCourseDTO } from '@episto/communication';
import { UserCourseProgressChartDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
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