import { UserStatsService } from "../services/UserStatsService2";
import { ActionParams } from "../utilities/helpers";

export class UserStatsController {

    private _userStatsService: UserStatsService;

    constructor(userStatsService: UserStatsService) {

        this._userStatsService = userStatsService;
    }

    getUserStatsAction = async (params: ActionParams) => {

        return await this._userStatsService.getUserStatsAsync(params.userId);
    }
}