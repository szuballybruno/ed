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
import { ShopController } from './api/ShopController';
import { SignupController } from './api/SignupController';
import { TeacherInfoController } from './api/TeacherInfoController';
import { UserController } from './api/UserController';
import { UserStatsController } from './api/UserStatsController';
import { VideoController } from './api/VideoController';
import { apiRoutes } from './shared/types/apiRoutes';
import { ActivationCodeService } from './services/ActivationCodeService';
import { AuthenticationService } from './services/AuthenticationService';
import { CoinAcquireService } from './services/CoinAcquireService';
import { CoinTransactionService } from './services/CoinTransactionService';
import { CourseItemsService } from './services/CourseItemsService';
import { CourseService } from './services/CourseService';
import { EmailService } from './services/EmailService';
import { EventService } from './services/EventService';
import { ExamService } from './services/ExamService';
import { FileService } from './services/FileService';
import { MapperService } from './services/MapperService';
import { dbSchema } from './services/misc/dbSchema';
import { GlobalConfiguration } from './services/misc/GlobalConfiguration';
import { log, logError } from "./services/misc/logger";
import { initializeMappings } from './services/misc/mappings';
import { getCORSMiddleware, getUnderMaintanenceMiddleware } from './services/misc/middlewareService';
import { UrlService } from './services/UrlService';
import { MiscService } from './services/MiscService';
import { ModuleService } from './services/ModuleService';
import { PersonalityAssessmentService } from './services/PersonalityAssessmentService';
import { PlayerService } from './services/PlayerService';
import { PractiseQuestionService } from './services/PractiseQuestionService';
import { QuestionAnswerService } from './services/QuestionAnswerService';
import { QuestionService } from './services/QuestionService';
import { RegistrationService } from './services/RegistrationService';
import { ShopService } from './services/ShopService';
import { SignupService } from './services/SignupService';
import { DbConnectionService } from './services/sqlServices/DatabaseConnectionService';
import { SQLFunctionsService } from './services/sqlServices/FunctionsService';
import { ORMConnectionService } from './services/sqlServices/ORMConnectionService';
import { SeedService } from './services/sqlServices/SeedService';
import { SQLBootstrapperService } from './services/sqlServices/SQLBootstrapper';
import { SQLConnectionService } from './services/sqlServices/SQLConnectionService';
import { StorageService } from './services/StorageService';
import { TeacherInfoService } from './services/TeacherInfoService';
import { TokenService } from './services/TokenService';
import { UserCourseBridgeService } from './services/UserCourseBridgeService';
import { UserService } from './services/UserService';
import { UserSessionActivityService } from './services/UserSessionActivityService';
import { UserStatsService } from './services/UserStatsService';
import { VideoPlaybackSampleService } from './services/VideoPlaybackSampleService';
import { VideoService } from './services/VideoService';
import { EndpointOptionsType, onActionError, onActionSuccess } from './utilities/apiHelpers';
import './shared/logic/jsExtensions';
import { PasswordChangeService } from './services/PasswordChangeService';
import { PasswordChangeController } from './api/PasswordChangeController';
import { AuthMiddleware } from './middleware/AuthMiddleware';
import { ActionParams, sleepAsync } from './utilities/helpers';
import { TurboExpress } from './utilities/TurboExpress';
import { LoggerService } from './services/LoggerService';
import { HashService } from './services/HashService';
import { VideoRatingService } from './services/VideoRatingService';
import { VideoRatingController } from './api/VideoRatingController';
import { PersonalityAssessmentController } from './api/PersonalityAssessmentController';
import { DailyTipController } from './api/DailyTipController';
import { DailyTipService } from './services/DailyTipService';
import { PrequizController } from './api/PrequizController';
import { PrequizService } from './services/PrequizService';
import { PretestController } from './api/PretestController';
import { PretestService } from './services/PretestService';
import { CourseRatingController } from './api/CourseRatingController';
import { CourseRatingService } from './services/CourseRatingService';
import { UserProgressService } from './services/UserProgressService';
import { UserProgressController } from './api/UserProgressController';
import { PlaybackService } from './services/PlaybackService';
import { PlaybackController } from './api/PlaybackController';
import { TempomatService } from './services/TempomatService';
import { TempomatController } from './api/TempomatController';
import { ScheduledJobService } from './services/ScheduledJobService';

