import { MiscService } from '../services/MiscService';
import { UserCourseBridgeService } from '../services/UserCourseBridgeService';
import { apiRoutes } from '@episto/communication';
import { ServiceProvider } from '../startup/serviceDependencyContainer';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class MiscController implements XController<MiscController> {

    private _miscService: MiscService;
    private _courseBridgeService: UserCourseBridgeService;

    constructor(serviceProvider: ServiceProvider) {

        this._miscService = serviceProvider.getService(MiscService);
        this._courseBridgeService = serviceProvider.getService(UserCourseBridgeService);
    }

    @XControllerAction(apiRoutes.misc.getCurrentCourseItemCode)
    getCurrentCourseItemCodeAction(params: ActionParams) {

        return this._courseBridgeService
            .getPrincipalCurrentItemCodeAsync(params.principalId);
    }

    @XControllerAction(apiRoutes.misc.getHomePageDTO)
    async getOverviewPageDTOAction(params: ActionParams) {

        return await this._miscService
            .getOverviewPageDTOAsync(params.principalId);
    }

    @XControllerAction(apiRoutes.misc.getCourseOverviewData)
    getCourseOverviewDataAction(params: ActionParams) {

        const query = params
            .getFromParameterized(apiRoutes.misc.getCourseOverviewData)
            .query;

        return this._miscService
            .getCourseOverviewDataAsync(
                params.principalId,
                query.data.userId,
                query.data.courseId
            );
    }

    @XControllerAction(apiRoutes.misc.getCourseOverviewModuleCompareData)
    getCourseOverviewModuleCompareAction(params: ActionParams) {

        const query = params
            .getFromParameterized(apiRoutes.misc.getCourseOverviewData)
            .query;

        return this._miscService
            .getCourseOverviewModuleCompareDataAsync(
                params.principalId,
                query.data.userId,
                query.data.courseId
            );
    }

    @XControllerAction(apiRoutes.misc.getActivationCodeLinks)
    getActivationCodeLinksAction(params: ActionParams) {

        const { query } = params
            .getFromParameterized(apiRoutes.misc.getActivationCodeLinks);

        return this
            ._miscService
            .getActivationCodeLinks(
                query.getValue(x => x.urlTemplate, 'string'),
                query.getValue(x => x.companyId, 'int'));
    }
}