import { UserStatsService } from '../services/UserStatsService';
import { ActionParams } from "../utilities/ActionParams";

export class UserStatsController {

    private _userStatsService: UserStatsService;

    constructor(userStatsService: UserStatsService) {

        this._userStatsService = userStatsService;
    }

    getUserStatsAction = async (params: ActionParams) => {

        const userId = params
            .getQuery<{ userId: number }>()
            .getValue(x => x.userId, 'int');

        return await this._userStatsService
            .getUserStatsAsync(userId);
    };

    getUserLearningOverviewDataAction = async (params: ActionParams) => {
        const query = params
            .getQuery<any>();

        const userId = query
            .getValue(x => x.userId, 'int');

        return this._userStatsService
            .getUserLearningOverviewDataAsync(userId);
    };
}