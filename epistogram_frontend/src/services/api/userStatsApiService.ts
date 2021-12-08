import { apiRoutes } from "../../models/shared_models/types/apiRoutes";
import { UserStatsDTO } from "../../models/shared_models/UserStatsDTO";
import { useReactQuery2 } from "../../static/frontendHelpers";

export const useUserStats = () => {

    const queryRes = useReactQuery2<UserStatsDTO>(apiRoutes.userStats.getUserStats);

    return {
        userStats: queryRes.data,
        userStatsStatus: queryRes.state,
        userStatsError: queryRes.error
    }
}