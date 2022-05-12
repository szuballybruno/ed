import { Request, Response } from 'express';
import { AuthenticationService } from '../services/AuthenticationService';
import { LoggerService } from '../services/LoggerService';
import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import { UserService } from '../services/UserService';
import { VerboseError } from '../shared/types/VerboseError';
import { getAuthCookies } from '../utilities/helpers';
import { ActionParams } from "../utilities/ActionParams";
import { EndpointOptionsType, ITurboMiddleware } from '../utilities/XTurboExpress/TurboExpress';

export class AuthMiddleware implements ITurboMiddleware<ActionParams> {

    private _authenticationService: AuthenticationService;
    private _userService: UserService;
    private _globalConfig: GlobalConfiguration;
    private _loggerService: LoggerService;

    constructor(
        authenticationService: AuthenticationService,
        userService: UserService,
        globalConfig: GlobalConfiguration,
        loggerService: LoggerService) {

        this._authenticationService = authenticationService;
        this._userService = userService;
        this._globalConfig = globalConfig;
        this._loggerService = loggerService;
    }

    runMiddlewareAsync = async (req: Request, res: Response, options?: EndpointOptionsType, params?: ActionParams) => {

        const { accessToken } = getAuthCookies(req);
        const requestPath = req.path;

        this._loggerService
            .log(`${requestPath}: REQUEST ARRIVED`);

        this._loggerService
            .logSecondary(`${requestPath}: Authorizing request...`);

        // public route 
        if (options?.isPublic) {

            this._loggerService.log(`${requestPath}: Route is open, skipping authentication...`);
            return new ActionParams(req, res, -1, !!options?.isMultipart);
        }

        // private (authenticated) route
        else {

            if (!accessToken)
                throw new VerboseError('Access token not found!', 'forbidden');

            // get userId from access token
            const { userId } = this._authenticationService
                .getRequestAccessTokenPayload(accessToken);

            // retrieve user from DB
            // const user = await this._userService
            //     .getUserById(userId);

            // authorize user role 
            // await this.authorizeUserAsync(userRole, options?.authorize);

            // authorize user access level (limited / full)
            // await this.authrorizeUserAccessLevelAsync(user.userActivity, requestPath);

            // permitted. finalization             
            this._loggerService
                .logSecondary(`${requestPath}: Request permitted. UserId: ${userId} Proceeding...`);

            return new ActionParams(req, res, userId, !!options?.isMultipart);
        }
    };

    // private authrorizeUserAccessLevelAsync = async (userActivity: UserActivityFlatView, currentRoutePath: string) => {

    //     // user is now authorized to access applicaiton
    //     // but some routes are still permitted
    //     if (userActivity.canAccessApplication)
    //         return;

    //     const openAccessRoutes = [
    //         apiRoutes.authentication.getCurrentUser,
    //         apiRoutes.authentication.renewUserSession,
    //         apiRoutes.signup.getSignupData,
    //         apiRoutes.signup.answerSignupQuestion,
    //         apiRoutes.signup.getUserPersonalityData
    //     ];

    //     const isCurrentRouteAccessable = openAccessRoutes
    //         .some(x => x === currentRoutePath);

    //     if (!isCurrentRouteAccessable)
    //         throw new VerboseError('User has not proper rights to access the requested resource.', 'forbidden');
    // };
}