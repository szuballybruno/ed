import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { ActionParams } from '../helpers/ActionParams';
import { XControllerAction } from '@episto/x-gateway';
import { IController } from '../interfaces/IController';
import { UserStatsService } from '@episto/server-services';
import { IXGatewayServiceProvider } from '@episto/x-gateway';

export class UserStatsController implements IController<UserStatsController> {

    private _userStatsService: UserStatsService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

        this._userStatsService = serviceProvider.getService(UserStatsService);
    }

    @XControllerAction(apiRoutes.userStats.getHomePageStats)
    getHomePageStatsAction(params: ActionParams) {

        return this._userStatsService
            .getHomePageStatsAsync(params.principalId);
    }

    @XControllerAction(apiRoutes.userStats.getUserLearningPageStats)
    async getUserLearningPageStatsAction(params: ActionParams) {

        return this._userStatsService
            .getUserLearningPageStatsAsync(params.principalId);
    }

    @XControllerAction(apiRoutes.userStats.getUserVideoStats)
    getUserVideoStatsAction(params: ActionParams) {

        const courseId = Id
            .create<'Course'>(params
                .getQuery<{ courseId: number }>()
                .getValue(x => x.courseId, 'int'));

        const userId = params
            .getQuery<{ userId?: Id<'User'> }>()
            .data
            .userId ?? null;

        return this._userStatsService
            .getUserVideoStatsAsync(params.principalId, courseId, userId);
    }

    @XControllerAction(apiRoutes.userStats.getUserExamStats)
    getUserExamStatsAction(params: ActionParams) {

        const courseId = Id
            .create<'Course'>(params
                .getQuery<any>()
                .getValue(x => x.courseId, 'int'));

        const userId = params
            .getQuery<{ userId?: Id<'User'> }>()
            .data
            .userId ?? null;

        return this._userStatsService
            .getUserExamStatsAsync(params.principalId, courseId, userId);
    }

    @XControllerAction(apiRoutes.userStats.getUserModuleStats)
    getUserModuleStatsAction(params: ActionParams) {

        const courseId = Id
            .create<'Course'>(params
                .getQuery<any>()
                .getValue(x => x.courseId, 'int'));

        const userId = params
            .getQuery<{ userId?: Id<'User'> }>()
            .data
            .userId ?? null;

        return this._userStatsService
            .getUserModuleStatsAsync(params.principalId, courseId, userId);
    }

    @XControllerAction(apiRoutes.userStats.getUserLearningOverviewData)
    getUserLearningOverviewDataAction(params: ActionParams) {

        const query = params
            .getQuery<any>();

        const userId = Id
            .create<'User'>(query
                .getValue(x => x.userId, 'int'));

        return this._userStatsService
            .getUserLearningOverviewDataAsync(params.principalId, userId);
    }

    @XControllerAction(apiRoutes.userStats.getUserCourseStatsOverviewData)
    getUserCourseStatsOverviewDataAction(params: ActionParams) {

        const query = params
            .getQuery<any>();

        const userId = Id
            .create<'User'>(query
                .getValue(x => x.userId, 'int'));

        const courseId = Id
            .create<'Course'>(query
                .getValue(x => x.courseId, 'int'));

        return this._userStatsService
            .getUserCourseStatsOverviewData(params.principalId, courseId, userId);
    }
}
