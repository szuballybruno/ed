import { JobTitle } from '../models/entity/misc/JobTitle';
import { AuthorizationService } from '../services/AuthorizationService';
import { DomainProviderService } from '../services/DomainProviderService';
import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import { MiscService } from '../services/MiscService';
import { ORMConnectionService } from '../services/ORMConnectionService/ORMConnectionService';
import { PractiseQuestionService } from '../services/PractiseQuestionService';
import { TokenService } from '../services/TokenService';
import { UserCourseBridgeService } from '../services/UserCourseBridgeService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class MiscController implements XController<MiscController> {

    private _miscService: MiscService;
    private _practiseQuestionService: PractiseQuestionService;
    private _tokenService: TokenService;
    private _ormService: ORMConnectionService;
    private _config: GlobalConfiguration;
    private _courseBridgeService: UserCourseBridgeService;
    private _authorizationService: AuthorizationService;
    private _domainProviderService: DomainProviderService;

    constructor(serviceProvider: ServiceProvider) {

        this._miscService = serviceProvider.getService(MiscService);
        this._practiseQuestionService = serviceProvider.getService(PractiseQuestionService);
        this._tokenService = serviceProvider.getService(TokenService);
        this._ormService = serviceProvider.getService(ORMConnectionService);
        this._config = serviceProvider.getService(GlobalConfiguration);
        this._courseBridgeService = serviceProvider.getService(UserCourseBridgeService);
        this._authorizationService = serviceProvider.getService(AuthorizationService);
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

    @XControllerAction(apiRoutes.misc.getJobTitles)
    getJobTitlesAction(params: ActionParams) {

        return {
            action: async () => {

                return await this._ormService
                    .query(JobTitle)
                    .getMany();
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(params.principalId, 'ACCESS_APPLICATION');
            }
        };

    }

    @XControllerAction(apiRoutes.misc.getCourseOverviewData)
    getCourseOverviewDataAction(params: ActionParams) {

        return {
            action: async () => {

                return this._miscService
                    .getCourseOverviewDataAsync(params.principalId);
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(params.principalId, 'ACCESS_APPLICATION');
            }
        };

    }

    async getRegistrationLinkAction(params: ActionParams) {

        const domain = await this
            ._domainProviderService
            .getDomainAsync(params.principalId.getId());

        return Promise.resolve(`${domain}/registration?token=${this._tokenService.createRegistrationToken()}`);
    }
}