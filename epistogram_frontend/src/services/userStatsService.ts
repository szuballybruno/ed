import { useReactQuery } from "../frontendHelpers";
import { apiRoutes } from "../models/shared_models/types/apiRoutes";
import { UserStatsDTO } from "../models/shared_models/UserStatsDTO";
import { httpGetAsync } from "./httpClient";

export const useUserStats = () => {

    const queryRes = useReactQuery<UserStatsDTO>(
        ["getUserStats"],
        () => httpGetAsync(apiRoutes.userStats.getUserStats));

    return {
        userStats: queryRes.data,
        userStatsStatus: queryRes.status,
        userStatsError: queryRes.error
    }
}