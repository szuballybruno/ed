import { AuthenticationService } from '../services/AuthenticationService';
import { LoggerService } from '../services/LoggerService';
import { ErrorWithCode } from '../shared/types/ErrorWithCode';
import { ServiceProvider } from '../startup/servicesDI';
import { getAuthCookies } from '../utilities/helpers';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { ITurboMiddlewareInstance, ITurboRequest, ITurboResponse, MiddlewareParams } from '../utilities/XTurboExpress/XTurboExpressTypes';

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

            return new ActionParams(req, res, null as any);
        }

        // private (authenticated) route
        else {

            try {
                if (!accessToken)
                    throw new Error('Access token not found!');

                // get userId from access token
                const { userId } = this._authenticationService
                    .getRequestAccessTokenPayload(accessToken);

                // permitted. finalization             
                this._loggerService
                    .logScoped('SERVER', `${requestPath}: Request permitted. UserId: ${userId} Proceeding...`);

                return new ActionParams(req, res, userId);
            }
            catch (e: any) {

                throw new ErrorWithCode(e.message, 'forbidden');
            }
        }
    };
}