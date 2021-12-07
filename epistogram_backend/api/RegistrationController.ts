import { RegisterInvitedUserDTO } from "../models/shared_models/RegisterInvitedUser";
import { RegisterUserDTO } from "../models/shared_models/RegisterUserDTO";
import { RegistrationService } from "../services/RegistrationService";
import { setAuthCookies } from "../utilities/cookieHelpers";
import { ActionParamsType, withValueOrBadRequest } from "../utilities/helpers";

export class RegistrationController {

    private _res: RegistrationService;

    constructor(res: RegistrationService) {

        this._res = res;
    }

    registerUserViaPublicTokenAction = async (params: ActionParamsType) => {

        const dto = withValueOrBadRequest<RegisterUserDTO>(params.req.body);

        const { accessToken, refreshToken } = await this._res
            .registerUserViaPublicTokenAsync(dto);

        setAuthCookies(params.res, accessToken, refreshToken);
    };

    registerUserViaInvitationTokenAction = async (params: ActionParamsType) => {

        const dto = withValueOrBadRequest<RegisterInvitedUserDTO>(params.req.body);

        const { accessToken, refreshToken } = await this._res.registerInvitedUserAsync(dto);

        setAuthCookies(params.res, accessToken, refreshToken);
    };

    registerUserViaActivationCodeAction = async (params: ActionParamsType) => {

        const dto = withValueOrBadRequest<RegisterInvitedUserDTO>(params.req.body);

        const { accessToken, refreshToken } = await this._res.registerInvitedUserAsync(dto);

        setAuthCookies(params.res, accessToken, refreshToken);
    };
}