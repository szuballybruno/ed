import { AuthenticationService } from '../services/AuthenticationService';
import { LoggerService } from '../services/LoggerService';
import { ErrorWithCode } from '../shared/types/ErrorWithCode';
import { Id } from '../shared/types/versionId';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { getAuthCookies } from '../utilities/helpers';
import { ITurboMiddlewareInstance, MiddlewareParams, ITurboRequest, ITurboResponse } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class AuthenticationMiddleware implements ITurboMiddlewareInstance<void, ITurboRequest, ITurboResponse, ActionParams> {

    private _authenticationService: AuthenticationService;
    private _loggerService: LoggerService;

    constructor(serviceProvider: ServiceProvider) {

        this._authenticationService = serviceProvider.getService(AuthenticationService);
        this._loggerService = serviceProvider.getService(LoggerService);
    }

    runMiddlewareAsync = async (params: MiddlewareParams<void, ITurboRequest, ITurboResponse>): Promise<ActionParams> => {

        const { req, res, options } = params;

        const { accessToken } = getAuthCookies(req);
        const requestPath = req.path;

        this._loggerService
            .logScoped('SERVER', `${requestPath}: Authorizing request...`);

        // public route 
        if (options.isPublic) {

            this._loggerService
                .logScoped('SERVER', `${requestPath}: Route is open, skipping authentication...`);

            return new ActionParams(req, res, Id.create<'User'>(-1));
        }

        // private (authenticated) route
        else {

            if (!accessToken)
                throw new ErrorWithCode('Access token not found!', 'forbidden');

            // get userId from access token
            const { userId } = this._authenticationService
                .getRequestAccessTokenPayload(accessToken);

            // permitted. finalization             
            this._loggerService
                .logScoped('SERVER', `${requestPath}: Request permitted. UserId: ${userId} Proceeding...`);

            return new ActionParams(req, res, userId);
        }
    };
}