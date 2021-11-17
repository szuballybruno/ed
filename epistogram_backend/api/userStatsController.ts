import { UserStatsService } from "../services/userStatsService";
import { ActionParamsType } from "../utilities/helpers";

export class UserStatsController {

    private _userStatsService: UserStatsService;

    constructor(userStatsService: UserStatsService) {

        this._userStatsService = userStatsService;
    }

    getUserStatsAction = async (params: ActionParamsType) => {

        return await this._userStatsService.getUserStatsAsync(params.userId);
    }
}