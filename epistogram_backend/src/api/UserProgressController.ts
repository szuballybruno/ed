import { UserProgressService } from '../services/UserProgressService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { Id } from '../shared/types/versionId';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class UserProgressController implements XController<UserProgressController> {

    private _userProgressService: UserProgressService;

    constructor(serviceProvider: ServiceProvider) {

        this._userProgressService = serviceProvider.getService(UserProgressService);
    }

    @XControllerAction(apiRoutes.userProgress.getRecommendedItemQuota)
    getRecommendedItemQuotaAction(params: ActionParams) {

        const courseId = Id.create<'Course'>(params
            .getQuery<any>()
            .getValue(x => x.courseId, 'int'));

        return this._userProgressService
            .getRecommendedItemQuotaAsync(params.principalId, courseId);
    }

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