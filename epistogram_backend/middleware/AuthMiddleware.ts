import { NextFunction, Request, Response } from "express";
import { ErrorType, RoleIdEnum } from "../models/shared_models/types/sharedTypes";
import { AuthenticationService } from "../services/AuthenticationService";
import { GlobalConfiguration } from "../services/misc/GlobalConfiguration";
import { log, logError } from "../services/misc/logger";
import { UserService } from "../services/UserService";
import { ApiActionType, EndpointOptionsType, respond, respondError } from "../utilities/apiHelpers";
import { ActionParams, getAuthTokenFromRequest } from "../utilities/helpers";

export class AuthMiddleware {

    private _authenticationService: AuthenticationService;
    private _userService: UserService;
    private _globalConfig: GlobalConfiguration;

    constructor(
        authenticationService: AuthenticationService,
        userService: UserService,
        globalConfig: GlobalConfiguration) {

        this._authenticationService = authenticationService;
        this._userService = userService;
        this._globalConfig = globalConfig;
    }

    getSyncActionWrapper = (action: ApiActionType, options?: EndpointOptionsType) => {

        // authorize user 
        const authorizeUserAsync = async (userId: number) => {

            const user = await this._userService
                .getUserById(userId);

            if (!options?.authorize)
                return;

            const userRoleType = RoleIdEnum
                .toRoleType(user.roleId);

            const isAuthorized = options
                .authorize
                .some(allowedRoleType => allowedRoleType === userRoleType);

            if (!isAuthorized)
                throw new Error("Unauthorized.");
        }

        // async wrapper
        const asyncActionWrapper = async (req: Request, res: Response, next: NextFunction) => {

            const accessToken = getAuthTokenFromRequest(req, this._globalConfig);

            // public route 
            if (options?.isPublic) {

                const actionParams = new ActionParams(req, res, next, -1, !!options?.isMultipart);

                return await action(actionParams);
            }

            // private (authenticated) route
            else {

                // get userId from access token
                const userId = this._authenticationService
                    .getRequestAccessTokenPayload(accessToken).userId;

                // authorize user 
                await authorizeUserAsync(userId);

                // create action params 
                const actionParams = new ActionParams(req, res, next, userId, !!options?.isMultipart);

                // evaluate action
                return await action(actionParams);
            }
        }

        // sync wrapper 
        const syncActionWrapper = (req: Request, res: Response, next: NextFunction) => {

            const requestPath = req.path;

            asyncActionWrapper(req, res, next)
                .then((returnValue: any) => {

                    log(`${requestPath}: Succeeded...`);
                    respond(res, 200, returnValue)
                })
                .catch((error: any) => {

                    log(`${requestPath}: Failed...`);
                    logError(error);
                    respondError(res, error.message, (error.type ?? "internal server error") as ErrorType);
                });
        }

        return syncActionWrapper;
    }
}