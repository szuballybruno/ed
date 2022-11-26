import { UserProgressService } from '@episto/server-services';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { IXGatewayServiceProvider } from '@episto/x-gateway';
import { ActionParams } from '../ActionParams';
import { XControllerAction } from '@episto/x-gateway';
import { Controller } from '../Controller';

export class UserProgressController implements Controller<UserProgressController> {

    private _userProgressService: UserProgressService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

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