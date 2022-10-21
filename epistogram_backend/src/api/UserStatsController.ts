import { UserStatsService } from '../services/UserStatsService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { Id } from '../shared/types/versionId';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class UserStatsController implements XController<UserStatsController> {

    private _userStatsService: UserStatsService;

    constructor(serviceProvider: ServiceProvider) {

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

    @XControllerAction(apiRoutes.userStats.getImproveYourselfPageStats)
    getImproveYourselfPageStatsAction(params: ActionParams) {

        return this._userStatsService
            .getImproveYourselfPageStatsAsync(params.principalId);
    }

    @XControllerAction(apiRoutes.userStats.getAdminUserCourses)
    getUserCourseStatsAction(params: ActionParams) {

        const query = params
            .getFromParameterized(apiRoutes.userStats.getAdminUserCourses)
            .query;

        return this._userStatsService
            .getUserCourseStatsAsync(
                params.principalId,
                query.getValue(x => x.userId, 'int'),
                query.getValue(x => x.loadAvailable, 'boolean'));
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

    @XControllerAction(apiRoutes.userStats.getAdminHomeOverviewStats)
    getAdminHomeOverviewStatsAction(params: ActionParams) {

        const query = params
            .getQuery<any>();

        const companyId = Id
            .create<'Company'>(query
                .getValue(x => x.companyId, 'int'));

        return this._userStatsService
            .getAdminHomeOverviewStatsAsync(companyId);
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
