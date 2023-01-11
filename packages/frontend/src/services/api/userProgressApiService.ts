import { CourseProgressOverviewDTO, UserActiveCourseDTO, UserProgressChartStep } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { QueryService } from '../../static/XQuery/XQueryReact';

export const useUserCourseProgressChartData = (courseId: Id<'Course'> | null, enabled: boolean) => {

    const qr = QueryService
        .useXQueryArray<UserProgressChartStep>(apiRoutes.userProgress.getUserProgressData, { courseId }, enabled);

    return {
        userProgressData: qr
            .data
            .map(x => ({
                ...x,
                date: new Date(x.date)
            })),
        userProgressDataState: qr.state,
        userProgressDataError: qr.error
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

export const useActiveCourses = () => {

    const qr = QueryService
        .useXQuery<UserActiveCourseDTO[]>(apiRoutes.userProgress.getActiveCourses);

    return {
        activeCourses: qr.data ?? [],
        activeCoursesState: qr.state,
        activeCoursesError: qr.error
    };
};