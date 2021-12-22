import cors from 'cors';
import { Request } from 'express';
import { User } from '../../models/entity/User';
import { apiRoutes } from '../../models/shared_models/types/apiRoutes';
import { staticProvider } from '../../staticProvider';
import { getAsyncMiddlewareHandler } from '../../utilities/apiHelpers';
import { TypedError } from '../../utilities/helpers';
import { log } from './logger';

export const getAuthMiddleware = (
    getRequestAccessTokenPayload: (req: Request) => any,
    getUserById: (userId: number) => Promise<User>,
    openRoutes: string[]) => getAsyncMiddlewareHandler(async (req: Request) => {

        const currentRoutePath = req.path;

        log(`Authorizing request: ${currentRoutePath}`);

        // do not authenticate on open routes
        if (openRoutes.some(x => x === currentRoutePath)) {

            log(`Route [${currentRoutePath}] is an open route, skipping authentication!`);
            return;
        }

        const payload = getRequestAccessTokenPayload(req);

        const user = await getUserById(payload.userId);
        if (!user)
            throw new TypedError("User not found by id: " + payload.userId, "bad request");

        // user is now authorized to access applicaiton
        // but some routes are still permitted
        if (!user.userActivity.canAccessApplication) {

            const unprotectedRoutes = [
                apiRoutes.authentication.getCurrentUser,
                apiRoutes.authentication.renewUserSession,
                apiRoutes.signup.getSignupData,
                apiRoutes.signup.answerSignupQuestion,
                apiRoutes.signup.getUserPersonalityData
            ];

            if (!unprotectedRoutes.some(x => x === currentRoutePath))
                throw new TypedError("User has not proper rights to access the requested resource.", "forbidden");
        }

        log(`Request [${currentRoutePath}] is permitted. UserId: ${user.id}`);
    });

export const getUnderMaintanenceMiddleware = () => getAsyncMiddlewareHandler(async (req, res, next) => {

    if (!staticProvider.globalConfig.misc.isUnderMaintanence)
        return;

    throw new TypedError("Server is under maintanence!", "under maintenance")
});

export const getCORSMiddleware = () => cors({
    origin: staticProvider.globalConfig.misc.frontendUrl,
    credentials: true,
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "Authorization"
    ],
    preflightContinue: false,
    methods: "DELETE, PATCH"
});