import { JobTitle } from '../models/entity/JobTitle';
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

export class MiscController {

    private _miscService: MiscService;
    private _practiseQuestionService: PractiseQuestionService;
    private _tokenService: TokenService;
    private _ormService: ORMConnectionService;
    private _config: GlobalConfiguration;
    private _courseBridgeService: UserCourseBridgeService;

    constructor(serviceProvider: ServiceProvider) {

        this._miscService = serviceProvider.getService(MiscService);
        this._practiseQuestionService = serviceProvider.getService(PractiseQuestionService);
        this._tokenService = serviceProvider.getService(TokenService);
        this._ormService = serviceProvider.getService(ORMConnectionService);
        this._config = serviceProvider.getService(GlobalConfiguration);
        this._courseBridgeService = serviceProvider.getService(UserCourseBridgeService);
    }

    @XControllerAction(apiRoutes.misc.getCurrentCourseItemCode)
    getCurrentCourseItemCodeAction = async (parms: ActionParams) => {

        return this._courseBridgeService
            .getPrincipalCurrentItemCodeAsync(parms.principalId);
    };

    @XControllerAction(apiRoutes.misc.getHomePageDTO)
    getOverviewPageDTOAction = async (params: ActionParams) => {

        return this._miscService
            .getOverviewPageDTOAsync(params.principalId);
    };

    @XControllerAction(apiRoutes.misc.getJobTitles)
    getJobTitlesAction = async (params: ActionParams) => {

        return await this._ormService
            .query(JobTitle)
            .getMany();
    };

    @XControllerAction(apiRoutes.misc.getCourseOverviewData)
    getCourseOverviewDataAction = async (params: ActionParams) => {

        return this._miscService
            .getCourseOverviewDataAsync(params.principalId);
    };

    getRegistrationLinkAction = async (params: ActionParams) => {

        return Promise.resolve(`${this._config.misc.frontendUrl}/registration?token=${this._tokenService.createRegistrationToken()}`);
    };

    @XControllerAction(apiRoutes.questions.getPractiseQuestions)
    getPractiseQuestionAction = async (params: ActionParams) => {

        return await this._practiseQuestionService
            .getPractiseQuestionAsync(params.principalId);
    };
}