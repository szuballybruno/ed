import { UserProgressService } from '../services/UserProgressService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { Id } from '../shared/types/versionId';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class UserProgressController {

    private _userProgressService: UserProgressService;

    constructor(serviceProvider: ServiceProvider) {

        this._userProgressService = serviceProvider.getService(UserProgressService);
    }

    @XControllerAction(apiRoutes.userProgress.getRecommendedItemQuota)
    getRecommendedItemQuotaAction = async (params: ActionParams) => {

        return await this._userProgressService
            .getRecommendedItemQuotaAsync(params.principalId, Id
                .create<'Course'>(params
                    .getQuery<any>()
                    .getValue(x => x.courseId, 'int')));
    };

    @XControllerAction(apiRoutes.userProgress.getActiveCourses)
    getActiveCoursesAction = (params: ActionParams) => {

        return this._userProgressService
            .getActiveCoursesAsync(params.principalId);
    };

    @XControllerAction(apiRoutes.userProgress.getUserProgressData)
    getUserProgressDataAction = (params: ActionParams) => {

        const courseId = Id
            .create<'Course'>(params
                .getQuery<any>()
                .getValue(x => x.courseId, 'int'));

        return this._userProgressService
            .getProgressChartDataAsync(params.principalId, courseId);
    };
}