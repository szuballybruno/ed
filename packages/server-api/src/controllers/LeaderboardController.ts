import { apiRoutes } from '@episto/communication';
import { LeaderboardService } from '@episto/server-services';
import { ServiceProvider } from '../startup/ServiceProvider';
import { ActionParams } from '../XTurboExpress/ActionParams';
import { XControllerAction } from '../XTurboExpress/XTurboExpressDecorators';
import { XController } from '../XTurboExpress/XTurboExpressTypes';

export class LeaderboardController implements XController<LeaderboardController> {

    private _leaderboardService: LeaderboardService;

    constructor(serviceProvider: ServiceProvider) {

        this._leaderboardService = serviceProvider.getService(LeaderboardService);
    }

    @XControllerAction(apiRoutes.leaderboard.getLeaderboard)
    getCurrentCourseDataAction(params: ActionParams) {

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