(async () => {

    const globalConfig = GlobalConfiguration.initGlobalConfig(__dirname);

    log("");
    log(`------------- APPLICATION STARTED, ENVIRONEMNT: ${globalConfig.misc.environmentName} ----------------`);
    log("");

    // services 
    const loggerService = new LoggerService();
    const mapperService = new MapperService();
    const hashService = new HashService(globalConfig);
    const sqlConnectionService = new SQLConnectionService(globalConfig);
    const sqlBootstrapperService = new SQLBootstrapperService(sqlConnectionService, dbSchema, globalConfig);
    const ormConnectionService = new ORMConnectionService(globalConfig, dbSchema);
    const userStatsService = new UserStatsService(ormConnectionService, mapperService);
    const sqlFunctionService = new SQLFunctionsService(sqlConnectionService);
    const eventService = new EventService(mapperService, ormConnectionService);
    const coinTransactionService = new CoinTransactionService(sqlFunctionService, ormConnectionService, mapperService);
    const coinAcquireService = new CoinAcquireService(coinTransactionService, ormConnectionService, eventService);
    const userSessionActivityService = new UserSessionActivityService(sqlFunctionService, coinAcquireService);
    const activationCodeService = new ActivationCodeService(ormConnectionService);
    const urlService = new UrlService(globalConfig);
    const emailService = new EmailService(globalConfig, urlService);
    const questionAnswerService = new QuestionAnswerService(ormConnectionService, sqlFunctionService, coinAcquireService);
    const signupService = new SignupService(emailService, sqlFunctionService, ormConnectionService);
    const teacherInfoService = new TeacherInfoService(ormConnectionService, mapperService);
    const userService = new UserService(ormConnectionService, mapperService, teacherInfoService, hashService);
    const tokenService = new TokenService(globalConfig);
    const authenticationService = new AuthenticationService(userService, tokenService, userSessionActivityService, hashService);
    const registrationService = new RegistrationService(activationCodeService, emailService, userService, authenticationService, tokenService, ormConnectionService);
    const passwordChangeService = new PasswordChangeService(userService, tokenService, emailService, urlService, ormConnectionService, globalConfig, hashService);
    const seedService = new SeedService(sqlBootstrapperService, registrationService);
    const dbConnectionService = new DbConnectionService(globalConfig, sqlConnectionService, sqlBootstrapperService, ormConnectionService, seedService);
    const courseItemsService = new CourseItemsService(ormConnectionService, mapperService);
    const userCourseBridgeService = new UserCourseBridgeService(courseItemsService, ormConnectionService, mapperService);
    const questionService = new QuestionService(ormConnectionService);
    const examService = new ExamService(userCourseBridgeService, ormConnectionService, userSessionActivityService, questionAnswerService, questionService, mapperService);
    const storageService = new StorageService(globalConfig);
    const fileService = new FileService(userService, storageService, ormConnectionService);
    const videoService = new VideoService(ormConnectionService, userCourseBridgeService, questionAnswerService, fileService, questionService, urlService);
    const moduleService = new ModuleService(examService, videoService, ormConnectionService, mapperService, fileService);
    const courseService = new CourseService(moduleService, userCourseBridgeService, videoService, ormConnectionService, mapperService, fileService, examService);
    const miscService = new MiscService(courseService, ormConnectionService, mapperService, userCourseBridgeService);
    const vpss = new VideoPlaybackSampleService(ormConnectionService);
    const playbackService = new PlaybackService(mapperService, ormConnectionService, vpss, coinAcquireService, userSessionActivityService, userCourseBridgeService);
    const playerService = new PlayerService(ormConnectionService, courseService, examService, moduleService, userCourseBridgeService, videoService, questionAnswerService, mapperService, playbackService);
    const practiseQuestionService = new PractiseQuestionService(ormConnectionService, questionAnswerService, playerService);
    const shopService = new ShopService(ormConnectionService, mapperService, coinTransactionService, courseService, emailService, fileService, urlService);
    const personalityAssessmentService = new PersonalityAssessmentService(ormConnectionService, mapperService);
    const videoRatingService = new VideoRatingService(ormConnectionService);
    const dailyTipService = new DailyTipService(ormConnectionService, mapperService);
    const prequizService = new PrequizService(ormConnectionService, mapperService, userCourseBridgeService);
    const pretestService = new PretestService(ormConnectionService, mapperService, examService, courseService, userCourseBridgeService);
    const courseRatingService = new CourseRatingService(mapperService, ormConnectionService);
    const userProgressService = new UserProgressService(mapperService, ormConnectionService);
    const tempomatService = new TempomatService(ormConnectionService, mapperService, userCourseBridgeService);
    const scheduledJobService = new ScheduledJobService();

    // controllers 
    const userStatsController = new UserStatsController(userStatsService);
    const prequizController = new PrequizController(prequizService);
    const pretestController = new PretestController(pretestService);
    const courseRatingController = new CourseRatingController(courseRatingService);
    const eventController = new EventController(eventService);
    const coinTransactionsController = new CoinTransactionsController(coinTransactionService);
    const registrationController = new RegistrationController(registrationService, userService, globalConfig);
    const miscController = new MiscController(miscService, practiseQuestionService, authenticationService, tokenService, ormConnectionService, globalConfig, mapperService, userCourseBridgeService);
    const authenticationController = new AuthenticationController(authenticationService, globalConfig);
    const userController = new UserController(userService);
    const fileController = new FileController(fileService);
    const signupController = new SignupController(signupService, personalityAssessmentService);
    const playerController = new PlayerController(courseService, playerService, videoService);
    const courseController = new CourseController(courseService, userCourseBridgeService);
    const moduleController = new ModuleController(moduleService);
    const videoController = new VideoController(videoService, questionService, ormConnectionService, globalConfig, mapperService);
    const questionController = new QuestionController(practiseQuestionService, questionService, ormConnectionService);
    const examController = new ExamController(examService, ormConnectionService);
    const shopController = new ShopController(shopService);
    const teacherInfoController = new TeacherInfoController(teacherInfoService);
    const passwordChangeController = new PasswordChangeController(passwordChangeService);
    const videoRatingController = new VideoRatingController(videoRatingService);
    const personalityAssessmentController = new PersonalityAssessmentController(personalityAssessmentService);
    const dailyTipController = new DailyTipController(dailyTipService);
    const userProgressController = new UserProgressController(userProgressService);
    const playbackController = new PlaybackController(playbackService);
    const tempomatController = new TempomatController(tempomatService);

    // middleware 
    const authMiddleware = new AuthMiddleware(authenticationService, userService, globalConfig, loggerService);

    // initialize services 
    initializeMappings(urlService.getAssetUrl, mapperService);
    await dbConnectionService.initializeAsync();
    await dbConnectionService.seedDBAsync();

    // initailize jobs
    // scheduledJobService
    //     .scheduleJob(
    //         {
    //             seconds: "*/2"
    //         },
    //         () => tempomatService
    //             .evaluateUserProgressesAsync());

    // initialize express
    const expressServer = express();
    const turboExpress = new TurboExpress<ActionParams, EndpointOptionsType>(expressServer, [authMiddleware], onActionError, onActionSuccess);
    const addEndpoint = turboExpress.addAPIEndpoint;

    // add middlewares
    expressServer.use(getCORSMiddleware(globalConfig));
    expressServer.use(bodyParser.json({ limit: '32mb' }));
    expressServer.use(bodyParser.urlencoded({ limit: '32mb', extended: true }));
    expressServer.use(fileUpload());
    expressServer.use(getUnderMaintanenceMiddleware(globalConfig));

    // registration
    addEndpoint(apiRoutes.registration.registerUserViaPublicToken, registrationController.registerUserViaPublicTokenAction, { isPublic: true, isPost: true });
    addEndpoint(apiRoutes.registration.registerUserViaInvitationToken, registrationController.registerUserViaInvitationTokenAction, { isPublic: true, isPost: true });
    addEndpoint(apiRoutes.registration.registerUserViaActivationCode, registrationController.registerUserViaActivationCodeAction, { isPublic: true, isPost: true });
    addEndpoint(apiRoutes.registration.inviteUser, registrationController.inviteUserAction, { isPost: true, authorize: ["administrator"] });

    // misc
    addEndpoint(apiRoutes.misc.getCurrentCourseItemCode, miscController.getCurrentCourseItemCodeAction);
    addEndpoint(apiRoutes.misc.getJobTitles, miscController.getJobTitlesAction);
    addEndpoint(apiRoutes.misc.getOrganizations, miscController.getOrganizationsAction);
    addEndpoint(apiRoutes.misc.getHomePageDTO, miscController.getOverviewPageDTOAction);
    addEndpoint(apiRoutes.misc.getCourseOverviewData, miscController.getCourseOverviewDataAction);

    // teacher info
    addEndpoint(apiRoutes.teacherInfo.getTeacherInfo, teacherInfoController.getTeacherInfoAction, { authorize: ["administrator"] });
    addEndpoint(apiRoutes.teacherInfo.saveTeacherInfo, teacherInfoController.saveTeacherInfoAction, { isPost: true, authorize: ["administrator"] });

    // tempomat
    addEndpoint(apiRoutes.tempomat.getTempomatMode, tempomatController.getTempomatModeAction);
    addEndpoint(apiRoutes.tempomat.setTempomatMode, tempomatController.setTempomatModeAction, { isPost: true });

    // daily tip 
    addEndpoint(apiRoutes.dailyTip.getDailyTip, dailyTipController.getDailyTipAction);
    addEndpoint(apiRoutes.dailyTip.deleteDailyTip, dailyTipController.deleteDailyTipAction, { isPost: true, authorize: ["administrator"] });
    addEndpoint(apiRoutes.dailyTip.createDailyTip, dailyTipController.createDailyTipAction, { isPost: true, authorize: ["administrator"] });
    addEndpoint(apiRoutes.dailyTip.getDailyTipEditData, dailyTipController.getDailyTipEditDataAction, { authorize: ["administrator"] });
    addEndpoint(apiRoutes.dailyTip.saveDailyTip, dailyTipController.saveDailyTipAction, { isPost: true, authorize: ["administrator"] });

    // personality assessment 
    addEndpoint(apiRoutes.personalityAssessment.getPersonalityTraitCategories, personalityAssessmentController.getPersonalityTraitCategoriesAction);
    addEndpoint(apiRoutes.personalityAssessment.getPersonalityTraitCategoryDetails, personalityAssessmentController.getPersonalityTraitCategoryDetailsAction);

    // shop 
    addEndpoint(apiRoutes.shop.getShopItems, shopController.getShopItemsAction);
    addEndpoint(apiRoutes.shop.getShopItemCategories, shopController.getShopItemCategoriesAction);
    addEndpoint(apiRoutes.shop.purchaseShopItem, shopController.purchaseShopItemAction, { isPost: true });
    addEndpoint(apiRoutes.shop.getAdminShopItems, shopController.getAdminShopItemsAction, { authorize: ["administrator"] });
    addEndpoint(apiRoutes.shop.getShopItemBriefData, shopController.getShopItemBriefDataAction, { authorize: ["administrator"] });
    addEndpoint(apiRoutes.shop.getShopItemEditData, shopController.getShopItemEditDTOAction, { authorize: ["administrator"] });
    addEndpoint(apiRoutes.shop.getPrivateCourseList, shopController.getPrivateCourseListAction, { authorize: ["administrator"] });
    addEndpoint(apiRoutes.shop.saveShopItem, shopController.saveShopItemAction, { isPost: true, isMultipart: true, authorize: ["administrator"] });
    addEndpoint(apiRoutes.shop.createShopItem, shopController.createShopItemAction, { isPost: true, authorize: ["administrator"] });

    // event 
    addEndpoint(apiRoutes.event.getUnfulfilledEvent, eventController.getUnfulfilledEventAction);

    // video rating 
    addEndpoint(apiRoutes.videoRating.getVideoRating, videoRatingController.getVideoRatingAction);
    addEndpoint(apiRoutes.videoRating.rateVideoDifficulty, videoRatingController.rateVideoDifficultyAction, { isPost: true });
    addEndpoint(apiRoutes.videoRating.rateVideoExperience, videoRatingController.rateVideoExperienceAction, { isPost: true });

    // password change 
    addEndpoint(apiRoutes.passwordChange.setNewPassword, passwordChangeController.setNewPasswordAction, { isPost: true, isPublic: true });
    addEndpoint(apiRoutes.passwordChange.requestPasswordChangeAuthenticated, passwordChangeController.requestPasswordChangeAuthenticatedAction, { isPost: true });
    addEndpoint(apiRoutes.passwordChange.requestPasswordChange, passwordChangeController.requestPasswordChangeAction, { isPublic: true, isPost: true });

    // authentication 
    addEndpoint(apiRoutes.authentication.getCurrentUser, authenticationController.getCurrentUserAction);
    addEndpoint(apiRoutes.authentication.logoutUser, authenticationController.logOutUserAction, { isPost: true });
    addEndpoint(apiRoutes.authentication.renewUserSession, authenticationController.renewUserSessionAction, { isPublic: true });
    addEndpoint(apiRoutes.authentication.loginUser, authenticationController.logInUserAction, { isPost: true, isPublic: true });

    // coin transactions 
    addEndpoint(apiRoutes.coinTransactions.getCoinTransactions, coinTransactionsController.getCoinTransactionsAction);
    addEndpoint(apiRoutes.coinTransactions.getCoinBalance, coinTransactionsController.getCoinBalanceAction);
    addEndpoint(apiRoutes.coinTransactions.getCoinBalanceOfUser, coinTransactionsController.getCoinBalanceOfUserAction, { authorize: ["administrator"] });
    addEndpoint(apiRoutes.coinTransactions.giftCoinsToUser, coinTransactionsController.giftCoinsToUser, { isPost: true, authorize: ["administrator"] });

    // prequiz
    addEndpoint(apiRoutes.prequiz.getQuestions, prequizController.getQuestionsAction);
    addEndpoint(apiRoutes.prequiz.getUserAnswer, prequizController.getUserAnswerAction);
    addEndpoint(apiRoutes.prequiz.answerPrequizQuestion, prequizController.answerPrequizQuestionAction, { isPost: true });

    // pretest 
    addEndpoint(apiRoutes.pretest.getPretestData, pretestController.getPretestDataAction);
    addEndpoint(apiRoutes.pretest.getPretestResults, pretestController.getPretestResultsAction);
    addEndpoint(apiRoutes.pretest.getPretestExamId, pretestController.getPretestExamIdAction);

    // course rating 
    addEndpoint(apiRoutes.courseRating.getCourseRatingGroups, courseRatingController.getCourseRatingGroupsAction);
    addEndpoint(apiRoutes.courseRating.saveCourseRatingGroupAnswers, courseRatingController.saveCourseRatingGroupAnswersAction, { isPost: true });

    // user stats 
    addEndpoint(apiRoutes.userStats.getUserStats, userStatsController.getUserStatsAction);

    // user progress
    addEndpoint(apiRoutes.userProgress.getUserProgressData, userProgressController.getUserProgressDataAction);
    addEndpoint(apiRoutes.userProgress.getRecommendedItemQuota, userProgressController.getRecommendedItemQuotaAction);
    addEndpoint(apiRoutes.userProgress.getActiveCourses, userProgressController.getActiveCoursesAction);

    // user
    addEndpoint(apiRoutes.user.getBriefUserData, userController.getBriefUserDataAction);
    addEndpoint(apiRoutes.user.saveUserSimple, userController.saveUserSimpleAction, { isPost: true });
    addEndpoint(apiRoutes.user.getEditUserData, userController.getEditUserDataAction, { authorize: ["administrator"] });
    addEndpoint(apiRoutes.user.getUserListForAdministration, userController.getUserAdministrationUserListAction, { authorize: ["administrator"] });
    addEndpoint(apiRoutes.user.deleteUser, userController.deleteUserAction, { isPost: true, authorize: ["administrator"] });
    addEndpoint(apiRoutes.user.saveUser, userController.saveUserAction, { isPost: true, authorize: ["administrator"] });

    // file 
    addEndpoint(apiRoutes.file.uploadUserAvatar, fileController.uploadAvatarFileAction, { isPost: true });

    // signup
    addEndpoint(apiRoutes.signup.answerSignupQuestion, signupController.answerSignupQuestionAction, { isPost: true });
    addEndpoint(apiRoutes.signup.getSignupData, signupController.getSignupDataAction);
    addEndpoint(apiRoutes.signup.getUserPersonalityData, signupController.getUserPersonalityDataAction);

    // player
    addEndpoint(apiRoutes.player.getPlayerData, playerController.getPlayerDataAction);
    addEndpoint(apiRoutes.player.getCourseItems, playerController.getCourseItemsAction);
    addEndpoint(apiRoutes.player.answerVideoQuestion, playerController.answerVideoQuestionAction, { isPost: true });

    // playback
    addEndpoint(apiRoutes.playback.saveVideoPlaybackSample, playbackController.saveVideoPlaybackSampleAction, { isPost: true });

    // course
    addEndpoint(apiRoutes.course.setCourseMode, courseController.setCourseModeAction, { isPost: true, authorize: ["administrator"] });
    addEndpoint(apiRoutes.course.getAdminCourseList, courseController.getAdminCourseListAction, { authorize: ["administrator"] });
    addEndpoint(apiRoutes.course.getCourseContentEditData, courseController.getCourseContentEditDataAction, { authorize: ["administrator"] });
    addEndpoint(apiRoutes.course.getCourseDetailsEditData, courseController.getCourseDetailsEditDataAction, { authorize: ["administrator"] });
    addEndpoint(apiRoutes.course.saveCourseContent, courseController.saveCourseContentAction, { isPost: true, authorize: ["administrator"] });
    addEndpoint(apiRoutes.course.saveCourseDetails, courseController.saveCourseDetailsAction, { isPost: true, authorize: ["administrator"] });
    addEndpoint(apiRoutes.course.saveCourseThumbnail, courseController.saveCourseThumbnailAction, { isPost: true, isMultipart: true, authorize: ["administrator"] });
    addEndpoint(apiRoutes.course.deleteCourse, courseController.deleteCourseAction, { isPost: true, authorize: ["administrator"] });
    addEndpoint(apiRoutes.course.createCourse, courseController.createCourseAction, { isPost: true, authorize: ["administrator"] });
    addEndpoint(apiRoutes.course.getAvailableCourses, courseController.getAvailableCoursesAction);
    addEndpoint(apiRoutes.course.getCourseBriefData, courseController.getCourseBriefDataAction);
    addEndpoint(apiRoutes.course.getCourseDetails, courseController.getCourseDetailsAction);
    addEndpoint(apiRoutes.course.getCourseProgressData, courseController.getCourseProgressDataAction);
    addEndpoint(apiRoutes.course.getCourseProgressShort, courseController.getCourseProgressShortAction);

    // module 
    addEndpoint(apiRoutes.module.createModule, moduleController.createModuleAction, { isPost: true, authorize: ["administrator"] });
    addEndpoint(apiRoutes.module.deleteModule, moduleController.deleteModuleAction, { isPost: true, authorize: ["administrator"] });
    addEndpoint(apiRoutes.module.getModuleEditData, moduleController.getModuleEditDataAction, { authorize: ["administrator"] });
    addEndpoint(apiRoutes.module.saveModule, moduleController.saveModuleAction, { isPost: true, isMultipart: true, authorize: ["administrator"] });

    // video 
    addEndpoint(apiRoutes.video.createVideo, videoController.createVideoAction, { isPost: true, authorize: ["administrator"] });
    addEndpoint(apiRoutes.video.deleteVideo, videoController.deleteVideoAction, { isPost: true, authorize: ["administrator"] });
    addEndpoint(apiRoutes.video.saveVideo, videoController.saveVideoAction, { isPost: true, authorize: ["administrator"] });
    addEndpoint(apiRoutes.video.uploadVideoFileChunks, videoController.uploadVideoFileChunksAction, { isPost: true, isMultipart: true, authorize: ["administrator"] });
    addEndpoint(apiRoutes.video.getVideoEditData, videoController.getVideoEditDataAction, { authorize: ["administrator"] });

    // questions
    addEndpoint(apiRoutes.questions.getQuestionEditData, questionController.getQuestionEditDataAction, { authorize: ["administrator"] });
    addEndpoint(apiRoutes.questions.saveQuestion, questionController.saveQuestionAction, { isPost: true, authorize: ["administrator"] });
    addEndpoint(apiRoutes.questions.getPractiseQuestions, miscController.getPractiseQuestionAction);
    addEndpoint(apiRoutes.questions.answerPractiseQuestion, questionController.answerPractiseQuestionAction, { isPost: true });

    // exam
    addEndpoint(apiRoutes.exam.getExamEditData, examController.getExamEditDataAction, { authorize: ["administrator"] });
    addEndpoint(apiRoutes.exam.saveExam, examController.saveExamAction, { isPost: true, authorize: ["administrator"] });
    addEndpoint(apiRoutes.exam.createExam, examController.createExamAction, { isPost: true, authorize: ["administrator"] });
    addEndpoint(apiRoutes.exam.deleteExam, examController.deleteExamAction, { isPost: true, authorize: ["administrator"] });
    addEndpoint(apiRoutes.exam.getExamResults, examController.getExamResultsAction);
    addEndpoint(apiRoutes.exam.answerExamQuestion, examController.answerExamQuestionAction, { isPost: true });
    addEndpoint(apiRoutes.exam.startExam, examController.startExamAction, { isPost: true });

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
    expressServer.listen(globalConfig.misc.hostPort, () =>
        log(`Listening on port '${globalConfig.misc.hostPort}'!`));
})();

