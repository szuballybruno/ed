import bodyParser from 'body-parser';
import express from 'express';
import fileUpload from 'express-fileupload';
import "reflect-metadata"; // needs to be imported for TypeORM
import { changePasswordAction, getCurrentUserAction, logInUserAction, logOutUserAction, renewUserSessionAction } from './api/authenticationActions';
import { createCourseAction, deleteCourseAction, getAdminCourseListAction, getAvailableCoursesAction, getCourseDetailsAction, getCourseEditDataAction, getCourseProgressDataAction, saveCourseAction, setCourseTypeAction, startCourseAction } from './api/courseActions';
import {
    answerPractiseQuestionAction, getCourseBriefDataAction,
    getCurrentCourseItemCodeAction, getOrganizationsAction, getOverviewPageDTOAction,
    registerInvitedUserAction, registerUserAction, saveCourseThumbnailAction
} from './api/dataActions';
import { answerExamQuestionAction, createExamAction, deleteExamAction, getExamEditDataAction, getExamResultsAction, saveExamAction } from './api/examActions';
import { uploadAvatarFileAction } from './api/fileActions';
import { getDailyTipAction, getJobTitlesAction, getPractiseQuestionAction, getRegistrationLinkAction, requestChangePasswordAction, saveUserDataAction } from './api/miscActions';
import { getCourseItemsAction, getPlayerDataAction, saveVideoPlaybackSampleAction } from './api/playerActions';
import { answerVideoQuestionAction, getQuestionEditDataAction, saveQuestionAction } from './api/questionActions';
import { answerSignupQuestionAction, getSignupDataAction, getUserPersonalityDataAction } from './api/signupActions';
import { deleteUserAction, getBriefUserDataAction, getEditUserDataAction, getUserAdministrationUserListAction, inviteUserAction, updateUserAction } from './api/userActions';
import { createVideoAction, deleteVideoAction, getVideoEditDataAction, saveVideoAction, uploadVideoFileChunksAction } from './api/videoActions';
import { initializeDBAsync } from './database';
import { apiRoutes } from './models/shared_models/types/apiRoutes';
import { initailizeDotEnvEnvironmentConfig } from "./services/environment";
import { getAuthMiddleware, getCORSMiddleware, getUnderMaintanenceMiddleware } from './services/middlewareService';
import { log, logError } from "./services/misc/logger";
import { staticProvider } from './staticProvider';
import { addAPIEndpoint, ApiActionType, EndpointOptionsType } from './utilities/apiHelpers';
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

    const addEndpoint = (path: string, action: ApiActionType, opt?: EndpointOptionsType) => addAPIEndpoint(expressServer, path, action, opt);

    // add middlewares
    expressServer.use(getCORSMiddleware());
    expressServer.use(bodyParser.json({ limit: '32mb' }));
    expressServer.use(bodyParser.urlencoded({ limit: '32mb', extended: true }));
    expressServer.use(fileUpload());
    expressServer.use(getUnderMaintanenceMiddleware());
    expressServer.use(getAuthMiddleware());

    // open routes
    addEndpoint(apiRoutes.open.renewUserSession, renewUserSessionAction, { isPublic: true });
    addEndpoint(apiRoutes.open.loginUser, logInUserAction, { isPost: true, isPublic: true });
    addEndpoint(apiRoutes.open.registerUser, registerUserAction, { isPublic: true, isPost: true });
    addEndpoint(apiRoutes.open.registerInvitedUser, registerInvitedUserAction, { isPublic: true, isPost: true });

    // misc
    addEndpoint('/get-current-user', getCurrentUserAction);
    addEndpoint('/get-current-course-item-code', getCurrentCourseItemCodeAction);
    addEndpoint('/misc/get-practise-question', getPractiseQuestionAction);
    addEndpoint('/misc/save-user-data', saveUserDataAction, { isPost: true });
    addEndpoint('/misc/request-change-password', requestChangePasswordAction, { isPost: true });
    addEndpoint('/misc/set-new-password', changePasswordAction, { isPost: true });
    addEndpoint('/misc/get-registration-link', getRegistrationLinkAction);
    addEndpoint(apiRoutes.misc.logoutUser, logOutUserAction, { isPost: true });
    addEndpoint(apiRoutes.misc.getJobTitles, getJobTitlesAction);
    addEndpoint(apiRoutes.misc.getDailyTip, getDailyTipAction);
    addEndpoint("/organizations/get-organizations", getOrganizationsAction);

    // user management
    addEndpoint(apiRoutes.userManagement.getEditUserData, getEditUserDataAction);
    addEndpoint(apiRoutes.userManagement.getUserListForAdministration, getUserAdministrationUserListAction);
    addEndpoint(apiRoutes.userManagement.getBriefUserData, getBriefUserDataAction);
    addEndpoint(apiRoutes.userManagement.inviteUser, inviteUserAction, { isPost: true });
    addEndpoint(apiRoutes.userManagement.deleteUser, deleteUserAction, { isPost: true });
    addEndpoint(apiRoutes.userManagement.upadateUser, updateUserAction, { isPost: true });
    addEndpoint('/file/upload-avatar', uploadAvatarFileAction, { isPost: true });

    // signup
    addEndpoint(apiRoutes.signup.answerSignupQuestion, answerSignupQuestionAction, { isPost: true });
    addEndpoint(apiRoutes.signup.getSignupData, getSignupDataAction);
    addEndpoint(apiRoutes.signup.getUserPersonalityData, getUserPersonalityDataAction);

    // home
    addEndpoint("/data/get-overview-page-dto", getOverviewPageDTOAction);
    addEndpoint("/questions/answer-practise-question", answerPractiseQuestionAction, { isPost: true });

    // player
    addEndpoint('/player/get-player-data', getPlayerDataAction);
    addEndpoint('/player/save-video-playback-sample', saveVideoPlaybackSampleAction, { isPost: true });
    addEndpoint('/player/get-course-items', getCourseItemsAction);
    addEndpoint("/questions/answer-video-question", answerVideoQuestionAction, { isPost: true });

    // users
    addEndpoint(apiRoutes.learning.getCourseProgressData, getCourseProgressDataAction);

    // course
    addEndpoint("/course/set-course-mode", setCourseTypeAction, { isPost: true });
    addEndpoint(apiRoutes.course.getAdminCourseList, getAdminCourseListAction);
    addEndpoint(apiRoutes.course.startCourse, startCourseAction, { isPost: true });
    addEndpoint(apiRoutes.course.getCourseEditData, getCourseEditDataAction);
    addEndpoint(apiRoutes.course.getCourseBriefData, getCourseBriefDataAction);
    addEndpoint(apiRoutes.course.saveCourseData, saveCourseAction, { isPost: true });
    addEndpoint(apiRoutes.course.saveCourseThumbnail, saveCourseThumbnailAction, { isPost: true });
    addEndpoint(apiRoutes.course.getAvailableCourses, getAvailableCoursesAction);
    addEndpoint(apiRoutes.course.deleteCourse, deleteCourseAction, { isPost: true });
    addEndpoint(apiRoutes.course.createCourse, createCourseAction, { isPost: true });
    addEndpoint(apiRoutes.course.getCourseDetails, getCourseDetailsAction);

    // video 
    addEndpoint(apiRoutes.video.createVideo, createVideoAction, { isPost: true });
    addEndpoint(apiRoutes.video.deleteVideo, deleteVideoAction, { isPost: true });
    addEndpoint(apiRoutes.video.saveVideo, saveVideoAction, { isPost: true });
    addEndpoint(apiRoutes.video.uploadVideoFileChunks, uploadVideoFileChunksAction, { isPost: true });
    addEndpoint(apiRoutes.video.getVideoEditData, getVideoEditDataAction);

    // questions
    addEndpoint(apiRoutes.questions.getQuestionEditData, getQuestionEditDataAction);
    addEndpoint(apiRoutes.questions.saveQuestion, saveQuestionAction, { isPost: true });

    // exam
    addEndpoint("/exam/get-exam-results", getExamResultsAction);
    addEndpoint(apiRoutes.exam.getExamEditData, getExamEditDataAction);
    addEndpoint(apiRoutes.exam.saveExam, saveExamAction, { isPost: true });
    addEndpoint(apiRoutes.exam.createExam, createExamAction, { isPost: true });
    addEndpoint(apiRoutes.exam.deleteExam, deleteExamAction, { isPost: true });
    addEndpoint(apiRoutes.exam.answerExamQuestion, answerExamQuestionAction, { isPost: true });

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

