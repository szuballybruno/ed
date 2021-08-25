import bodyParser from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import "reflect-metadata"; // need to be imported for TypeORM
import { router as articleRoutes } from './api/articles/routes';
import { getCurrentUserAction, logInUserAction, logOutUserAction, renewUserSessionAction } from './api/authenticationActions';
import { router as courseRoutes } from './api/courses/routes';
import { getOverviewPageDTOAction, getUsersAction } from './api/dataActions';
import { router as filesRoutes } from './api/files/routes';
import { router as groupsRoutes } from './api/groups/routes';
import { router as organizationRoutes } from './api/organizations/routes';
import { router as overlaysRoutes } from './api/overlays/routes';
import { getCurrentVideoAction, setCurrentVideoAction } from './api/playerActions';
import { router as tagsRoutes } from './api/tags/routes';
import { router as tasksRoutes } from './api/tasks/routes';
import { getUserCoursesAction } from './api/userCourses';
import { createInvitedUserAction, finalizeUserRegistrationAction } from './api/userManagementActions';
import { router as usersRoutes } from './api/users/routes';
import { router as videosRoutes } from './api/videos/routes';
import { router as generalDataRoutes } from './api/votes/routes';
import { initializeDBAsync, seedDB, TypeORMConnection } from './database';
import { authorizeRequest } from './services/authentication';
import { getOverviewPageDTOAsync } from './services/dataService';
import { initailizeDotEnvEnvironmentConfig } from "./services/environment";
import { log, logError } from "./services/logger";
import { getUserDataAsync } from './services/userDataService';
import { getAsyncActionHandler, respond } from './utilities/helpers';

// initialize env
// require is mandatory here, for some unknown reason
export const globalConfig = initailizeDotEnvEnvironmentConfig();

let typeORMConnection = null as TypeORMConnection | null;

export const getTypeORMConnection = () => {

    if (!typeORMConnection)
        throw new Error("ORM Connection is not (yet) established!");

    return typeORMConnection;
};

const initializeAsync = async () => {

    // init DB
    log("Initializing DB...");
    typeORMConnection = await initializeDBAsync(true);
    log("DB initialized.");

    // Seed DB
    log("Seeding DB...");
    await seedDB()
    log("DB seeding completed.");

    await getOverviewPageDTOAsync(1);

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

    // register user
    expressServer.use((req, res, next) => {

        log("Request arrived: " + req.path);
        next();
    })

    expressServer.get('/renew-user-session', renewUserSessionAction);
    expressServer.post('/log-out-user', logOutUserAction);
    expressServer.post('/login-user', logInUserAction);

    expressServer.get('/test', (req, res) => getUserDataAsync("6022c270f66f803c80243250").then(x => res.json(x)));

    //
    // protected 
    // 

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

    expressServer.use('/articles', authMiddleware, articleRoutes)
    expressServer.use('/courses', authMiddleware, courseRoutes)
    expressServer.use('/groups', authMiddleware, groupsRoutes)
    expressServer.use('/organizations', authMiddleware, organizationRoutes)
    expressServer.use('/tags', authMiddleware, tagsRoutes)
    expressServer.use('/tasks', authMiddleware, tasksRoutes)
    expressServer.use('/upload', authMiddleware, filesRoutes)
    expressServer.use('/overlays', authMiddleware, overlaysRoutes)
    expressServer.use('/users', authMiddleware, usersRoutes);
    expressServer.use('/videos', authMiddleware, videosRoutes);
    expressServer.use('/votes', authMiddleware, generalDataRoutes);

    expressServer.use((req, res) => {

        res.status(404).send(`Route did not match: ${req.url}`);
    });

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

