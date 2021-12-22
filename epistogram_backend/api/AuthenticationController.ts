
import { ChangePasswordDTO } from "../models/shared_models/SetNewPasswordDTO";
import { AuthenticationService } from "../services/AuthenticationService";
import { GlobalConfiguration } from "../services/misc/GlobalConfiguration";
import { setAuthCookies } from "../utilities/cookieHelpers";
import { ActionParams, getCookie, TypedError } from "../utilities/helpers";

export class AuthenticationController {

    private _authenticationService: AuthenticationService;
    private _config: GlobalConfiguration;

    constructor(authenticationService: AuthenticationService, globalConfig: GlobalConfiguration) {

        this._authenticationService = authenticationService;
        this._config = globalConfig;
    }

    renewUserSessionAction = async (params: ActionParams) => {

        const refreshToken = getCookie(params.req, "refreshToken")?.value;

        const { newAccessToken, newRefreshToken } = await this._authenticationService
            .renewUserSessionAsync(refreshToken);

        setAuthCookies(this._config, params.res, newAccessToken, newRefreshToken);
    };

    logInUserAction = async (params: ActionParams) => {

        // check request 
        if (!params.req.body)
            throw new TypedError("Body is null.", "bad request");

        // get credentials from request
        const { email, password } = params.req.body;

        const { accessToken, refreshToken } = await this._authenticationService
            .logInUser(email, password);

        setAuthCookies(this._config, params.res, accessToken, refreshToken);
    }

    changePasswordAction = async (params: ActionParams) => {

        const dto = params.getBody<ChangePasswordDTO>();
        const password = dto.getValue<string>(x => x.password);
        const passwordCompare = dto.getValue<string>(x => x.passwordCompare);
        const passwordResetToken = dto.getValue<string>(x => x.passwordResetToken);

        return this._authenticationService
            .changePasswordAsync(params.userId, password, passwordCompare, passwordResetToken);
    };

    getCurrentUserAction = async (params: ActionParams) => {

        return this._authenticationService
            .getCurrentUserAsync(params.userId);
    };

    logOutUserAction = async (params: ActionParams) => {

        await this._authenticationService
            .logOutUserAsync(params.userId);

        // remove browser cookies
        params.res.clearCookie(this._config.misc.accessTokenCookieName);
        params.res.clearCookie(this._config.misc.refreshTokenCookieName);
    };
}