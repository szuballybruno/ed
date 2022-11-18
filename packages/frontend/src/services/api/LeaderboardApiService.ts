import { LeaderboardPeriodType, LeaderboardScopeType } from '@episto/commontypes';
import { apiRoutes, LeaderboardListItemDTO } from '@episto/communication';
import { GlobalEventManagerType } from '../../components/system/EventManagerFrame';
import { QueryService } from '../../static/XQuery/XQueryReact';

export const useLeaderboardApiService = (globalEventManager: GlobalEventManagerType) => {

    const useLeaderboardList = (period: LeaderboardPeriodType, scope: LeaderboardScopeType) => {

        const qr = QueryService
            .useXQueryArrayParametrized(LeaderboardListItemDTO, apiRoutes.leaderboard.getLeaderboard, { period, scope });

        return {
            leaderboardList: qr.data
        };
    };

    return {
        useLeaderboardList
    };
};

export type LeaderboardApiServiceType = ReturnType<typeof useLeaderboardApiService>;