import { ErrorWithCode } from '@episto/commontypes';
import { apiRoutes } from '@episto/communication';
import { AuthenticationService, GlobalConfigurationService } from '@episto/server-services';
import { getAuthCookies, setAuthCookies } from '../helpers/cookieHelpers';
import { CookieOptionProvider } from '../helpers/CookieOptionProvider';
import { IXGatewayServiceProvider } from '@episto/x-gateway';
import { IController } from '../interfaces/IController';
import { XControllerAction } from '@episto/x-gateway';
import { ActionParams } from '../helpers/ActionParams';

export class AuthenticationController implements IController<AuthenticationController> {

    private _authenticationService: AuthenticationService;
    private _config: GlobalConfigurationService;
    private _cookieOptionProvider: CookieOptionProvider;

    constructor(serviceProvider: IXGatewayServiceProvider) {

        this._authenticationService = serviceProvider.getService(AuthenticationService);
        this._config = serviceProvider.getService(GlobalConfigurationService);
        this._cookieOptionProvider = serviceProvider.getService(CookieOptionProvider);
    }

    @XControllerAction(apiRoutes.authentication.loginUser, { isPost: true, isPublic: true })
    async logInUserAction(params: ActionParams) {

        // check request 
        if (!params.req.body)
            throw new ErrorWithCode('Body is null.', 'bad request');

        // get credentials from request
        const { email, password } = params.req.body;

        const { accessToken, refreshToken } = await this
            ._authenticationService
            .logInUserAsync(email, password, params.companyId);

        setAuthCookies(this._config, params.res, accessToken, refreshToken, this._cookieOptionProvider.cookieOptions);
    }

    @XControllerAction(apiRoutes.authentication.establishAuthHandshake, { isPublic: true })
    async establishAuthHandshakeAction(params: ActionParams) {

        const { refreshToken } = getAuthCookies(params.req, this._config);

        const data = await this
            ._authenticationService
            .establishAuthHandshakeAsync(refreshToken, params.companyId);

        setAuthCookies(this._config, params.res, data.newAccessToken, data.newRefreshToken, this._cookieOptionProvider.cookieOptions);

        return data.authData;
    }

    @XControllerAction(apiRoutes.authentication.logoutUser, { isPost: true, isUnauthorized: true })
    async logOutUserAction(params: ActionParams) {

        await this._authenticationService
            .logOutUserAsync(params.principalId);

        // remove browser cookies
        params.res.clearCookie(this._config.misc.accessTokenCookieName, this._cookieOptionProvider.cookieOptions);
        params.res.clearCookie(this._config.misc.refreshTokenCookieName, this._cookieOptionProvider.cookieOptions);
    }
}