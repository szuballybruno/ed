import bodyParser from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import "reflect-metadata"; // need to be imported for TypeORM
import { getCurrentUserAction, logInUserAction, logOutUserAction, renewUserSessionAction } from './api/authenticationActions';
import { getOverviewPageDTOAction, getUsersAction } from './api/dataActions';
import { getCurrentVideoAction, setCurrentVideoAction } from './api/playerActions';
import { getUserCoursesAction } from './api/userCourses';
import { createInvitedUserAction, finalizeUserRegistrationAction } from './api/userManagementActions';
import { initializeDBAsync } from './database';
import { authorizeRequest } from './services/authentication';
import { initailizeDotEnvEnvironmentConfig } from "./services/environment";
import { log, logError } from "./services/misc/logger";
import { getAsyncActionHandler, respond } from './utilities/helpers';
import {getAdminCoursesAction} from "./api/adminCourses";

// initialize env
// require is mandatory here, for some unknown reason
export const globalConfig = initailizeDotEnvEnvironmentConfig();

const initializeAsync = async () => {

    const recreateDatabaseAtStart = globalConfig.database.recreateDatabaseAtStart;

    // init DB
    log("Initializing DB...");
    await initializeDBAsync(recreateDatabaseAtStart);
    log("DB initialized.");

    // init express
    log("Initializing express...");
    const expressServer = express();

    const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

        log("Authorizing request...");

        authorizeRequest(req)
            .then(tokenMeta => {

                log("Authorization successful, userId: " + tokenMeta.userId);
                next();
            })
            .catch(() => {

                log("Authorizing request failed.");
                respond(res, 403);
            });
    };

    const corsMiddleware = cors({
        origin: 'http://localhost:3000',
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

    //
    // add middlewares
    //

    expressServer.use(corsMiddleware);
    expressServer.use(bodyParser.json());
    expressServer.use(fileUpload());

    expressServer.use((req, res, next) => {

        log("Request arrived: " + req.path);
        next();
    })

    // unprotected routes
    expressServer.get('/renew-user-session', renewUserSessionAction);
    expressServer.post('/log-out-user', logOutUserAction);
    expressServer.post('/login-user', getAsyncActionHandler(logInUserAction));

    // misc
    expressServer.get('/get-current-user', authMiddleware, getCurrentUserAction);

    // data
    expressServer.get("/data/get-overview-page-dto", authMiddleware, getAsyncActionHandler(getOverviewPageDTOAction));

    // player
    expressServer.post('/player/set-current-video', authMiddleware, getAsyncActionHandler(setCurrentVideoAction));
    expressServer.get('/player/get-current-video', authMiddleware, getAsyncActionHandler(getCurrentVideoAction));

    // users
    expressServer.get("/users", authMiddleware, getAsyncActionHandler(getUsersAction));
    expressServer.post("/users/create-invited-user", authMiddleware, getAsyncActionHandler(createInvitedUserAction));
    expressServer.post("/users/finalize-user-registration", authMiddleware, getAsyncActionHandler(finalizeUserRegistrationAction));

    // courses 
    expressServer.post("/get-user-courses", authMiddleware, getAsyncActionHandler(getUserCoursesAction));
    expressServer.post("/get-admin-courses", authMiddleware, getAsyncActionHandler(getAdminCoursesAction));

    // 404 - no match
    expressServer.use((req, res) => {

        res.status(404).send(`Route did not match: ${req.url}`);
    });

    // error handler
    expressServer.use((error: express.Errback, req: express.Request, res: express.Response) => {

        logError("Express error middleware.");
        logError(error);
        return res.status(500).send(error.toString());
    });

    // listen
    expressServer.listen(globalConfig.misc.hostPort, () =>
        log(`Listening on port '${globalConfig.misc.hostPort}'!`));
};

initializeAsync();

