import { UserProgressService } from "../services/UserProgressService";
import { ActionParams } from "../utilities/helpers";

export class UserProgressController {

    private _userProgressService: UserProgressService;

    constructor(userProgressService: UserProgressService) {

        this._userProgressService = userProgressService;
    }

    getUserProgressDataAction = (params: ActionParams) => {

        return this._userProgressService
            .getProgressChartDataAsync(params.currentUserId);
    }
}