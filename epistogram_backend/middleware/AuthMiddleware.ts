import { Request, Response } from "express";
import { User } from "../models/entity/User";
import { apiRoutes } from "../models/shared_models/types/apiRoutes";
import { RoleIdEnum, RoleType } from "../models/shared_models/types/sharedTypes";
import { AuthenticationService } from "../services/AuthenticationService";
import { LoggerService } from "../services/LoggerService";
import { GlobalConfiguration } from "../services/misc/GlobalConfiguration";
import { UserService } from "../services/UserService";
import { EndpointOptionsType } from "../utilities/apiHelpers";
import { ActionParams, getAuthTokenFromRequest, TypedError } from "../utilities/helpers";
import { ITurboMiddleware } from "../utilities/TurboExpress";

export class AuthMiddleware implements ITurboMiddleware<ActionParams, EndpointOptionsType> {

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

        const accessToken = getAuthTokenFromRequest(req, this._globalConfig);
        const requestPath = req.path;

        this._loggerService.log(`${requestPath}: Authorizing request...`);

        // public route 
        if (options?.isPublic) {

            this._loggerService.log(`${requestPath}: Route is open, skipping authentication...`);
            return new ActionParams(req, res, -1, !!options?.isMultipart);
        }

        // private (authenticated) route
        else {

            // get userId from access token
            const userId = this._authenticationService
                .getRequestAccessTokenPayload(accessToken).userId;

            // retrieve user from DB
            const user = await this._userService
                .getUserById(userId);

            // authorize user role 
            await this.authorizeUserAsync(user, options?.authorize);

            // authorize user access level (limited / full)
            await this.authrorizeUserAccessLevelAsync(user, requestPath);

            // permitted. finalization             
            this._loggerService
                .log(`${requestPath}: Request permitted. UserId: ${user.id} Proceeding...`);

            return new ActionParams(req, res, userId, !!options?.isMultipart);
        }
    };

    private authrorizeUserAccessLevelAsync = async (user: User, currentRoutePath: string) => {

        // user is now authorized to access applicaiton
        // but some routes are still permitted
        if (user.userActivity.canAccessApplication)
            return;

        const openAccessRoutes = [
            apiRoutes.authentication.getCurrentUser,
            apiRoutes.authentication.renewUserSession,
            apiRoutes.signup.getSignupData,
            apiRoutes.signup.answerSignupQuestion,
            apiRoutes.signup.getUserPersonalityData
        ];

        const isCurrentRouteAccessable = openAccessRoutes
            .some(x => x === currentRoutePath);

        if (!isCurrentRouteAccessable)
            throw new TypedError("User has not proper rights to access the requested resource.", "forbidden");
    }

    private authorizeUserAsync = async (user: User, authorize: RoleType[] | undefined) => {

        if (!authorize)
            return;

        const userRoleType = RoleIdEnum
            .toRoleType(user.roleId);

        const isAuthorized = authorize
            .some(allowedRoleType => allowedRoleType === userRoleType);

        if (!isAuthorized)
            throw new Error("Unauthorized.");
    }
}