import bodyParser from 'body-parser';
import express from 'express';
import fileUpload from 'express-fileupload';
import "reflect-metadata"; // needs to be imported for TypeORM
import { changePasswordAction, getCurrentUserAction, logInUserAction, logOutUserAction, renewUserSessionAction } from './api/authenticationActions';
import { CoinTransactionsController } from './api/CoinTransactionsController';
import { createCourseAction, deleteCourseAction, getAdminCourseListAction, getAvailableCoursesAction, getCourseDetailsAction, getCourseEditDataAction, getCourseProgressDataAction, saveCourseAction, setCourseTypeAction, startCourseAction } from './api/courseActions';
import {
    answerPractiseQuestionAction, getCourseBriefDataAction,
    getCurrentCourseItemCodeAction, getOrganizationsAction, getOverviewPageDTOAction,
    registerInvitedUserAction, registerUserAction, saveCourseThumbnailAction
} from './api/dataActions';
import { EventController } from './api/EventController';
import { answerExamQuestionAction, createExamAction, deleteExamAction, getExamEditDataAction, getExamResultsAction, saveExamAction } from './api/examActions';
import { uploadAvatarFileAction } from './api/fileActions';
import { getDailyTipAction, getJobTitlesAction, getPractiseQuestionAction, getRegistrationLinkAction, requestChangePasswordAction, saveUserDataAction } from './api/miscActions';
import { createModuleAction, deleteModuleAction, getModuleEditDataAction, saveModuleAction } from './api/moduleActions';
import { getCourseItemsAction, getPlayerDataAction, saveVideoPlaybackSampleAction } from './api/playerActions';
import { answerVideoQuestionAction, getQuestionEditDataAction, saveQuestionAction } from './api/questionActions';
import { answerSignupQuestionAction, getSignupDataAction, getUserPersonalityDataAction } from './api/signupActions';
import { deleteUserAction, getBriefUserDataAction, getEditUserDataAction, getUserAdministrationUserListAction, inviteUserAction, updateUserAction } from './api/userActions';
import { UserStatsController } from './api/userStatsController';
import { createVideoAction, deleteVideoAction, getVideoEditDataAction, saveVideoAction, uploadVideoFileChunksAction } from './api/videoActions';
import { apiRoutes } from './models/shared_models/types/apiRoutes';
import { ActivationCodeService } from './services/ActivationCodeService';
import { CoinAcquireService } from './services/coinAcquireService';
import { CoinTransactionService } from './services/coinTransactionService';
import { initailizeDotEnvEnvironmentConfig } from "./services/environment";
import { EventService } from './services/eventService';
import { MapperService } from './services/mapperService';
import { initializeMappings } from './services/mappings';
import { getAuthMiddleware, getCORSMiddleware, getUnderMaintanenceMiddleware } from './services/middlewareService';
import { dbSchema } from './services/misc/dbSchema';
import { log, logError } from "./services/misc/logger";
import { DbConnectionService } from './services/sqlServices/DatabaseConnectionService';
import { ORMConnectionService } from './services/sqlServices/ORMConnectionService';
import { SeedService } from './services/sqlServices/SeedService';
import { SQLBootstrapperService } from './services/sqlServices/SQLBootstrapper';
import { SQLConnectionService } from './services/sqlServices/SQLConnectionService';
import { SQLFunctionsService } from './services/sqlServices/SQLFunctionsService';
import { UserSessionActivityService } from './services/userSessionActivityService';
import { UserStatsService } from './services/userStatsService';
import { staticProvider } from './staticProvider';
import { addAPIEndpoint, ApiActionType, EndpointOptionsType } from './utilities/apiHelpers';
import './utilities/jsExtensions';

