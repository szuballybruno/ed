import { HomePageStatsDTO } from '../../shared/dtos/HomePageStatsDTO';
import { ImproveYourselfPageStatsDTO } from '../../shared/dtos/ImproveYourselfPageStatsDTO';
import { UserCourseStatsDTO } from '../../shared/dtos/UserCourseStatsDTO';
import { UserExamStatsDTO } from '../../shared/dtos/UserExamStatsDTO';
import { UserLearningPageStatsDTO } from '../../shared/dtos/UserLearningPageStatsDTO';
import { UserVideoStatsDTO } from '../../shared/dtos/UserVideoStatsDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { useReactQuery2 } from '../../static/frontendHelpers';

export const useHomePageStats = () => {

    const queryRes = useReactQuery2<HomePageStatsDTO>(apiRoutes.userStats.getHomePageStats);

    return {
        homePageStats: queryRes.data,
        homePageStatsStatus: queryRes.state,
        homePageStatsError: queryRes.error
    };
};

export const useUserLearningPageStats = (userId: number) => {

    const queryRes = useReactQuery2<UserLearningPageStatsDTO>(apiRoutes.userStats.getUserLearningPageStats, { userId });

    return {
        userLearningPageStats: queryRes.data,
        userLearningPageStatsStatus: queryRes.state,
        userLearningPageStatsError: queryRes.error
    };
};

export const useImproveYourselfPageStats = () => {

    const queryRes = useReactQuery2<ImproveYourselfPageStatsDTO>(apiRoutes.userStats.getImproveYourselfPageStats);

    return {
        improveYourselfPageStats: queryRes.data,
        improveYourselfPageStatsStatus: queryRes.state,
        improveYourselfPageStatsError: queryRes.error
    };
};

export const useUserCourseStats = (userId: number) => {

    const queryRes = useReactQuery2<UserCourseStatsDTO[]>(apiRoutes.userStats.getUserCourseStats, { userId });

    return {
        userCourseStats: queryRes.data,
        userCourseStatsStatus: queryRes.state,
        userCourseStatsError: queryRes.error,
        refetchUserCourseStats: queryRes.refetch
    };
};

export const useUserVideoStats = (courseId: number) => {

    const queryRes = useReactQuery2<UserVideoStatsDTO[]>(apiRoutes.userStats.getUserVideoStats, { courseId });

    return {
        userVideoStats: queryRes.data,
        userVideoStatsStatus: queryRes.state,
        userVideoStatsError: queryRes.error
    };
};

export const useUserExamStats = (courseId: number) => {

    const queryRes = useReactQuery2<UserExamStatsDTO[]>(apiRoutes.userStats.getUserExamStats, { courseId });

    return {
        userExamStats: queryRes.data,
        userExamStatsStatus: queryRes.state,
        userExamStatsError: queryRes.error
    };
};