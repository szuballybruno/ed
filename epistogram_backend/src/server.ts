import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { dirname } from 'path';
import 'reflect-metadata'; // needs to be imported for TypeORM
import { fileURLToPath } from 'url';
import { AuthenticationController2 } from './api/AuthenticationController2';
import { CoinTransactionsController } from './api/CoinTransactionsController';
import { CommentController } from './api/CommentController';
import { CompanyController } from './api/CompanyController';
import { CourseController } from './api/CourseController';
import { CourseRatingController } from './api/CourseRatingController';
import { DailyTipController } from './api/DailyTipController';
import { EventController } from './api/EventController';
import { ExamController } from './api/ExamController';
import { FileController } from './api/FileController';
import { MiscController } from './api/MiscController';
import { ModuleController } from './api/ModuleController';
import { PasswordChangeController } from './api/PasswordChangeController';
import { PermissionController } from './api/PermissionController';
import { PersonalityAssessmentController } from './api/PersonalityAssessmentController';
import { PlaybackController } from './api/PlaybackController';
import { PlayerController } from './api/PlayerController';
import { PrequizController } from './api/PrequizController';
import { PretestController } from './api/PretestController';
import { QuestionController } from './api/QuestionController';
import { RegistrationController } from './api/RegistrationController';
import { RoleController } from './api/RoleController';
import { ScheduledJobTriggerController } from './api/ScheduledJobTriggerController';
import { ShopController } from './api/ShopController';
import { SignupController } from './api/SignupController';
import { TeacherInfoController } from './api/TeacherInfoController';
import { TempomatController } from './api/TempomatController';
import { UserController } from './api/UserController';
import { UserProgressController } from './api/UserProgressController';
import { UserStatsController } from './api/UserStatsController';
import { VideoController } from './api/VideoController';
import { VideoRatingController } from './api/VideoRatingController';
import { ActivationCodeService } from './services/ActivationCodeService';
import { AuthenticationService } from './services/AuthenticationService';
import { CoinAcquireService } from './services/CoinAcquireService';
import { CoinTransactionService } from './services/CoinTransactionService';
import { CommentService } from './services/CommentService';
import { CompanyService } from './services/CompanyService';
import { CourseItemsService } from './services/CourseItemsService';
import { CourseRatingService } from './services/CourseRatingService';
import { CourseService } from './services/CourseService';
import { DailyTipService } from './services/DailyTipService';
import { EmailService } from './services/EmailService';
import { EventService } from './services/EventService';
import { ExamService } from './services/ExamService';
import { FileService } from './services/FileService';
import { HashService } from './services/HashService';
import { LikeService } from './services/LikeService';
import { LoggerService } from './services/LoggerService';
import { MapperService } from './services/MapperService';
import { createDBSchema } from './services/misc/dbSchema';
import { GlobalConfiguration } from './services/misc/GlobalConfiguration';
import { log } from './services/misc/logger';
import { initializeMappings } from './services/misc/mappings';
import { getCORSMiddleware, getUnderMaintanenceMiddleware } from './services/misc/middlewareService';
import { MiscService } from './services/MiscService';
import { ModuleService } from './services/ModuleService';
import { ORMConnectionService } from './services/ORMConnectionService/ORMConnectionService';
import { PasswordChangeService } from './services/PasswordChangeService';
import { PermissionService } from './services/PermissionService';
import { PersonalityAssessmentService } from './services/PersonalityAssessmentService';
import { PlaybackService } from './services/PlaybackService';
import { PlayerService } from './services/PlayerService';
import { PractiseQuestionService } from './services/PractiseQuestionService';
import { PrequizService } from './services/PrequizService';
import { PretestService } from './services/PretestService';
import { QuestionAnswerService } from './services/QuestionAnswerService';
import { QuestionService } from './services/QuestionService';
import { RegistrationService } from './services/RegistrationService';
import { RoleService } from './services/RoleService';
import { ShopService } from './services/ShopService';
import { SignupService } from './services/SignupService';
import { DbConnectionService } from './services/sqlServices/DatabaseConnectionService';
import { SQLFunctionsService } from './services/sqlServices/FunctionsService';
import { SeedService } from './services/sqlServices/SeedService';
import { SQLBootstrapperService } from './services/sqlServices/SQLBootstrapper';
import { SQLConnectionService } from './services/sqlServices/SQLConnectionService';
import { StorageService } from './services/StorageService';
import { TeacherInfoService } from './services/TeacherInfoService';
import { TempomatService } from './services/TempomatService';
import { TokenService } from './services/TokenService';
import { UrlService } from './services/UrlService';
import { UserCourseBridgeService } from './services/UserCourseBridgeService';
import { UserProgressService } from './services/UserProgressService';
import { UserService } from './services/UserService';
import { UserSessionActivityService } from './services/UserSessionActivityService';
import { UserStatsService } from './services/UserStatsService';
import { VideoPlaybackSampleService } from './services/VideoPlaybackSampleService';
import { VideoRatingService } from './services/VideoRatingService';
import { VideoService } from './services/VideoService';
import './shared/logic/jsExtensions';
import { AuthenticationMiddleware } from './turboMiddleware/AuthenticationMiddleware';
import { AuthorizationMiddleware } from './turboMiddleware/AuthorizationMiddleware';
import { ActionParams } from './utilities/ActionParams';
import { onActionError, onActionSuccess } from './utilities/apiHelpers';
import { TurboExpressBuilder } from './utilities/XTurboExpress/TurboExpress';

