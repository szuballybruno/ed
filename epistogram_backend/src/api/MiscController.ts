import { JobTitle } from '../models/entity/JobTitle';
import { AuthorizationService } from '../services/AuthorizationService';
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

    constructor(serviceProvider: ServiceProvider) {

        this._miscService = serviceProvider.getService(MiscService);
        this._practiseQuestionService = serviceProvider.getService(PractiseQuestionService);
        this._tokenService = serviceProvider.getService(TokenService);
        this._ormService = serviceProvider.getService(ORMConnectionService);
        this._config = serviceProvider.getService(GlobalConfiguration);
        this._courseBridgeService = serviceProvider.getService(UserCourseBridgeService);
        this._authorizationService = serviceProvider.getService(AuthorizationService);
    }

    @XControllerAction(apiRoutes.misc.getCurrentCourseItemCode)
    getCurrentCourseItemCodeAction(params: ActionParams) {

        return this._courseBridgeService
            .getPrincipalCurrentItemCodeAsync(params.principalId);
    }

    @XControllerAction(apiRoutes.misc.getHomePageDTO)
    getOverviewPageDTOAction(params: ActionParams) {

        return {
            action: async () => {

                return this._miscService
                    .getOverviewPageDTOAsync(params.principalId);
            },
            auth: async () => {
                return this._authorizationService
                    .getCheckPermissionResultAsync(params.principalId, 'ACCESS_APPLICATION');
            }
        };


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
                    .getCheckPermissionResultAsync(params.principalId, 'ACCESS_APPLICATION');
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
                    .getCheckPermissionResultAsync(params.principalId, 'ACCESS_APPLICATION');
            }
        };

    }

    getRegistrationLinkAction(params: ActionParams) {

        return {
            action: async () => {

                return Promise.resolve(`${this._config.misc.frontendUrl}/registration?token=${this._tokenService.createRegistrationToken()}`);
            },
            auth: async () => {
                return this._authorizationService
                    .getCheckPermissionResultAsync(params.principalId, 'ACCESS_APPLICATION');
            }
        };

    }

    @XControllerAction(apiRoutes.questions.getPractiseQuestions)
    getPractiseQuestionAction(params: ActionParams) {

        return {
            action: async () => {
                return await this._practiseQuestionService
                    .getPractiseQuestionAsync(params.principalId);
            },
            auth: async () => {
                return this._authorizationService
                    .getCheckPermissionResultAsync(params.principalId, 'ACCESS_APPLICATION');
            }
        };
    }
}