import { apiRoutes } from '@episto/communication';
import { LeaderboardService } from '@episto/server-services';
import { IXGatewayServiceProvider } from '@episto/x-gateway';
import { ActionParams } from '../helpers/ActionParams';
import { XControllerAction } from '@episto/x-gateway';
import { IController } from '../interfaces/IController';

export class LeaderboardController implements IController<LeaderboardController> {

    private _leaderboardService: LeaderboardService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

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