const getCurrentDir = () => dirname(fileURLToPath(import.meta.url));

const main = async () => {

    log('');
    log('------------- APPLICATION STARTED ----------------');
    log('');

    const globalConfig = GlobalConfiguration
        .initGlobalConfig(getCurrentDir());

    const dbSchema = createDBSchema();

    // services
    const loggerService = new LoggerService();
    const mapperService = new MapperService();
    const hashService = new HashService(globalConfig);
    const sqlConnectionService = new SQLConnectionService(globalConfig);
    const sqlBootstrapperService = new SQLBootstrapperService(sqlConnectionService, dbSchema, globalConfig);
    const ormConnectionService = new ORMConnectionService(globalConfig, dbSchema, sqlConnectionService);
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
    const roleService = new RoleService(ormConnectionService, mapperService);
    const userService = new UserService(ormConnectionService, mapperService, teacherInfoService, hashService, roleService);
    const tokenService = new TokenService(globalConfig);
    const permissionService = new PermissionService(ormConnectionService, mapperService);
    const authenticationService = new AuthenticationService(userService, tokenService, userSessionActivityService, hashService, permissionService);
    const registrationService = new RegistrationService(activationCodeService, emailService, userService, authenticationService, tokenService, ormConnectionService, roleService, mapperService);
    const passwordChangeService = new PasswordChangeService(userService, tokenService, emailService, urlService, ormConnectionService, globalConfig, hashService);
    const seedService = new SeedService(dbSchema, sqlBootstrapperService, sqlConnectionService);
    const dbConnectionService = new DbConnectionService(globalConfig, sqlConnectionService, sqlBootstrapperService, ormConnectionService, seedService);
    const courseItemsService = new CourseItemsService(ormConnectionService, mapperService);
    const userCourseBridgeService = new UserCourseBridgeService(courseItemsService, ormConnectionService, mapperService);
    const questionService = new QuestionService(ormConnectionService);
    const examService = new ExamService(userCourseBridgeService, ormConnectionService, userSessionActivityService, questionAnswerService, questionService, mapperService);
    const storageService = new StorageService(globalConfig);
    const fileService = new FileService(userService, storageService, ormConnectionService);
    const videoService = new VideoService(ormConnectionService, userCourseBridgeService, questionAnswerService, fileService, questionService, urlService, mapperService);
    const moduleService = new ModuleService(examService, videoService, ormConnectionService, mapperService, fileService);
    const pretestService = new PretestService(ormConnectionService, mapperService, examService, userCourseBridgeService);
    const courseService = new CourseService(moduleService, userCourseBridgeService, videoService, ormConnectionService, mapperService, fileService, examService, pretestService);
    const miscService = new MiscService(courseService, ormConnectionService, mapperService, userCourseBridgeService, permissionService);
    const vpss = new VideoPlaybackSampleService(ormConnectionService);
    const playbackService = new PlaybackService(mapperService, ormConnectionService, vpss, coinAcquireService, userSessionActivityService, userCourseBridgeService, globalConfig);
    const playerService = new PlayerService(ormConnectionService, courseService, examService, moduleService, userCourseBridgeService, videoService, questionAnswerService, mapperService, playbackService);
    const practiseQuestionService = new PractiseQuestionService(ormConnectionService, questionAnswerService, playerService, mapperService);
    const shopService = new ShopService(ormConnectionService, mapperService, coinTransactionService, courseService, emailService, fileService, urlService);
    const personalityAssessmentService = new PersonalityAssessmentService(ormConnectionService, mapperService);
    const videoRatingService = new VideoRatingService(ormConnectionService);
    const dailyTipService = new DailyTipService(ormConnectionService, mapperService);
    const tempomatService = new TempomatService(ormConnectionService, mapperService, userCourseBridgeService, loggerService, eventService);
    const prequizService = new PrequizService(ormConnectionService, mapperService, userCourseBridgeService, tempomatService);
    const courseRatingService = new CourseRatingService(mapperService, ormConnectionService);
    const userProgressService = new UserProgressService(mapperService, ormConnectionService);
    const commentService = new CommentService(ormConnectionService, mapperService);
    const likeService = new LikeService(ormConnectionService, mapperService);
    const companyService = new CompanyService(ormConnectionService, mapperService, permissionService);

    // controllers 
    const permissionController = new PermissionController(permissionService);
    const userStatsController = new UserStatsController(userStatsService);
    const prequizController = new PrequizController(prequizService);
    const pretestController = new PretestController(pretestService);
    const courseRatingController = new CourseRatingController(courseRatingService);
    const eventController = new EventController(eventService);
    const coinTransactionsController = new CoinTransactionsController(coinTransactionService);
    const registrationController = new RegistrationController(registrationService, globalConfig);
    const miscController = new MiscController(miscService, practiseQuestionService, tokenService, ormConnectionService, globalConfig, userCourseBridgeService);
    const authenticationController = new AuthenticationController2(authenticationService, globalConfig);
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
    const scheduledJobTriggerController = new ScheduledJobTriggerController(tempomatService);
    const companyController = new CompanyController(companyService);
    const roleController = new RoleController(roleService);
    const commentController = new CommentController(commentService, likeService);

    // initialize services 
    initializeMappings(urlService.getAssetUrl, mapperService);
    await dbConnectionService.initializeAsync();
    await dbConnectionService.seedDBAsync();

    // initialize express
    const turboExpress = new TurboExpressBuilder<ActionParams>()
        .setPort(globalConfig.misc.hostPort)
        .setErrorHandler(onActionError)
        .setSuccessHandler(onActionSuccess)
        .setTurboMiddleware<void, ActionParams>(new AuthenticationMiddleware(authenticationService, loggerService))
        .setTurboMiddleware<ActionParams, ActionParams>(new AuthorizationMiddleware(permissionService))
        .setExpressMiddleware(getCORSMiddleware(globalConfig))
        .setExpressMiddleware(bodyParser.json({ limit: '32mb' }))
        .setExpressMiddleware(bodyParser.urlencoded({ limit: '32mb', extended: true }))
        .setExpressMiddleware(fileUpload())
        .setExpressMiddleware(getUnderMaintanenceMiddleware(globalConfig))
        .addController(MiscController, miscController)
        .addController(UserController, userController)
        .addController(PermissionController, permissionController)
        .addController(RoleController, roleController)
        .addController(CompanyController, companyController)
        .addController(CommentController, commentController)
        .addController(AuthenticationController, authenticationController)
        .addController(ExamController, examController)
        .addController(RegistrationController, registrationController)
        .addController(ScheduledJobTriggerController, scheduledJobTriggerController)
        .addController(TempomatController, tempomatController)
        .addController(DailyTipController, dailyTipController)
        .addController(PersonalityAssessmentController, personalityAssessmentController)
        .addController(ShopController, shopController)
        .addController(EventController, eventController)
        .addController(VideoRatingController, videoRatingController)
        .addController(PasswordChangeController, passwordChangeController)
        .addController(CoinTransactionsController, coinTransactionsController)
        .addController(PrequizController, prequizController)
        .addController(PretestController, pretestController)
        .addController(CourseRatingController, courseRatingController)
        .addController(UserStatsController, userStatsController)
        .addController(UserProgressController, userProgressController)
        .addController(FileController, fileController)
        .addController(SignupController, signupController)
        .addController(PlayerController, playerController)
        .addController(PlaybackController, playbackController)
        .addController(CourseController, courseController)
        .addController(ModuleController, moduleController)
        .addController(VideoController, videoController)
        .addController(QuestionController, questionController)
        .build();

    // 404 - no match
    // turboExpress.use((req, res) => {

    //     res.status(404)
    //         .send(`Route did not match: ${req.url}`);
    // });

    // // error handler
    // turboExpress.use((error: express.Errback, req: express.Request, res: express.Response) => {

    //     logError('Express error middleware.');
    //     logError(error);
    //     return res.status(500)
    //         .send(error.toString());
    // });

    // listen
    turboExpress.listen();
};

await main();

// main()
//     .then(listenFn => {

//         listenFn();
//     })
//     .catch(x => {

//         throw new Error(`Error starting server: ${x.message}`);
//     });

