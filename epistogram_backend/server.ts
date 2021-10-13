import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import "reflect-metadata"; // needs to be imported for TypeORM
import { getAdminCoursesAction } from "./api/adminCourses";
import { changePasswordAction, getCurrentUserAction, logInUserAction, logOutUserAction, renewUserSessionAction } from './api/authenticationActions';
import { getUserCoursesDataAction, setCourseTypeAction, startCourseAction } from './api/courseActions';
import { answerPractiseQuestionAction, answerSignupQuestionAction, getCourseItemsAction, getCurrentCourseItemCode, getEditedCourseAction, getOrganizationsAction, getOverviewPageDTOAction, getPractiseQuestionAction, getRegistrationLinkAction, getSignupDataAction, getUserPersonalityDataAction, getUsersAction as getUserAdministrationUserListAction, registerInvitedUserAction, registerUserAction, requestChangePasswordAction, saveUserDataAction, setEditedCourseAction } from './api/dataActions';
import { answerExamQuestionAction, getExamResultsAction } from './api/examActions';
import { uploadAvatarFileAction, uploadCourseCoverFileAction, uploadVideoFileAction, uploadVideoThumbnailFileAction } from './api/fileActions';
import { getPlayerDataAction, saveVideoPlaybackSampleAction } from './api/playerActions';
import { answerVideoQuestionAction } from './api/questionActions';
import { createInvitedUserAction } from './api/signupActions';
import { deleteUserAction } from './api/userAdministartionActions';
import { getUserCoursesAction } from './api/userCoursesActions';
import { initializeDBAsync } from './database';
import { apiRoutes } from './models/shared_models/types/apiRoutes';
import { initailizeDotEnvEnvironmentConfig } from "./services/environment";
import { getAuthMiddleware, getCORSMiddleware } from './services/middlewareService';
import { log, logError } from "./services/misc/logger";
import { staticProvider } from './staticProvider';
import { getAsyncActionHandler } from './utilities/helpers';
import './utilities/jsExtensions';

// initialize env
// require is mandatory here, for some unknown reason
initailizeDotEnvEnvironmentConfig();

log("");
log(`------------- APPLICATION STARTED, ENVIRONEMNT: ${staticProvider.globalConfig.misc.environmentName} ----------------`);
log("");

const initializeAsync = async () => {

    // init DB
    log("Initializing DB...");
    await initializeDBAsync();
    log("DB initialized.");

    // init express
    log("Initializing express...");
    const expressServer = express();

    //
    // add middlewares
    //

    expressServer.use(getCORSMiddleware());
    expressServer.use(bodyParser.json());
    expressServer.use(fileUpload());
    expressServer.use(getAuthMiddleware());

    // open routes
    expressServer.get(apiRoutes.open.renewUserSession, renewUserSessionAction);
    expressServer.post(apiRoutes.open.loginUser, getAsyncActionHandler(logInUserAction));
    expressServer.post(apiRoutes.open.registerUser, registerUserAction);
    expressServer.post(apiRoutes.open.registerInvitedUser, registerInvitedUserAction);

    // misc
    expressServer.get('/get-current-user', getCurrentUserAction);
    expressServer.get('/get-current-course-item-code', getCurrentCourseItemCode);
    expressServer.get('/misc/get-practise-question', getPractiseQuestionAction);
    expressServer.post('/misc/save-user-data', saveUserDataAction);
    expressServer.post('/misc/request-change-password', requestChangePasswordAction);
    expressServer.post('/misc/set-new-password', changePasswordAction);
    expressServer.get('/misc/get-registration-link', getRegistrationLinkAction);
    expressServer.post(apiRoutes.misc.logoutUser, logOutUserAction);

    // signup
    expressServer.post(apiRoutes.signup.answerSignupQuestion, answerSignupQuestionAction);
    expressServer.get(apiRoutes.signup.getSignupData, getSignupDataAction);
    expressServer.get(apiRoutes.signup.getUserPersonalityData, getUserPersonalityDataAction);

    // file
    expressServer.post('/file/upload-video', uploadVideoFileAction);
    expressServer.post('/file/upload-video-thumbnail', uploadVideoThumbnailFileAction);
    expressServer.post('/file/upload-avatar', uploadAvatarFileAction);
    expressServer.post('/file/upload-course-cover', uploadCourseCoverFileAction);

    // data
    expressServer.get("/data/get-overview-page-dto", getAsyncActionHandler(getOverviewPageDTOAction));

    // player
    expressServer.post('/player/get-player-data', getPlayerDataAction);
    expressServer.post('/player/save-video-playback-sample', saveVideoPlaybackSampleAction);
    expressServer.post('/player/get-course-items', getCourseItemsAction);

    // users
    expressServer.get("/users/get-user-administartion-user-list", getUserAdministrationUserListAction);
    expressServer.post("/users/create-invited-user", getAsyncActionHandler(createInvitedUserAction));
    expressServer.post("/users/delete-user", deleteUserAction);
    expressServer.get("/users/get-courses-data", getUserCoursesDataAction);

    // course
    expressServer.post("/course/start-course", startCourseAction);
    expressServer.post("/course/set-course-mode", setCourseTypeAction);

    // available courses
    expressServer.post("/get-user-courses", getUserCoursesAction);

    // course administartion
    expressServer.post("/get-admin-courses", getAsyncActionHandler(getAdminCoursesAction));
    expressServer.post("/get-admin-edit-course", getAsyncActionHandler(getEditedCourseAction))
    expressServer.post("/set-admin-edit-course", getAsyncActionHandler(setEditedCourseAction))

    // organizations
    expressServer.get("/organizations/get-organizations", getAsyncActionHandler(getOrganizationsAction));

    // exam
    expressServer.get("/exam/get-exam-results", getExamResultsAction);

    // question answer
    expressServer.post("/questions/answer-video-question", answerVideoQuestionAction);
    expressServer.post("/questions/answer-exam-question", answerExamQuestionAction);
    expressServer.post("/questions/answer-practise-question", answerPractiseQuestionAction);

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

