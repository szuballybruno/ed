import bodyParser from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import { router as articleRoutes } from './api/articles/routes';
import { getCurrentUserAction, logInUserAction, logOutUserAction, renewUserSessionAction } from './api/authenticationActions';
import { router as courseRoutes } from './api/courses/routes';
import { getOverviewPageDTOAction } from './api/dataActions';
import { router as filesRoutes } from './api/files/routes';
import { router as groupsRoutes } from './api/groups/routes';
import { router as organizationRoutes } from './api/organizations/routes';
import { router as overlaysRoutes } from './api/overlays/routes';
import { router as tagsRoutes } from './api/tags/routes';
import { router as tasksRoutes } from './api/tasks/routes';
import { router as usersRoutes } from './api/users/routes';
import { router as videosRoutes } from './api/videos/routes';
import { router as generalDataRoutes } from './api/votes/routes';
import { authorizeRequest } from './services/authentication';
import { connectToMongoDB } from "./services/connectMongo";
import { initailizeDotEnvEnvironmentConfig } from "./services/environment";
import { log, logError } from "./services/logger";
import { getUserDataAsync } from './services/userDataService';
import { getAsyncActionHandler, respondForbidden, respondOk } from './utilities/helpers';

// initialize env
// require is mandatory here, for some unknown reason
export const globalConfig = initailizeDotEnvEnvironmentConfig();

// connect mongo db
connectToMongoDB().then(() => {
    const expressServer = express();

    // const allowAllCorsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    //     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    //     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    //     next();
    // }

    const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

        log("Authorizing request...");

        authorizeRequest(req)
            .then(tokenMeta => {

                log("Authorization successful, userId: " + tokenMeta.userId);
                next();
            })
            .catch(() => {

                log("Authorizing request failed.");
                respondForbidden(res);
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

    const setCredentialCORSHearders = (res: Response) => {
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS, DELETE');
        // res.setHeader('Access-Control-Allow-Credentials', "true");
    }

    //
    // add middlewares
    //

    expressServer.use(corsMiddleware);
    expressServer.use(bodyParser.json());
    expressServer.use(fileUpload());
    expressServer.use((req, res, next) => {

        setCredentialCORSHearders(res);
        next();
    })

    // register user
    expressServer.use((req, res, next) => {

        log("Request arrived: " + req.path);
        next();
    })

    expressServer.get('/renew-user-session', renewUserSessionAction);
    expressServer.post('/log-out-user', logOutUserAction);
    expressServer.post('/login-user', logInUserAction);

    expressServer.get('/test', (req, res) => getUserDataAsync("6022c270f66f803c80243250").then(x => res.json(x)));

    // protected 
    expressServer.get("/get-overview-page-dto", authMiddleware, getAsyncActionHandler(getOverviewPageDTOAction));
    expressServer.get('/get-current-user', authMiddleware, getCurrentUserAction);
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

});


