import cors from 'cors';
import { Request } from 'express';
import { apiRoutes, isOpenRoute } from '../models/shared_models/types/apiRoutes';
import { staticProvider } from '../staticProvider';
import { getAsyncMiddlewareHandler, TypedError } from '../utilities/helpers';
import { getRequestAccessTokenPayload } from './authenticationService';
import { log } from './misc/logger';
import { getUserById } from './userService';

export const getAuthMiddleware = () => getAsyncMiddlewareHandler(async (req: Request) => {

    const currentRoutePath = req.path;

    log(`Authorizing request: ${currentRoutePath}`);

    // do not authenticate on open routes
    if (isOpenRoute(currentRoutePath)) {

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
            "/get-current-user",
            "/renew-user-session",
            apiRoutes.signup.getSignupData,
            apiRoutes.signup.answerSignupQuestion
        ];

        if (!unprotectedRoutes.some(x => x === currentRoutePath))
            throw new TypedError("User has not proper rights to access the requested resource.", "forbidden");
    }

    log(`Request [${currentRoutePath}] is permitted. UserId: ${user.id}`);
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