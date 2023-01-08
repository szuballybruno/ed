import { AdminCourseUserStatsDTO } from '@episto/communication';
import { AdminHomePageOverviewDTO } from '@episto/communication';
import { HomePageStatsDTO } from '@episto/communication';
import { UserCourseStatsDTO } from '@episto/communication';
import { UserCourseStatsOverviewDTO } from '@episto/communication';
import { UserExamStatsDTO } from '@episto/communication';
import { UserLearningPageStatsDTO } from '@episto/communication';
import { UserModuleStatsDTO } from '@episto/communication';
import { UserVideoStatsDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { CourseUserPresetType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { QueryService } from '../../static/XQuery/XQueryReact';

export const useHomePageStats = () => {

    const queryRes = QueryService.useXQuery<HomePageStatsDTO>(apiRoutes.userStats.getHomePageStats);

    return {
        homePageStats: queryRes.data,
        homePageStatsStatus: queryRes.state,
        homePageStatsError: queryRes.error
    };
};

export const useUserLearningPageStats = (userId: Id<'User'>) => {

    const queryRes = QueryService.useXQuery<UserLearningPageStatsDTO>(apiRoutes.userStats.getUserLearningPageStats, { userId });

    return {
        userLearningPageStats: queryRes.data,
        userLearningPageStatsStatus: queryRes.state,
        userLearningPageStatsError: queryRes.error
    };
};

export const useUserAssignedCourses = (userId: Id<'User'>, loadAvailable: boolean) => {

    const queryRes = QueryService
        .useXQueryArrayParametrized(UserCourseStatsDTO, apiRoutes.userStats.getAdminUserCourses, { userId, loadAvailable });

    return {
        userAssignedCourses: queryRes.data,
        userAssignedCoursesState: queryRes.state,
        userAssignedCoursesError: queryRes.error,
        refetchUserAssignedCourses: queryRes.refetch
    };
};

export const useUserVideoStats = (courseId: Id<'Course'>, userId: Id<'User'>) => {

    const queryRes = QueryService.useXQuery<UserVideoStatsDTO[]>(apiRoutes.userStats.getUserVideoStats, { courseId, userId });

    return {
        userVideoStats: queryRes.data,
        userVideoStatsStatus: queryRes.state,
        userVideoStatsError: queryRes.error
    };
};

export const useUserModuleStats = (courseId: Id<'Course'>, userId: Id<'User'>) => {

    const queryRes = QueryService.useXQuery<UserModuleStatsDTO[]>(apiRoutes.userStats.getUserModuleStats, { courseId, userId });

    return {
        userModuleStats: queryRes.data,
        userModuleStatsStatus: queryRes.state,
        userModuleStatsError: queryRes.error
    };
};

export const useUserExamStats = (courseId: Id<'Course'>, userId: Id<'User'>) => {

    const queryRes = QueryService.useXQuery<UserExamStatsDTO[]>(apiRoutes.userStats.getUserExamStats, { courseId, userId });

    return {
        userExamStats: queryRes.data,
        userExamStatsStatus: queryRes.state,
        userExamStatsError: queryRes.error
    };
};

export const useUserCourseStatsOverviewData = (userId: Id<'User'>, courseId: Id<'Course'>) => {

    const queryRes = QueryService.useXQuery<UserCourseStatsOverviewDTO>(apiRoutes.userStats.getUserCourseStatsOverviewData, { userId, courseId });

    return {
        userCourseStatsOverviewData: queryRes.data,
        userCourseStatsOverviewDataStatus: queryRes.state,
        userCourseStatsOverviewDataError: queryRes.error
    };
};


export const useCourseUserStatsData = (courseId: Id<'Course'>, preset: CourseUserPresetType) => {

    const queryRes = QueryService.useXQuery<AdminCourseUserStatsDTO[]>(apiRoutes.userStats.getAdminCourseUsers, { courseId, preset });

    return {
        courseUserStatsData: queryRes.data,
        courseUserStatsDataStatus: queryRes.state,
        courseUserStatsDataError: queryRes.error
    };
};