import { UserCourseStatsDTO } from '../../shared/dtos/UserCourseStatsDTO';
import { UserExamStatsDTO } from '../../shared/dtos/UserExamStatsDTO';
import { UserStatsDTO } from '../../shared/dtos/UserStatsDTO';
import { UserVideoStatsDTO } from '../../shared/dtos/UserVideoStatsDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { useReactQuery2 } from '../../static/frontendHelpers';

export const useUserStats = (userId: number) => {

    const queryRes = useReactQuery2<UserStatsDTO>(apiRoutes.userStats.getUserStats, { userId });

    return {
        userStats: queryRes.data,
        userStatsStatus: queryRes.state,
        userStatsError: queryRes.error
    };
};

export const useUserCourseStats = (userId: number) => {

    const queryRes = useReactQuery2<UserCourseStatsDTO[]>(apiRoutes.userStats.getUserCourseStats, { userId });

    return {
        userCourseStats: queryRes.data,
        userCourseStatsStatus: queryRes.state,
        userCourseStatsError: queryRes.error
    };
};

export const useUserVideoStats = (userId: number, courseId: number) => {

    const queryRes = useReactQuery2<UserVideoStatsDTO[]>(apiRoutes.userStats.getUserVideoStats, { userId, courseId });

    return {
        userVideoStats: queryRes.data,
        userVideoStatsStatus: queryRes.state,
        userVideoStatsError: queryRes.error
    };
};

export const useUserExamStats = (userId: number, courseId: number) => {

    const queryRes = useReactQuery2<UserExamStatsDTO[]>(apiRoutes.userStats.getUserExamStats, { userId, courseId });

    return {
        userExamStats: queryRes.data,
        userExamStatsStatus: queryRes.state,
        userExamStatsError: queryRes.error
    };
};