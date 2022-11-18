import { apiRoutes } from '@episto/communication';
import { LeaderboardService } from '../services/LeaderboardService';
import { ServiceProvider } from '../startup/serviceDependencyContainer';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class LeaderboardController implements XController<LeaderboardController> {

    private _leaderboardService: LeaderboardService;

    constructor(serviceProvider: ServiceProvider) {

        this._leaderboardService = serviceProvider.getService(LeaderboardService);
    }

    @XControllerAction(apiRoutes.leaderboard.getLeaderboard)
    getCurrentCourseItemCodeAction(params: ActionParams) {

        const { query } = params
            .getFromParameterized(apiRoutes.leaderboard.getLeaderboard);

        const period = query
            .getValue(x => x.period);

        const scope = query
            .getValue(x => x.scope);

        return this
            ._leaderboardService
            .getLeaderboardListAsync(params.principalId, period, scope);
    }
}