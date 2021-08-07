import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import { nextTick } from 'process';
import { router as articleRoutes } from './api/articles/routes';
import { getCurrentUser as getCurrentUserAction, logInUserAction, registerUserAction, renewUserSession } from "./api/authenticationActions";
import { router as courseRoutes } from './api/courses/routes';
import { router as filesRoutes } from './api/files/routes';
import { router as groupsRoutes } from './api/groups/routes';
import { router as organizationRoutes } from './api/organizations/routes';
import { router as overlaysRoutes } from './api/overlays/routes';
import { router as tagsRoutes } from './api/tags/routes';
import { router as tasksRoutes } from './api/tasks/routes';
import { router as usersRoutes } from './api/users/routes';
import { router as videosRoutes } from './api/videos/routes';
import { router as generalDataRoutes } from './api/votes/routes';
import { connectToMongoDB } from "./services/connectMongo";
import { initailizeDotEnvEnvironmentConfig } from "./services/environment";
import { log } from "./services/logger";
import { ExpressRequest, ExpressResponse, ExpressNext, respondOk } from './utilities/helpers';

// initialize env
// require is mandatory here, for some unknown reason
export const globalConfig = initailizeDotEnvEnvironmentConfig();

// connect mongo db
connectToMongoDB();

const expressServer = express();

const allowAllCorsMiddleware = (req: ExpressRequest, res: ExpressResponse, next: ExpressNext) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
}

const authMiddleware = (req: ExpressRequest, res: ExpressResponse, next: ExpressNext) => {

    next();
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

const setCredentialCORSHearders = (res: ExpressResponse) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', "true");
}

//
// add middlewares
//

// expressServer.use(authMiddleware);
// expressServer.use(corsMiddleware);

expressServer.use(bodyParser.json());
expressServer.use(fileUpload());
expressServer.use((req, res, next) => {

    setCredentialCORSHearders(res);
    next();
})

// register user 
expressServer.options('/register-user', respondOk);
expressServer.post('/register-user', registerUserAction);

expressServer.options('/renew-user-session', respondOk);
expressServer.get('/renew-user-session', renewUserSession);

expressServer.post('/login-user', logInUserAction);
expressServer.get('/get-current-user', getCurrentUserAction);

expressServer.use('/articles', articleRoutes)
expressServer.use('/courses', courseRoutes)
expressServer.use('/groups', groupsRoutes)
expressServer.use('/organizations', organizationRoutes)
expressServer.use('/tags', tagsRoutes)
expressServer.use('/tasks', tasksRoutes)
expressServer.use('/upload', filesRoutes)
expressServer.use('/overlays', overlaysRoutes)
expressServer.use('/users', usersRoutes);
expressServer.use('/videos', videosRoutes);
expressServer.use('/votes', generalDataRoutes);

expressServer.use((req, res) => {
    throw new Error(`Route did not match: ${req.url}`);
});

expressServer.use((error: express.Errback, req: express.Request, res: express.Response) => {
    return res.status(500).send(error.toString());
});

// listen
expressServer.listen(globalConfig.misc.hostPort, () =>
    log(`Listening on port '${globalConfig.misc.hostPort}'!`));

