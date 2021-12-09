import bodyParser from 'body-parser';
import express from 'express';
import fileUpload from 'express-fileupload';
import "reflect-metadata"; // needs to be imported for TypeORM
import { AuthenticationController } from './api/AuthenticationController';
import { CoinTransactionsController } from './api/CoinTransactionsController';
import { CourseController } from './api/CourseController';
import { EventController } from './api/EventController';
import { ExamController } from './api/ExamController';
import { FileController } from './api/FileController';
import { MiscController } from './api/MiscController';
import { ModuleController } from './api/ModuleController';
import { PlayerController } from './api/PlayerController';
import { QuestionController } from './api/QuestionController';
import { RegistrationController } from './api/RegistrationController';
import { SignupController } from './api/SignupController';
import { UserController } from './api/UserController';
import { UserStatsController } from './api/UserStatsController';
import { VideoController } from './api/VideoController';
import { apiRoutes } from './models/shared_models/types/apiRoutes';
import { ActivationCodeService } from './services/ActivationCodeService';
import { CoinAcquireService } from './services/coinAcquireService';
import { CoinTransactionService } from './services/coinTransactionService';
import { EmailService } from './services/EmailService';
import { initailizeDotEnvEnvironmentConfig } from "./services/environment";
import { EventService } from './services/eventService';
import { MapperService } from './services/mapperService';
import { initializeMappings } from './services/mappings';
import { getAuthMiddleware, getCORSMiddleware, getUnderMaintanenceMiddleware } from './services/middlewareService';
import { dbSchema } from './services/misc/dbSchema';
import { log, logError } from "./services/misc/logger";
import { RegistrationService } from './services/RegistrationService';
import { SignupService } from './services/SignupService';
import { DbConnectionService } from './services/sqlServices/DatabaseConnectionService';
import { SQLFunctionsService } from './services/sqlServices/FunctionsService';
import { ORMConnectionService } from './services/sqlServices/ORMConnectionService';
import { SeedService } from './services/sqlServices/SeedService';
import { SQLBootstrapperService } from './services/sqlServices/SQLBootstrapper';
import { SQLConnectionService } from './services/sqlServices/SQLConnectionService';
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
    const userStatsService = new UserStatsService(ormConnectionService, mapperService);
    const sqlFunctionService = new SQLFunctionsService(sqlConnectionService);
    const eventService = new EventService(mapperService, ormConnectionService);
    const coinTransactionService = new CoinTransactionService(sqlFunctionService, ormConnectionService, mapperService);
    const coinAcquireService = new CoinAcquireService(coinTransactionService, ormConnectionService, eventService);
    const userSessionActivityService = new UserSessionActivityService(sqlFunctionService, coinAcquireService);
    const activationCodeService = new ActivationCodeService(ormConnectionService);
    const emailService = new EmailService();
    const signupService = new SignupService(emailService);
    const registrationService = new RegistrationService(activationCodeService, emailService);
    const seedService = new SeedService(sqlBootstrapperService, signupService, registrationService);
    const dbConnectionService = new DbConnectionService(globalConfig, sqlConnectionService, sqlBootstrapperService, ormConnectionService, seedService);

    // controllers 
    const userStatsController = new UserStatsController(userStatsService);
    const eventController = new EventController(eventService);
    const coinTransactionsController = new CoinTransactionsController(coinTransactionService);
    const registrationController = new RegistrationController(registrationService);
    const miscController = new MiscController();
    const authenticationController = new AuthenticationController();
    const userController = new UserController();
    const fileController = new FileController();
    const signupController = new SignupController(signupService);
    const playerController = new PlayerController();
    const courseController = new CourseController();
    const moduleController = new ModuleController();
    const videoController = new VideoController();
    const questionController = new QuestionController();
    const examController = new ExamController();

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
        sqlConnectionService,
        emailService
    };

    await dbConnectionService.seedDBAsync();

    const addEndpoint = (path: string, action: ApiActionType, opt?: EndpointOptionsType) => addAPIEndpoint(expressServer, path, action, opt);

    // add middlewares
    expressServer.use(getCORSMiddleware());
    expressServer.use(bodyParser.json({ limit: '32mb' }));
    expressServer.use(bodyParser.urlencoded({ limit: '32mb', extended: true }));
    expressServer.use(fileUpload());
    expressServer.use(getUnderMaintanenceMiddleware());
    expressServer.use(getAuthMiddleware([
        apiRoutes.registration.registerUserViaActivationCode,
        apiRoutes.registration.registerUserViaInvitationToken,
        apiRoutes.registration.registerUserViaPublicToken,
        apiRoutes.authentication.renewUserSession,
        apiRoutes.authentication.loginUser,
    ]));

    // registration
    addEndpoint(apiRoutes.registration.registerUserViaPublicToken, registrationController.registerUserViaPublicTokenAction, { isPublic: true, isPost: true });
    addEndpoint(apiRoutes.registration.registerUserViaInvitationToken, registrationController.registerUserViaInvitationTokenAction, { isPublic: true, isPost: true });
    addEndpoint(apiRoutes.registration.registerUserViaActivationCode, registrationController.registerUserViaActivationCodeAction, { isPublic: true, isPost: true });
    addEndpoint(apiRoutes.registration.inviteUser, registrationController.inviteUserAction, { isPost: true });

    // misc
    addEndpoint(apiRoutes.misc.getCurrentCourseItemCode, miscController.getCurrentCourseItemCodeAction);
    addEndpoint(apiRoutes.misc.getJobTitles, miscController.getJobTitlesAction);
    addEndpoint(apiRoutes.misc.getDailyTip, miscController.getDailyTipAction);
    addEndpoint(apiRoutes.misc.getOrganizations, miscController.getOrganizationsAction);
    addEndpoint(apiRoutes.misc.getHomePageDTO, miscController.getOverviewPageDTOAction);

    // event 
    addEndpoint(apiRoutes.event.getUnfulfilledEvent, eventController.getUnfulfilledEventAction);

    // authentication 
    addEndpoint(apiRoutes.authentication.getCurrentUser, authenticationController.getCurrentUserAction);
    addEndpoint(apiRoutes.authentication.setNewPassword, authenticationController.changePasswordAction, { isPost: true });
    addEndpoint(apiRoutes.authentication.logoutUser, authenticationController.logOutUserAction, { isPost: true });
    addEndpoint(apiRoutes.authentication.renewUserSession, authenticationController.renewUserSessionAction, { isPublic: true });
    addEndpoint(apiRoutes.authentication.loginUser, authenticationController.logInUserAction, { isPost: true, isPublic: true });
    addEndpoint(apiRoutes.authentication.requestPasswordChange, miscController.requestChangePasswordAction, { isPost: true });

    // coin transactions 
    addEndpoint(apiRoutes.coinTransactions.getCoinTransactions, coinTransactionsController.getCoinTransactionsAction);
    addEndpoint(apiRoutes.coinTransactions.getCoinBalance, coinTransactionsController.getCoinBalanceAction);

    // user stats 
    addEndpoint(apiRoutes.userStats.getUserStats, userStatsController.getUserStatsAction);

    // user
    addEndpoint(apiRoutes.user.getEditUserData, userController.getEditUserDataAction);
    addEndpoint(apiRoutes.user.getUserListForAdministration, userController.getUserAdministrationUserListAction);
    addEndpoint(apiRoutes.user.getBriefUserData, userController.getBriefUserDataAction);
    addEndpoint(apiRoutes.user.deleteUser, userController.deleteUserAction, { isPost: true });
    addEndpoint(apiRoutes.user.upadateUser, userController.updateUserAction, { isPost: true });
    // addEndpoint(apiRoutes.misc.updateUserData, miscController.saveUserDataAction, { isPost: true });

    // file 
    addEndpoint(apiRoutes.file.uploadUserAvatar, fileController.uploadAvatarFileAction, { isPost: true });

    // signup
    addEndpoint(apiRoutes.signup.answerSignupQuestion, signupController.answerSignupQuestionAction, { isPost: true });
    addEndpoint(apiRoutes.signup.getSignupData, signupController.getSignupDataAction);
    addEndpoint(apiRoutes.signup.getUserPersonalityData, signupController.getUserPersonalityDataAction);

    // player
    addEndpoint(apiRoutes.player.getPlayerData, playerController.getPlayerDataAction);
    addEndpoint(apiRoutes.player.saveVideoPlaybackSample, playerController.saveVideoPlaybackSampleAction, { isPost: true });
    addEndpoint(apiRoutes.player.getCourseItems, playerController.getCourseItemsAction);
    addEndpoint(apiRoutes.player.answerVideoQuestion, playerController.answerVideoQuestionAction, { isPost: true });

    // course
    addEndpoint(apiRoutes.course.setCourseMode, courseController.setCourseModeAction, { isPost: true });
    addEndpoint(apiRoutes.course.getAdminCourseList, courseController.getAdminCourseListAction);
    addEndpoint(apiRoutes.course.startCourse, courseController.startCourseAction, { isPost: true });
    addEndpoint(apiRoutes.course.getCourseEditData, courseController.getCourseEditDataAction);
    addEndpoint(apiRoutes.course.getCourseBriefData, courseController.getCourseBriefDataAction);
    addEndpoint(apiRoutes.course.saveCourseData, courseController.saveCourseAction, { isPost: true });
    addEndpoint(apiRoutes.course.saveCourseThumbnail, courseController.saveCourseThumbnailAction, { isPost: true });
    addEndpoint(apiRoutes.course.getAvailableCourses, courseController.getAvailableCoursesAction);
    addEndpoint(apiRoutes.course.deleteCourse, courseController.deleteCourseAction, { isPost: true });
    addEndpoint(apiRoutes.course.createCourse, courseController.createCourseAction, { isPost: true });
    addEndpoint(apiRoutes.course.getCourseDetails, courseController.getCourseDetailsAction);
    addEndpoint(apiRoutes.course.getCourseProgressData, courseController.getCourseProgressDataAction);

    // module 
    addEndpoint(apiRoutes.module.createModule, moduleController.createModuleAction, { isPost: true });
    addEndpoint(apiRoutes.module.deleteModule, moduleController.deleteModuleAction, { isPost: true });
    addEndpoint(apiRoutes.module.getModuleEditData, moduleController.getModuleEditDataAction);
    addEndpoint(apiRoutes.module.saveModule, moduleController.saveModuleAction, { isPost: true });

    // video 
    addEndpoint(apiRoutes.video.createVideo, videoController.createVideoAction, { isPost: true });
    addEndpoint(apiRoutes.video.deleteVideo, videoController.deleteVideoAction, { isPost: true });
    addEndpoint(apiRoutes.video.saveVideo, videoController.saveVideoAction, { isPost: true });
    addEndpoint(apiRoutes.video.uploadVideoFileChunks, videoController.uploadVideoFileChunksAction, { isPost: true });
    addEndpoint(apiRoutes.video.getVideoEditData, videoController.getVideoEditDataAction);

    // questions
    addEndpoint(apiRoutes.questions.getQuestionEditData, questionController.getQuestionEditDataAction);
    addEndpoint(apiRoutes.questions.saveQuestion, questionController.saveQuestionAction, { isPost: true });
    addEndpoint(apiRoutes.questions.answerPractiseQuestion, questionController.answerPractiseQuestionAction, { isPost: true });
    addEndpoint(apiRoutes.questions.getPractiseQuestions, miscController.getPractiseQuestionAction);

    // exam
    addEndpoint(apiRoutes.exam.getExamResults, examController.getExamResultsAction);
    addEndpoint(apiRoutes.exam.getExamEditData, examController.getExamEditDataAction);
    addEndpoint(apiRoutes.exam.saveExam, examController.saveExamAction, { isPost: true });
    addEndpoint(apiRoutes.exam.createExam, examController.createExamAction, { isPost: true });
    addEndpoint(apiRoutes.exam.deleteExam, examController.deleteExamAction, { isPost: true });
    addEndpoint(apiRoutes.exam.answerExamQuestion, examController.answerExamQuestionAction, { isPost: true });

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

