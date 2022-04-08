
import { AuthenticationService } from '../services/AuthenticationService';
import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import { setAuthCookies } from '../utilities/cookieHelpers';
import { ActionParams, getCookie, ErrorCode } from '../utilities/helpers';

export class AuthenticationController {

    private _authenticationService: AuthenticationService;
    private _config: GlobalConfiguration;

    constructor(authenticationService: AuthenticationService, globalConfig: GlobalConfiguration) {

        this._authenticationService = authenticationService;
        this._config = globalConfig;
    }

    renewUserSessionAction = async (params: ActionParams) => {

        const prevRefreshToken = getCookie(params.req, 'refreshToken')?.value;

        const { accessToken, refreshToken } = await this._authenticationService
            .renewUserSessionAsync(prevRefreshToken);

        setAuthCookies(this._config, params.res, accessToken, refreshToken);
    };

    logInUserAction = async (params: ActionParams) => {

        // check request 
        if (!params.req.body)
            throw new ErrorCode('Body is null.', 'bad request');

        // get credentials from request
        const { email, password } = params.req.body;

        const { accessToken, refreshToken } = await this._authenticationService
            .logInUser(email, password);

        setAuthCookies(this._config, params.res, accessToken, refreshToken);
    }

    getCurrentUserAction = async (params: ActionParams) => {

        return this._authenticationService
            .getCurrentUserAsync(params.currentUserId);
    };

    logOutUserAction = async (params: ActionParams) => {

        await this._authenticationService
            .logOutUserAsync(params.currentUserId);

        // remove browser cookies
        params.res.clearCookie(this._config.misc.accessTokenCookieName);
        params.res.clearCookie(this._config.misc.refreshTokenCookieName);
    };
}