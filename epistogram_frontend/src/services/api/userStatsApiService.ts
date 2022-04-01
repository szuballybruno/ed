import { apiRoutes } from "../../shared/types/apiRoutes";
import { UserStatsDTO } from "../../shared/dtos/UserStatsDTO";
import { useReactQuery2 } from "../../static/frontendHelpers";

export const useUserStats = (userId: number) => {

    const queryRes = useReactQuery2<UserStatsDTO>(apiRoutes.userStats.getUserStats, { userId });

    return {
        userStats: queryRes.data,
        userStatsStatus: queryRes.state,
        userStatsError: queryRes.error
    };
};