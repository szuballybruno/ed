import { AuthenticationService } from '../services/AuthenticationService';
import { LoggerService } from '../services/LoggerService';
import { VerboseError } from '../shared/types/VerboseError';
import { ActionParams } from '../utilities/ActionParams';
import { getAuthCookies } from '../utilities/helpers';
import { ITurboMiddleware, MiddlewareParams } from '../utilities/XTurboExpress/TurboExpress';

export class AuthenticationMiddleware implements ITurboMiddleware<void, ActionParams> {

    private _authenticationService: AuthenticationService;
    private _loggerService: LoggerService;

    constructor(
        authenticationService: AuthenticationService,
        loggerService: LoggerService) {

        this._authenticationService = authenticationService;
        this._loggerService = loggerService;
    }

    runMiddlewareAsync = async (params: MiddlewareParams<void>) => {

        const { req, res, options } = params;

        const { accessToken } = getAuthCookies(req);
        const requestPath = req.path;
        const isMultipart = !!options.isMultipart;

        this._loggerService
            .log(`${requestPath}: REQUEST ARRIVED`);

        this._loggerService
            .logSecondary(`${requestPath}: Authorizing request...`);

        // public route 
        if (options.isPublic) {

            this._loggerService
                .log(`${requestPath}: Route is open, skipping authentication...`);

            return new ActionParams(req, res, -1, isMultipart);
        }

        // private (authenticated) route
        else {

            if (!accessToken)
                throw new VerboseError('Access token not found!', 'forbidden');

            // get userId from access token
            const { userId } = this._authenticationService
                .getRequestAccessTokenPayload(accessToken);

            // permitted. finalization             
            this._loggerService
                .logSecondary(`${requestPath}: Request permitted. UserId: ${userId} Proceeding...`);

            return new ActionParams(req, res, userId, isMultipart);
        }
    };
}