import { apiRoutes } from '../../shared/types/apiRoutes';
import { UserStatsDTO } from '../../shared/dtos/UserStatsDTO';
import { useReactQuery2 } from '../../static/frontendHelpers';
import { UserCourseStatsDTO } from '../../shared/dtos/UserCourseStatsDTO';

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