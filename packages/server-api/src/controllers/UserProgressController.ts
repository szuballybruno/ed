import { UserProgressService } from '@episto/server-services';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { ServiceProvider } from '../startup/ServiceProvider';
import { ActionParams } from '../XTurboExpress/ActionParams';
import { XControllerAction } from '../XTurboExpress/XTurboExpressDecorators';
import { XController } from '../XTurboExpress/XTurboExpressTypes';

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