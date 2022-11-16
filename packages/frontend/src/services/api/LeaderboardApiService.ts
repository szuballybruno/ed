import { LeaderboardPeriodType } from '@episto/commontypes';
import { apiRoutes, LeaderboardListItemDTO } from '@episto/communication';
import { GlobalEventManagerType } from '../../static/EventBus';
import { QueryService } from '../../static/QueryService';

export const useLeaderboardApiService = (globalEventManager: GlobalEventManagerType) => {

    const useLeaderboardList = (period: LeaderboardPeriodType) => {

        const qr = QueryService
            .useXQueryArrayParametrized(LeaderboardListItemDTO, apiRoutes.leaderboard.getLeaderboard, { period });

        return {
            leaderboardList: qr.data
        };
    };

    return {
        useLeaderboardList
    };
};

export type LeaderboardApiServiceType = ReturnType<typeof useLeaderboardApiService>;