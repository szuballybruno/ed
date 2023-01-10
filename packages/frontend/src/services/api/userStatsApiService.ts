import { Id } from '@episto/commontypes';
import { apiRoutes, HomePageStatsDTO, UserCourseStatsOverviewDTO, UserExamStatsDTO, UserLearningPageStatsDTO, UserModuleStatsDTO, UserVideoStatsDTO } from '@episto/communication';
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