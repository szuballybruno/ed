import { AuthenticationService } from '../services/AuthenticationService';
import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import { apiRoutes } from '../shared/types/apiRoutes';
import { VerboseError } from '../shared/types/VerboseError';
import { ActionParams } from '../utilities/ActionParams';
import { setAuthCookies } from '../utilities/cookieHelpers';
import { getAuthCookies } from '../utilities/helpers';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class ZAuthenticationController {

    private _authenticationService: AuthenticationService;
    private _config: GlobalConfiguration;

    constructor(authenticationService: AuthenticationService, globalConfig: GlobalConfiguration) {

        this._authenticationService = authenticationService;
        this._config = globalConfig;
    }

    @XControllerAction(apiRoutes.authentication.loginUser, { isPost: true, isPublic: true })
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

    @XControllerAction(apiRoutes.authentication.establishAuthHandshake, { isPublic: true })
    establishAuthHandshakeAction = async (params: ActionParams) => {

        const { refreshToken } = getAuthCookies(params.req);

        const data = await this._authenticationService
            .establishAuthHandshakeAsync(refreshToken);

        setAuthCookies(this._config, params.res, data.newAccessToken, data.newRefreshToken);

        return data.authData;
    };

    @XControllerAction(apiRoutes.authentication.logoutUser, { isPost: true, isUnauthorized: true })
    logOutUserAction = async (params: ActionParams) => {

        await this._authenticationService
            .logOutUserAsync(params.principalId);

        // remove browser cookies
        params.res.clearCookie(this._config.misc.accessTokenCookieName);
        params.res.clearCookie(this._config.misc.refreshTokenCookieName);
    };
}