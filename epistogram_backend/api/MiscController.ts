import { DailyTipOccurrence } from "../models/entity/DailyTipOccurrence";
import { JobTitle } from "../models/entity/JobTitle";
import { UserCourseBridge } from "../models/entity/UserCourseBridge";
import { DailyTipDTO } from "../src/shared/dtos/DailyTipDTO";
import { UserDTO } from "../src/shared/dtos/UserDTO";
import { DailyTipView } from "../models/views/DailyTipView";
import { AuthenticationService } from "../src/services/AuthenticationService";
import { MapperService } from "../src/services/MapperService";
import { GlobalConfiguration } from "../src/services/misc/GlobalConfiguration";
import { MiscService } from "../src/services/MiscService";
import { PractiseQuestionService } from "../src/services/PractiseQuestionService";
import { ORMConnectionService } from "../src/services/sqlServices/ORMConnectionService";
import { TokenService } from "../src/services/TokenService";
import { ActionParams, withValueOrBadRequest } from "../utilities/helpers";

export class MiscController {

    private _miscService: MiscService;
    private _practiseQuestionService: PractiseQuestionService;
    private _authService: AuthenticationService;
    private _tokenService: TokenService;
    private _ormService: ORMConnectionService;
    private _config: GlobalConfiguration;
    private _mapperService: MapperService;

    constructor(
        miscService: MiscService,
        practiseQuestionService: PractiseQuestionService,
        authService: AuthenticationService,
        tokenService: TokenService,
        ormService: ORMConnectionService,
        config: GlobalConfiguration,
        mapperService: MapperService) {

        this._miscService = miscService;
        this._practiseQuestionService = practiseQuestionService;
        this._authService = authService;
        this._tokenService = tokenService;
        this._ormService = ormService;
        this._config = config;
        this._mapperService = mapperService;
    }

    getCurrentCourseItemCodeAction = async (parms: ActionParams) => {

        const currentBridge = await this._ormService
            .getRepository(UserCourseBridge)
            .findOne({
                where: {
                    isCurrent: true,
                    userId: parms.currentUserId
                }
            });

        if (!currentBridge)
            return null;

        return currentBridge.currentItemCode;
    };

    getOverviewPageDTOAction = async (params: ActionParams) => {

        return this._miscService.getOverviewPageDTOAsync(params.currentUserId);
    }

    getOrganizationsAction = (params: ActionParams) => {

        return this._miscService.getOrganizationsAsync(params.currentUserId);
    }

    getJobTitlesAction = async (params: ActionParams) => {

        return await this._ormService
            .getRepository(JobTitle)
            .find();
    };

    getRegistrationLinkAction = async (params: ActionParams) => {

        return Promise.resolve(`${this._config.misc.frontendUrl}/registration?token=${this._tokenService.createRegistrationToken()}`);
    };

    saveUserDataAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<UserDTO>(params.req.body);

        return this._miscService.saveUserDataAsync(params.currentUserId, dto);
    };

    getPractiseQuestionAction = async (params: ActionParams) => {

        return await this._practiseQuestionService
            .getPractiseQuestionAsync(params.currentUserId);
    };

    getCourseOverviewDataAction = async (params: ActionParams) => {

        return this._miscService
            .getCourseOverviewDataAsync(params.currentUserId);
    }
}