(async () => {

    initailizeDotEnvEnvironmentConfig();

    log("");
    log(`------------- APPLICATION STARTED, ENVIRONEMNT: ${staticProvider.globalConfig.misc.environmentName} ----------------`);
    log("");

    const expressServer = express();

    // services 
    const globalConfig = staticProvider.globalConfig;
    const mapperService = new MapperService();
    const sqlConnectionService = new SQLConnectionService();
    const sqlBootstrapperService = new SQLBootstrapperService(sqlConnectionService, dbSchema, globalConfig);
    const ormConnectionService = new ORMConnectionService(globalConfig, dbSchema, sqlBootstrapperService);
    const seedService = new SeedService(sqlBootstrapperService);
    const dbConnectionService = new DbConnectionService(globalConfig, sqlConnectionService, sqlBootstrapperService, ormConnectionService, seedService);
    const userStatsService = new UserStatsService(ormConnectionService, mapperService);
    const sqlFunctionService = new SQLFunctionsService(sqlConnectionService);
    const eventService = new EventService(mapperService, ormConnectionService);
    const coinTransactionService = new CoinTransactionService(sqlFunctionService, ormConnectionService, mapperService);
    const coinAcquireService = new CoinAcquireService(coinTransactionService, ormConnectionService, eventService);
    const userSessionActivityService = new UserSessionActivityService(sqlFunctionService, coinAcquireService);
    const activationCodeService = new ActivationCodeService(ormConnectionService);

    // controllers 
    const userStatsController = new UserStatsController(userStatsService);
    const eventController = new EventController(eventService);
    const coinTransactionsController = new CoinTransactionsController(coinTransactionService);

    // initialize services 
    initializeMappings(mapperService);
    await dbConnectionService.initializeAsync();

    // set services as static provided objects 
    staticProvider.ormConnection = ormConnectionService.getOrmConnection();
    staticProvider.services = {
        mapperService,
        databaseConnectionService: dbConnectionService,
        userStatsService,
        sqlFunctionService,
        userSessionActivityService,
        coinAcquireService,
        sqlBootstrapperService,
        sqlConnectionService
    };

    await dbConnectionService.seedDBAsync();

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
    addEndpoint(apiRoutes.event.getUnfulfilledEvent, eventController.getUnfulfilledEventAction);

    // coin transactions 
    addEndpoint(apiRoutes.coinTransactions.getCoinTransactions, coinTransactionsController.getCoinTransactionsAction);
    addEndpoint(apiRoutes.coinTransactions.getCoinBalance, coinTransactionsController.getCoinBalanceAction);

    // user stats 
    addEndpoint(apiRoutes.userStats.getUserStats, userStatsController.getUserStatsAction);

    // user management
    addEndpoint(apiRoutes.userManagement.getEditUserData, getEditUserDataAction);
    addEndpoint(apiRoutes.userManagement.getUserListForAdministration, getUserAdministrationUserListAction);
    addEndpoint(apiRoutes.userManagement.getBriefUserData, getBriefUserDataAction);
    addEndpoint(apiRoutes.userManagement.inviteUser, inviteUserAction, { isPost: true });
    addEndpoint(apiRoutes.userManagement.deleteUser, deleteUserAction, { isPost: true });
    addEndpoint(apiRoutes.userManagement.upadateUser, updateUserAction, { isPost: true });
    addEndpoint('/file/upload-avatar', uploadAvatarFileAction, { isPost: true });
    addEndpoint(apiRoutes.learning.getCourseProgressData, getCourseProgressDataAction);

    // signup
    addEndpoint(apiRoutes.signup.answerSignupQuestion, answerSignupQuestionAction, { isPost: true });
    addEndpoint(apiRoutes.signup.getSignupData, getSignupDataAction);
    addEndpoint(apiRoutes.signup.getUserPersonalityData, getUserPersonalityDataAction);

    // home
    addEndpoint("/data/get-overview-page-dto", getOverviewPageDTOAction);
    addEndpoint("/questions/answer-practise-question", answerPractiseQuestionAction, { isPost: true });

    // player
    addEndpoint(apiRoutes.player.getPlayerData, getPlayerDataAction);
    addEndpoint(apiRoutes.player.saveVideoPlaybackSample, saveVideoPlaybackSampleAction, { isPost: true });
    addEndpoint(apiRoutes.player.getCourseItems, getCourseItemsAction);
    addEndpoint(apiRoutes.player.answerVideoQuestion, answerVideoQuestionAction, { isPost: true });

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

    // module 
    addEndpoint(apiRoutes.module.createModule, createModuleAction, { isPost: true });
    addEndpoint(apiRoutes.module.deleteModule, deleteModuleAction, { isPost: true });
    addEndpoint(apiRoutes.module.getModuleEditData, getModuleEditDataAction);
    addEndpoint(apiRoutes.module.saveModule, saveModuleAction, { isPost: true });

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
})();

