import { apiRoutes } from '@episto/communication';
import { AdminStatsService } from '@episto/server-services';
import { IXGatewayServiceProvider, XControllerAction } from '@thinkhub/x-gateway';
import { ActionParams } from '../helpers/ActionParams';
import { IController } from '../interfaces/IController';

export class AdminStatsController implements IController<AdminStatsController> {

    private _adminStatsService: AdminStatsService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

        this._adminStatsService = serviceProvider
            .getService(AdminStatsService);
    }

    @XControllerAction(apiRoutes.adminstats.getCourseStatsCarouselData)
    async getCourseStatsCarouselDataAction(params: ActionParams) {

        const paramsdata = params
            .getFromParameterized(apiRoutes.adminstats.getCourseStatsCarouselData);

        const companyId = paramsdata
            .query
            .getValue(x => x.companyId, 'int');

        return await this
            ._adminStatsService
            .getCourseStatsCarouselDataAsync(params.principalId, companyId);
    }
}