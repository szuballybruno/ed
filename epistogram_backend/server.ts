import bodyParser from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import "reflect-metadata"; // needs to be imported for TypeORM
import { getAdminCoursesAction } from "./api/adminCourses";
import { getCurrentUserAction, logInUserAction, logOutUserAction, renewUserSessionAction } from './api/authenticationActions';
import { getEditedCourseAction, getOrganizationsAction, getOverviewPageDTOAction, getSignupDataAction, getUsersAction as getUserAdministrationUserListAction, saveSignupQuestionAnswerAction } from './api/dataActions';
import { uploadAvatarFileAction, uploadCourseCoverFileAction, uploadVideoFileAction, uploadVideoThumbnailFileAction } from './api/fileActions';
import { getPlayerDataAction } from './api/playerActions';
import { getUserCoursesAction } from './api/userCourses';
import { createInvitedUserAction, finalizeUserRegistrationAction } from './api/userManagementActions';
import { initializeDBAsync } from './database';
import { authorizeRequest } from './services/authentication';
import { initailizeDotEnvEnvironmentConfig } from "./services/environment";
import { log, logError } from "./services/misc/logger";
import { staticProvider } from './staticProvider';
import { getAsyncActionHandler, respond } from './utilities/helpers';
import './utilities/jsExtensions';
import { answerQuestionAction } from './api/questionActions';

// initialize env
// require is mandatory here, for some unknown reason
initailizeDotEnvEnvironmentConfig();

const initializeAsync = async () => {

    const recreateDatabaseAtStart = staticProvider.globalConfig.database.recreateDatabaseAtStart;

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
    expressServer.post('/get-signup-data', getSignupDataAction);
    expressServer.post('/save-signup-question-answer', saveSignupQuestionAnswerAction);

    // misc
    expressServer.get('/get-current-user', authMiddleware, getCurrentUserAction);

    // file
    expressServer.post('/file/upload-video', authMiddleware, uploadVideoFileAction);
    expressServer.post('/file/upload-video-thumbnail', authMiddleware, uploadVideoThumbnailFileAction);
    expressServer.post('/file/upload-avatar', authMiddleware, uploadAvatarFileAction);
    expressServer.post('/file/upload-course-cover', authMiddleware, uploadCourseCoverFileAction);

    // data
    expressServer.get("/data/get-overview-page-dto", authMiddleware, getAsyncActionHandler(getOverviewPageDTOAction));

    // player
    expressServer.post('/player/get-player-data', authMiddleware, getPlayerDataAction);

    // users
    expressServer.get("/users/get-user-administartion-user-list", authMiddleware, getUserAdministrationUserListAction);
    expressServer.post("/users/create-invited-user", authMiddleware, getAsyncActionHandler(createInvitedUserAction));
    expressServer.post("/users/finalize-user-registration", authMiddleware, getAsyncActionHandler(finalizeUserRegistrationAction));

    // courses 
    expressServer.post("/get-user-courses", authMiddleware, getUserCoursesAction);
    expressServer.post("/get-admin-courses", authMiddleware, getAsyncActionHandler(getAdminCoursesAction));
    expressServer.post("/get-admin-edit-course", authMiddleware, getAsyncActionHandler(getEditedCourseAction))

    // organizations 
    expressServer.get("/organizations/get-organizations", authMiddleware, getAsyncActionHandler(getOrganizationsAction));

    // questionnaire
    expressServer.post("/questions/answer-question", authMiddleware, answerQuestionAction);

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
    expressServer.listen(staticProvider.globalConfig.misc.hostPort, () =>
        log(`Listening on port '${staticProvider.globalConfig.misc.hostPort}'!`));
};

initializeAsync();

