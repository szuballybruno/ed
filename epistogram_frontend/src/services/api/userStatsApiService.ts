import { apiRoutes } from "../../models/shared_models/types/apiRoutes";
import { UserStatsDTO } from "../../models/shared_models/UserStatsDTO";
import { useReactQuery2 } from "../../static/frontendHelpers";

export const useUserStats = (userId: number) => {

    const queryRes = useReactQuery2<UserStatsDTO>(apiRoutes.userStats.getUserStats, { userId });

    return {
        userStats: queryRes.data,
        userStatsStatus: queryRes.state,
        userStatsError: queryRes.error
    }
}