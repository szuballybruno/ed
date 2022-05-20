import { UserProgressService } from '../services/UserProgressService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class UserProgressController {

    private _userProgressService: UserProgressService;

    constructor(userProgressService: UserProgressService) {

        this._userProgressService = userProgressService;
    }

    @XControllerAction(apiRoutes.userProgress.getRecommendedItemQuota)
    getRecommendedItemQuotaAction = async (params: ActionParams) => {

        return await this._userProgressService
            .getRecommendedItemQuotaAsync(params.principalId, params
                .getQuery<any>()
                .getValue(x => x.courseId, 'int'));
    };

    @XControllerAction(apiRoutes.userProgress.getActiveCourses)
    getActiveCoursesAction = (params: ActionParams) => {

        return this._userProgressService
            .getActiveCoursesAsync(params.principalId);
    };

    @XControllerAction(apiRoutes.userProgress.getUserProgressData)
    getUserProgressDataAction = (params: ActionParams) => {

        const courseId = params
            .getQuery<any>()
            .getValue(x => x.courseId, 'int');

        return this._userProgressService
            .getProgressChartDataAsync(params.principalId, courseId);
    };
}