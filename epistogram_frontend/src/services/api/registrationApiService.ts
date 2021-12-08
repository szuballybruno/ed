import { RegisterUserViaActivationCodeDTO } from "../models/shared_models/RegisterUserViaActivationCodeDTO";
import { RegisterUserViaInvitationTokenDTO } from "../models/shared_models/RegisterUserViaInvitationTokenDTO";
import { RegisterUserViaPublicTokenDTO } from "../models/shared_models/RegisterUserViaPublicTokenDTO";
import { RegistrationService } from "../services/RegistrationService";
import { setAuthCookies } from "../utilities/cookieHelpers";
import { ActionParams } from "../utilities/helpers";

export class RegistrationController {

    private _res: RegistrationService;

    constructor(res: RegistrationService) {

        this._res = res;
    }

    registerUserViaPublicTokenAction = async (params: ActionParams) => {

        const body = params.getBody<RegisterUserViaPublicTokenDTO>()

        const { accessToken, refreshToken } = await this._res
            .registerUserViaPublicTokenAsync(
                body.getBodyValue<string>(x => x.emailAddress),
                body.getBodyValue<string>(x => x.firstName),
                body.getBodyValue<string>(x => x.lastName),
                body.getBodyValue<string>(x => x.registrationToken));

        setAuthCookies(params.res, accessToken, refreshToken);
    };

    registerUserViaInvitationTokenAction = async (params: ActionParams) => {

        const body = params.getBody<RegisterUserViaInvitationTokenDTO>();

        const { accessToken, refreshToken } = await this._res
            .registerInvitedUserAsync(
                body.getBodyValue<string>(x => x.invitationToken),
                body.getBodyValue<string>(x => x.password),
                body.getBodyValue<string>(x => x.passwordCompare));

        setAuthCookies(params.res, accessToken, refreshToken);
    };

    registerUserViaActivationCodeAction = async (params: ActionParams) => {

        const body = params.getBody<RegisterUserViaActivationCodeDTO>();

        const { accessToken, refreshToken } = await this._res
            .registerUserViaActivationCodeAsync(
                body.getBodyValue<string>(x => x.activationCode),
                body.getBodyValue<string>(x => x.emailAddress),
                body.getBodyValue<string>(x => x.firstName),
                body.getBodyValue<string>(x => x.lastName));

        setAuthCookies(params.res, accessToken, refreshToken);
    };
}