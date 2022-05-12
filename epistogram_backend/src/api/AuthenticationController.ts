
import { AuthenticationService } from '../services/AuthenticationService';
import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import { VerboseError } from '../shared/types/VerboseError';
import { setAuthCookies } from '../utilities/cookieHelpers';
import { getAuthCookies, getCookie } from '../utilities/helpers';
import { ActionParams } from "../utilities/ActionParams";

export class AuthenticationController {

    private _authenticationService: AuthenticationService;
    private _config: GlobalConfiguration;

    constructor(authenticationService: AuthenticationService, globalConfig: GlobalConfiguration) {

        this._authenticationService = authenticationService;
        this._config = globalConfig;
    }

    logInUserAction = async (params: ActionParams) => {

        // check request 
        if (!params.req.body)
            throw new VerboseError('Body is null.', 'bad request');

        // get credentials from request
        const { email, password } = params.req.body;

        const { accessToken, refreshToken } = await this._authenticationService
            .logInUser(email, password);

        setAuthCookies(this._config, params.res, accessToken, refreshToken);
    };

    establishAuthHandshakeAction = async (params: ActionParams) => {

        const { refreshToken } = getAuthCookies(params.req);

        const data = await this._authenticationService
            .establishAuthHandshakeAsync(refreshToken);

        setAuthCookies(this._config, params.res, data.newAccessToken, data.newRefreshToken);

        return data.authData;
    };

    logOutUserAction = async (params: ActionParams) => {

        await this._authenticationService
            .logOutUserAsync(params.currentUserId);

        // remove browser cookies
        params.res.clearCookie(this._config.misc.accessTokenCookieName);
        params.res.clearCookie(this._config.misc.refreshTokenCookieName);
    };
}