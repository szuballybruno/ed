import { UserStatsService } from '../services/UserStatsService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { Id } from '../shared/types/versionId';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class UserStatsController {

    private _userStatsService: UserStatsService;

    constructor(serviceProvider: ServiceProvider) {

        this._userStatsService = serviceProvider.getService(UserStatsService);
    }

    @XControllerAction(apiRoutes.userStats.getHomePageStats)
    getHomePageStatsAction = async (params: ActionParams) => {

        return await this._userStatsService
            .getHomePageStatsAsync(params.principalId);
    };

    @XControllerAction(apiRoutes.userStats.getUserLearningPageStats)
    getUserLearningPageStatsAction = async (params: ActionParams) => {

        return await this._userStatsService
            .getUserLearningPageStatsAsync(params.principalId);
    };

    @XControllerAction(apiRoutes.userStats.getImproveYourselfPageStats)
    getImproveYourselfPageStatsAction = async (params: ActionParams) => {

        return await this._userStatsService
            .getImproveYourselfPageStatsAsync(params.principalId);
    };

    @XControllerAction(apiRoutes.userStats.getUserCourseStats)
    getUserCourseStatsAction = async (params: ActionParams) => {

        const userId = Id
            .create<'User'>(params
                .getQuery<{ userId: number }>()
                .getValue(x => x.userId, 'int'));

        return await this._userStatsService
            .getUserCourseStatsAsync(userId);
    };

    @XControllerAction(apiRoutes.userStats.getUserVideoStats)
    getUserVideoStatsAction = async (params: ActionParams) => {

        const courseId = Id
            .create<'Course'>(params
                .getQuery<any>()
                .getValue(x => x.courseId, 'int'));

        return await this._userStatsService
            .getUserVideoStatsAsync(params.principalId, courseId);
    };

    @XControllerAction(apiRoutes.userStats.getUserExamStats)
    getUserExamStatsAction = async (params: ActionParams) => {

        const courseId = Id
            .create<'Course'>(params
                .getQuery<any>()
                .getValue(x => x.courseId, 'int'));

        return await this._userStatsService
            .getUserExamStatsAsync(params.principalId, courseId);
    };

    @XControllerAction(apiRoutes.userStats.getUserLearningOverviewData)
    getUserLearningOverviewDataAction = async (params: ActionParams) => {

        const query = params
            .getQuery<any>();

        const userId = Id
            .create<'User'>(query
                .getValue(x => x.userId, 'int'));

        return this._userStatsService
            .getUserLearningOverviewDataAsync(userId);
    };
}