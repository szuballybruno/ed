import { UserProgressService } from '../services/UserProgressService';
import { ActionParams } from '../utilities/ActionParams';

export class UserProgressController {

    private _userProgressService: UserProgressService;

    constructor(userProgressService: UserProgressService) {

        this._userProgressService = userProgressService;
    }

    getRecommendedItemQuotaAction = async (params: ActionParams) => {

        return await this._userProgressService
            .getRecommendedItemQuotaAsync(params.principalId, params
                .getQuery<any>()
                .getValue(x => x.courseId, 'int'));
    };

    getActiveCoursesAction = (params: ActionParams) => {

        return this._userProgressService
            .getActiveCoursesAsync(params.principalId);
    };

    getUserProgressDataAction = (params: ActionParams) => {

        const courseId = params
            .getQuery<any>()
            .getValue(x => x.courseId, 'int');

        return this._userProgressService
            .getProgressChartDataAsync(params.principalId, courseId);
    };
}