import { UserStatsService } from '../services/UserStatsService';
import { ActionParams } from '../utilities/helpers';

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
    }
}