import { HomePageStatsDTO } from '../../shared/dtos/HomePageStatsDTO';
import { ImproveYourselfPageStatsDTO } from '../../shared/dtos/ImproveYourselfPageStatsDTO';
import { UserCourseStatsDTO } from '../../shared/dtos/UserCourseStatsDTO';
import { UserCourseStatsOverviewDTO } from '../../shared/dtos/UserCourseStatsOverviewDTO';
import { UserExamStatsDTO } from '../../shared/dtos/UserExamStatsDTO';
import { UserLearningPageStatsDTO } from '../../shared/dtos/UserLearningPageStatsDTO';
import { UserModuleStatsDTO } from '../../shared/dtos/UserModuleStatsDTO';
import { UserVideoStatsDTO } from '../../shared/dtos/UserVideoStatsDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { Id } from '../../shared/types/versionId';
import { QueryService } from '../../static/QueryService';

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

export const useImproveYourselfPageStats = () => {

    const queryRes = QueryService.useXQuery<ImproveYourselfPageStatsDTO>(apiRoutes.userStats.getImproveYourselfPageStats);

    return {
        improveYourselfPageStats: queryRes.data,
        improveYourselfPageStatsStatus: queryRes.state,
        improveYourselfPageStatsError: queryRes.error
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