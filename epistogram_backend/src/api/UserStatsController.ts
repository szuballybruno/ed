import { UserStatsService } from '../services/UserStatsService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class UserStatsController {

    private _userStatsService: UserStatsService;

    constructor(userStatsService: UserStatsService) {

        this._userStatsService = userStatsService;
    }

    @XControllerAction(apiRoutes.userStats.getUserStats)
    getUserStatsAction = async (params: ActionParams) => {

        const userId = params
            .getQuery<{ userId: number }>()
            .getValue(x => x.userId, 'int');

        return await this._userStatsService
            .getUserStatsAsync(userId);
    };

    @XControllerAction(apiRoutes.userStats.getUserCourseStats)
    getUserCourseStatsAction = async (params: ActionParams) => {

        const userId = params
            .getQuery<{ userId: number }>()
            .getValue(x => x.userId, 'int');

        return await this._userStatsService
            .getUserCourseStatsAsync(userId);
    };

    @XControllerAction(apiRoutes.userStats.getUserLearningOverviewData)
    getUserLearningOverviewDataAction = async (params: ActionParams) => {
        const query = params
            .getQuery<any>();

        const userId = query
            .getValue(x => x.userId, 'int');

        return this._userStatsService
            .getUserLearningOverviewDataAsync(userId);
    };
}