import { DomainProviderService } from '../services/DomainProviderService';
import { MiscService } from '../services/MiscService';
import { TokenService } from '../services/TokenService';
import { UserCourseBridgeService } from '../services/UserCourseBridgeService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class MiscController implements XController<MiscController> {

    private _miscService: MiscService;
    private _tokenService: TokenService;
    private _courseBridgeService: UserCourseBridgeService;
    private _domainProviderService: DomainProviderService;

    constructor(serviceProvider: ServiceProvider) {

        this._miscService = serviceProvider.getService(MiscService);
        this._tokenService = serviceProvider.getService(TokenService);
        this._courseBridgeService = serviceProvider.getService(UserCourseBridgeService);
        this._domainProviderService = serviceProvider.getService(DomainProviderService);
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

        return this._miscService
            .getCourseOverviewDataAsync(params.principalId);
    }

    async getRegistrationLinkAction(params: ActionParams) {

        const domain = await this
            ._domainProviderService
            .getDomainAsync(params.principalId.getId());

        return Promise.resolve(`${domain}/registration?token=${this._tokenService.createRegistrationToken()}`);
    }
}