import { Connection, connectToMongoDB } from "./services/connectMongo";
import fileUpload from 'express-fileupload'
import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors';
import { router as articleRoutes } from './api/articles/routes'
import { router as courseRoutes } from './api/courses/routes'
import { router as organizationRoutes } from './api/organizations/routes'
import { router as usersRoutes } from './api/users/routes'
import { router as videosRoutes } from './api/videos/routes'
import { router as generalDataRoutes } from './api/votes/routes'
import { router as filesRoutes } from './api/files/routes'
import { router as overlaysRoutes } from './api/overlays/routes'
import { router as tasksRoutes } from './api/tasks/routes'
import { router as tagsRoutes } from './api/tags/routes'
import { router as groupsRoutes } from './api/groups/routes'
import { initailizeDotEnvEnvironmentConfig } from "./services/environment";
import { log } from "./services/logger";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import { parseWithoutProcessing } from "handlebars";

// initialize env
// require is mandatory here, for some unknown reason
export const globalConfig = initailizeDotEnvEnvironmentConfig();

// connect mongo db
connectToMongoDB();

const expressServer = express();
type ExpressRequest = express.Request;
type ExpressResponse = express.Response;
type ExpressNext = () => void;

const allowAllCorsMiddleware = (req: ExpressRequest, res: ExpressResponse, next: ExpressNext) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
}

const authMiddleware = (req: ExpressRequest, res: ExpressResponse, next: ExpressNext) => {

    next();
};

class User {
    email: string;
    password: string;
    id: number;

    constructor(email: string, password: string, id: number) {
        this.email = email;
        this.password = password;
        this.id = id;
    }
}

const getAccessToken = (user: User) => jwt.sign(JSON.stringify(user), globalConfig.security.jwtSignSecret);
const validateAccessToken = (token: string) => jwt.verify(token, globalConfig.security.jwtSignSecret);

const setAccessTokenCookie = (res: ExpressResponse, accessToken: string) => {
    res.cookie("accessToken", accessToken, {
        secure: false,
        httpOnly: true,
        expires: dayjs().add(30, "days").toDate()
    });
}

const respondValidationError = (res: ExpressResponse, error: string) =>
    res.status(400).json({ error: error });

const registerUserAction = (req: ExpressRequest, res: ExpressResponse, next: ExpressNext) => {

    const email = req.body.email;
    const password = req.body.password;

    if (!email)
        respondValidationError(res, "Email is not provided!");

    if (!password)
        respondValidationError(res, "Password is not provided!");

    // TODO: persist user in DB
    const user = new User(email, password, 1);

    const accessToken = getAccessToken(user);

    setAccessTokenCookie(res, accessToken);

    res.sendStatus(200);
}

// add middlewares
expressServer.use(authMiddleware);

expressServer.use(bodyParser.json());
expressServer.use(fileUpload());
expressServer.use(cors());
expressServer.use(allowAllCorsMiddleware);

expressServer.post('/register-user', registerUserAction);

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

expressServer.use(() => {
    throw new Error('Nem létezik ilyen útvonal');
});

expressServer.use((error: express.Errback, req: express.Request, res: express.Response) => {
    return res.status(500).send(error.toString());
});

// listen
expressServer.listen(globalConfig.misc.hostPort, () =>
    log(`Listening on port '${globalConfig.misc.hostPort}'!`));

