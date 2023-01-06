import { LoggerService, UserProgressService } from '@episto/server-services';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { IXGatewayServiceProvider } from '@thinkhub/x-gateway';
import { ActionParams } from '../helpers/ActionParams';
import { XControllerAction } from '@thinkhub/x-gateway';
import { IController } from '../interfaces/IController';

export class UserProgressController implements IController<UserProgressController> {

    private _userProgressService: UserProgressService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

        this._userProgressService = serviceProvider.getService(UserProgressService);
    }

    @XControllerAction(apiRoutes.userProgress.getCourseProgressOverview)
    getCourseProgressOverviewAction(params: ActionParams) {

        const courseId = Id.create<'Course'>(params
            .getQuery<any>()
            .getValue(x => x.courseId, 'int'));

        return this
            ._userProgressService
            .getCourseProgressOverviewAsync(params.principalId, courseId);
    }

    @XControllerAction(apiRoutes.userProgress.getActiveCourses)
    getActiveCoursesAction = (params: ActionParams) => {

        return this._userProgressService
            .getActiveCoursesAsync(params.principalId);
    };

    @XControllerAction(apiRoutes.userProgress.getUserProgressData)
    async getUserProgressDataAction(params: ActionParams) {

        const courseId = Id
            .create<'Course'>(params
                .getQuery<any>()
                .getValue(x => x.courseId, 'int'));

        return await this
            ._userProgressService
            .getProgressChartDataByCourseAsync(params.principalId, courseId, params.principalId.getId());
    };
}