import { UserProgressService } from "../services/UserProgressService";
import { ActionParams } from "../utilities/helpers";

export class UserProgressController {

    private _userProgressService: UserProgressService;

    constructor(userProgressService: UserProgressService) {

        this._userProgressService = userProgressService;
    }

    getRecommendedItemQuotaAction = (params: ActionParams) => {

        return this._userProgressService
            .getRecommendedItemQuotaAsync(params.currentUserId, params.getQuery<any>().getValue(x => x.courseId, "int"));
    }

    getActiveCoursesAction = (params: ActionParams) => {

        return this._userProgressService
            .getActiveCoursesAsync(params.currentUserId);
    }

    getUserProgressDataAction = (params: ActionParams) => {

        return this._userProgressService
            .getProgressChartDataAsync(params.currentUserId);
    }
}