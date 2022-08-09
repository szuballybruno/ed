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
    getUserLearningPageStatsAction(params: ActionParams) {

        return this._userStatsService
            .getUserLearningPageStatsAsync(params.principalId);
    }

    @XControllerAction(apiRoutes.userStats.getImproveYourselfPageStats)
    getImproveYourselfPageStatsAction(params: ActionParams) {

        return this._userStatsService
            .getImproveYourselfPageStatsAsync(params.principalId);
    }

    @XControllerAction(apiRoutes.userStats.getUserCourseStats)
    getUserCourseStatsAction(params: ActionParams) {

        const userId = Id
            .create<'User'>(params
                .getQuery<{ userId: number }>()
                .getValue(x => x.userId, 'int'));

        return this._userStatsService
            .getUserCourseStatsAsync(params.principalId, userId);
    }

    @XControllerAction(apiRoutes.userStats.getUserVideoStats)
    getUserVideoStatsAction(params: ActionParams) {

        const courseId = Id
            .create<'Course'>(params
                .getQuery<any>()
                .getValue(x => x.courseId, 'int'));

        return this._userStatsService
            .getUserVideoStatsAsync(params.principalId, courseId);
    }

    @XControllerAction(apiRoutes.userStats.getUserExamStats)
    getUserExamStatsAction(params: ActionParams) {

        const courseId = Id
            .create<'Course'>(params
                .getQuery<any>()
                .getValue(x => x.courseId, 'int'));

        return this._userStatsService
            .getUserExamStatsAsync(params.principalId, courseId);
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

        console.log(params.getQuery());

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