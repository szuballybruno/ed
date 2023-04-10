import { Id } from '@episto/commontypes';
import { apiRoutes, CourseProgressOverviewDTO, RecommendedItemQuotaDTO, UserActiveCourseDTO, UserCourseProgressChartDTO } from '@episto/communication';
import { QueryService } from '../../static/XQuery/XQueryReact';

export const useUserCourseProgressChartData = (courseId: Id<'Course'> | null, enabled: boolean) => {


    const qr = QueryService.useXQuery<UserCourseProgressChartDTO | 'NO DATA'>(apiRoutes.userProgress.getUserProgressData, { courseId }, enabled);

    return {
        userProgressData: qr.data as UserCourseProgressChartDTO,
        userProgressDataState: qr.state,
        userProgressDataError: qr.error,
        userProgressDataIsValid: qr.data && qr.data != 'NO DATA'
    };
};

export const useCourseProgressOverview = (courseId?: Id<'Course'>) => {

    const qr = QueryService
        .useXQuery<CourseProgressOverviewDTO>(apiRoutes.userProgress.getCourseProgressOverview, { courseId }, !!courseId);

    return {
        courseProgressOverviewData: qr.data,
        recommendedItemQuotaState: qr.state,
        recommendedItemQuotaError: qr.error,
        refetchRecommendedItemQuota: qr.refetch
    };
};

export const useRecommendedItemQuota = (courseId?: Id<'Course'>) => {

    const qr = QueryService.useXQuery<RecommendedItemQuotaDTO>(apiRoutes.userProgress.getRecommendedItemQuota, { courseId }, !!courseId);

    return {
        recommendedItemQuota: qr.data,
        recommendedItemQuotaState: qr.state,
        recommendedItemQuotaError: qr.error,
        refetchRecommendedItemQuota: qr.refetch
    };
};

export const useActiveCourses = () => {

    const qr = QueryService
        .useXQuery<UserActiveCourseDTO[]>(apiRoutes.userProgress.getActiveCourses);

    return {
        activeCourses: qr.data ?? [],
        activeCoursesState: qr.state,
        activeCoursesError: qr.error
    };
};