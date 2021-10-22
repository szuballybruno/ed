import bodyParser from 'body-parser';
import express from 'express';
import fileUpload from 'express-fileupload';
import "reflect-metadata"; // needs to be imported for TypeORM
import { getAdminCoursesAction } from "./api/adminCourses";
import { changePasswordAction, getCurrentUserAction, logInUserAction, logOutUserAction, renewUserSessionAction } from './api/authenticationActions';
import { getUserCoursesDataAction, setCourseTypeAction, startCourseAction } from './api/courseActions';
import {
    answerPractiseQuestionAction, answerSignupQuestionAction, getCourseBriefDataAction, getCourseItemsAction,
    getCurrentCourseItemCode, getEditedCourseAction, getOrganizationsAction, getOverviewPageDTOAction, getPractiseQuestionAction, getRegistrationLinkAction,
    getSignupDataAction, getUserPersonalityDataAction, registerInvitedUserAction, registerUserAction, requestChangePasswordAction, saveCourseDataAction, saveCourseThumbnailAction, saveUserDataAction, setEditedCourseAction
} from './api/dataActions';
import { answerExamQuestionAction, getExamResultsAction } from './api/examActions';
import { uploadAvatarFileAction } from './api/fileActions';
import { getDailyTipAction, getJobTitlesAction } from './api/miscActions';
import { getPlayerDataAction, saveVideoPlaybackSampleAction } from './api/playerActions';
import { answerVideoQuestionAction } from './api/questionActions';
import { getUserCoursesAction } from './api/userCoursesActions';
import { deleteUserAction, getBriefUserDataAction, getEditUserDataAction, getUserAdministrationUserListAction, inviteUserAction, updateUserAction } from './api/userManagementActions';
import { createVideoAction, deleteVideoAction, getVideoEditDataAction, saveVideoAction, uploadVideoFileAction } from './api/videoActions';
import { initializeDBAsync } from './database';
import { apiRoutes } from './models/shared_models/types/apiRoutes';
import { initailizeDotEnvEnvironmentConfig } from "./services/environment";
import { getAuthMiddleware, getCORSMiddleware } from './services/middlewareService';
import { log, logError } from "./services/misc/logger";
import { staticProvider } from './staticProvider';
import { ActionParamsType, EndpointOptionsType, getAsyncActionHandler, getAsyncActionHandlerNew } from './utilities/helpers';
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

    const addEndpoint = (path: string, action: (params: ActionParamsType) => Promise<any>, options?: EndpointOptionsType) => {

        const opts = options
            ? options
            : {
                isPost: false,
                isPublic: false
            } as EndpointOptionsType;

        const wrappedSyncAction = getAsyncActionHandlerNew(action, opts);

        if (opts.isPost) {

            expressServer.post(path, wrappedSyncAction);
        } else {

            expressServer.get(path, wrappedSyncAction);
        }
    }

    //
    // add middlewares
    //

    expressServer.use(getCORSMiddleware());
    expressServer.use(bodyParser.json({ limit: '5mb' }));
    expressServer.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
    expressServer.use(fileUpload());
    expressServer.use(getAuthMiddleware());

    // open routes
    addEndpoint(apiRoutes.open.renewUserSession, renewUserSessionAction, { isPublic: true });
    expressServer.post(apiRoutes.open.loginUser, getAsyncActionHandler(logInUserAction));
    expressServer.post(apiRoutes.open.registerUser, registerUserAction);
    expressServer.post(apiRoutes.open.registerInvitedUser, registerInvitedUserAction);

    // misc
    addEndpoint('/get-current-user', getCurrentUserAction);
    expressServer.get('/get-current-course-item-code', getCurrentCourseItemCode);
    expressServer.get('/misc/get-practise-question', getPractiseQuestionAction);
    expressServer.post('/misc/save-user-data', saveUserDataAction);
    expressServer.post('/misc/request-change-password', requestChangePasswordAction);
    expressServer.post('/misc/set-new-password', changePasswordAction);
    expressServer.get('/misc/get-registration-link', getRegistrationLinkAction);
    expressServer.post(apiRoutes.misc.logoutUser, logOutUserAction);
    addEndpoint(apiRoutes.misc.getJobTitles, getJobTitlesAction);
    addEndpoint(apiRoutes.misc.getDailyTip, getDailyTipAction);

    // user management
    addEndpoint(apiRoutes.userManagement.getEditUserData, getEditUserDataAction);
    addEndpoint(apiRoutes.userManagement.getUserListForAdministration, getUserAdministrationUserListAction);
    addEndpoint(apiRoutes.userManagement.getBriefUserData, getBriefUserDataAction);
    addEndpoint(apiRoutes.userManagement.inviteUser, inviteUserAction, { isPost: true });
    addEndpoint(apiRoutes.userManagement.deleteUser, deleteUserAction, { isPost: true });
    addEndpoint(apiRoutes.userManagement.upadateUser, updateUserAction, { isPost: true });

    // signup
    expressServer.post(apiRoutes.signup.answerSignupQuestion, answerSignupQuestionAction);
    expressServer.get(apiRoutes.signup.getSignupData, getSignupDataAction);
    expressServer.get(apiRoutes.signup.getUserPersonalityData, getUserPersonalityDataAction);

    // file
    expressServer.post('/file/upload-avatar', uploadAvatarFileAction);

    // data
    expressServer.get("/data/get-overview-page-dto", getAsyncActionHandler(getOverviewPageDTOAction));

    // player
    expressServer.post('/player/get-player-data', getPlayerDataAction);
    expressServer.post('/player/save-video-playback-sample', saveVideoPlaybackSampleAction);
    expressServer.post('/player/get-course-items', getCourseItemsAction);

    // users
    expressServer.get("/users/get-courses-data", getUserCoursesDataAction);

    // course
    expressServer.post("/course/start-course", startCourseAction);
    expressServer.post("/course/set-course-mode", setCourseTypeAction);
    expressServer.post("/get-admin-courses", getAsyncActionHandler(getAdminCoursesAction));
    addEndpoint(apiRoutes.course.getCourseEditData, getEditedCourseAction);
    addEndpoint(apiRoutes.course.getCourseBriefData, getCourseBriefDataAction);
    addEndpoint(apiRoutes.course.saveCourseData, saveCourseDataAction, { isPost: true });
    addEndpoint(apiRoutes.course.saveCourseThumbnail, saveCourseThumbnailAction, { isPost: true });
    expressServer.post("/set-admin-edit-course", getAsyncActionHandler(setEditedCourseAction))

    // video 
    addEndpoint(apiRoutes.video.createVideo, createVideoAction, { isPost: true });
    addEndpoint(apiRoutes.video.deleteVideo, deleteVideoAction, { isPost: true });
    addEndpoint(apiRoutes.video.saveVideo, saveVideoAction, { isPost: true });
    addEndpoint(apiRoutes.video.uploadVideoFile, uploadVideoFileAction, { isPost: true });
    addEndpoint(apiRoutes.video.getVideoEditData, getVideoEditDataAction);

    // available courses
    expressServer.post("/get-user-courses", getUserCoursesAction);

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

