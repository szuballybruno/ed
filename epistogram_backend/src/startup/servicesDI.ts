import { createDBSchema } from '../services/misc/dbSchema';
import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import { SQLPoolService } from '../services/sqlServices/SQLPoolService';
import { TypeORMConnectionService } from '../services/sqlServices/TypeORMConnectionService';
import { XDBMSchemaType } from '../services/XDBManager/XDBManagerTypes';
import { ActivationCodeService } from './../services/ActivationCodeService';
import { AuthenticationService } from './../services/AuthenticationService';
import { AuthorizationService } from './../services/AuthorizationService';
import { CoinAcquireService } from './../services/CoinAcquireService';
import { CoinTransactionService } from './../services/CoinTransactionService';
import { CommentService } from './../services/CommentService';
import { CompanyService } from './../services/CompanyService';
import { CourseItemService } from './../services/CourseItemService';
import { CourseRatingService } from './../services/CourseRatingService';
import { CourseService } from './../services/CourseService';
import { DailyTipService } from './../services/DailyTipService';
import { EmailService } from './../services/EmailService';
import { EventService } from './../services/EventService';
import { ExamService } from './../services/ExamService';
import { FileService } from './../services/FileService';
import { HashService } from './../services/HashService';
import { LikeService } from './../services/LikeService';
import { LoggerService } from './../services/LoggerService';
import { MapperService } from './../services/MapperService';
import { MiscService } from './../services/MiscService';
import { ModuleService } from './../services/ModuleService';
import { ORMConnectionService } from './../services/ORMConnectionService/ORMConnectionService';
import { PasswordChangeService } from './../services/PasswordChangeService';
import { PermissionService } from './../services/PermissionService';
import { PersonalityAssessmentService } from './../services/PersonalityAssessmentService';
import { PlaybackService } from './../services/PlaybackService';
import { PlayerService } from './../services/PlayerService';
import { PractiseQuestionService } from './../services/PractiseQuestionService';
import { PrequizService } from './../services/PrequizService';
import { PretestService } from './../services/PretestService';
import { QuestionAnswerService } from './../services/QuestionAnswerService';
import { QuestionService } from './../services/QuestionService';
import { RegistrationService } from './../services/RegistrationService';
import { RoleService } from './../services/RoleService';
import { SampleMergeService } from './../services/SampleMergeService';
import { ShopService } from './../services/ShopService';
import { SignupService } from './../services/SignupService';
import { RecreateDBService } from '../services/sqlServices/RecreateDBService';
import { SQLFunctionsService } from './../services/sqlServices/FunctionsService';
import { SeedService } from './../services/sqlServices/SeedService';
import { CreateDBService } from '../services/sqlServices/CreateDBService';
import { SQLConnectionService } from './../services/sqlServices/SQLConnectionService';
import { StorageService } from './../services/StorageService';
import { TeacherInfoService } from './../services/TeacherInfoService';
import { TempomatService } from './../services/TempomatService';
import { TokenService } from './../services/TokenService';
import { UrlService } from './../services/UrlService';
import { UserCourseBridgeService } from './../services/UserCourseBridgeService';
import { UserProgressService } from './../services/UserProgressService';
import { UserService } from './../services/UserService';
import { UserSessionActivityService } from './../services/UserSessionActivityService';
import { UserStatsService } from './../services/UserStatsService';
import { VideoRatingService } from './../services/VideoRatingService';
import { VideoService } from './../services/VideoService';
import { VersionSaveService } from '../services/VersionSaveService';

type CTAnyArgs<T> = { new(...args: any[]): T };

export class ServiceProvider {

    private _services: any;

    constructor(services: any) {

        this._services = { ...this._services, ...services };
    }

    getService<T>(ct: CTAnyArgs<T>) {

        const service = Object
            .values(this._services)
            .firstOrNull(x => (x as any).constructor.name === ct.name) as T;

        if (!service)
            throw new Error(`Service ${ct.name} not found in service provider!`);

        return service;
    };
};

export const instansiateSingletonServices = (rootDir: string) => {

    // 
    // INIT GLOBAL CONFIG
    const globalConfig = GlobalConfiguration
        .initGlobalConfig(rootDir);

    // 
    // INIT DB SCHEMA
    const dbSchema = createDBSchema();

    const urlService = new UrlService(globalConfig);
    const mapperService = new MapperService(urlService);
    const loggerService = new LoggerService();
    const poolService = new SQLPoolService(globalConfig);

    return new ServiceProvider({
        globalConfig,
        dbSchema,
        mapperService,
        loggerService,
        urlService,
        poolService
    });
}

export const instatiateServices = (singletonProvider: ServiceProvider): ServiceProvider => {

    // get singletons
    const globalConfig = singletonProvider.getService(GlobalConfiguration);
    const dbSchema = singletonProvider.getService(XDBMSchemaType);
    const mapperService = singletonProvider.getService(MapperService);
    const urlService = singletonProvider.getService(UrlService);
    const loggerService = singletonProvider.getService(LoggerService);
    const poolService = singletonProvider.getService(SQLPoolService);

    // create transients
    const hashService = new HashService(globalConfig);
    const sqlConnectionService = new SQLConnectionService(poolService, globalConfig);
    const typeOrmConnectionService = new TypeORMConnectionService(globalConfig, dbSchema);
    const createDBService = new CreateDBService(sqlConnectionService, dbSchema, globalConfig, typeOrmConnectionService);
    const ormConnectionService = new ORMConnectionService(globalConfig, sqlConnectionService);
    const sqlFunctionService = new SQLFunctionsService(sqlConnectionService, globalConfig);
    const eventService = new EventService(mapperService, ormConnectionService);
    const coinTransactionService = new CoinTransactionService(sqlFunctionService, ormConnectionService, mapperService);
    const coinAcquireService = new CoinAcquireService(coinTransactionService, ormConnectionService, eventService);
    const userSessionActivityService = new UserSessionActivityService(sqlFunctionService, coinAcquireService);
    const activationCodeService = new ActivationCodeService(ormConnectionService);
    const emailService = new EmailService(globalConfig, urlService);
    const questionAnswerService = new QuestionAnswerService(ormConnectionService, sqlFunctionService, coinAcquireService);
    const signupService = new SignupService(emailService, sqlFunctionService, ormConnectionService, mapperService);
    const teacherInfoService = new TeacherInfoService(ormConnectionService, mapperService);
    const roleService = new RoleService(ormConnectionService, mapperService);
    const userService = new UserService(ormConnectionService, mapperService, teacherInfoService, hashService, roleService);
    const tokenService = new TokenService(globalConfig);
    const permissionService = new PermissionService(ormConnectionService, mapperService);
    const authenticationService = new AuthenticationService(ormConnectionService, userService, tokenService, userSessionActivityService, hashService, permissionService, globalConfig);
    const passwordChangeService = new PasswordChangeService(userService, tokenService, emailService, urlService, ormConnectionService, globalConfig, hashService);
    const seedService = new SeedService(dbSchema, globalConfig, sqlConnectionService);
    const recreateDBservice = new RecreateDBService(createDBService, seedService, dbSchema, sqlConnectionService);
    const questionService = new QuestionService(ormConnectionService, questionAnswerService);
    const versionSaveService = new VersionSaveService(ormConnectionService);
    const courseItemService = new CourseItemService(ormConnectionService, mapperService, questionService, versionSaveService);
    const userCourseBridgeService = new UserCourseBridgeService(ormConnectionService, mapperService);
    const examService = new ExamService(userCourseBridgeService, ormConnectionService, userSessionActivityService, questionAnswerService, questionService, mapperService);
    const storageService = new StorageService(globalConfig);
    const fileService = new FileService(userService, storageService, ormConnectionService);
    const videoService = new VideoService(ormConnectionService, userCourseBridgeService, questionAnswerService, fileService, questionService, urlService, mapperService, globalConfig);
    const moduleService = new ModuleService(examService, videoService, ormConnectionService, mapperService, fileService);
    const pretestService = new PretestService(ormConnectionService, mapperService, examService, userCourseBridgeService, questionAnswerService);
    const courseService = new CourseService(moduleService, userCourseBridgeService, videoService, ormConnectionService, mapperService, fileService, examService, pretestService, courseItemService);
    const miscService = new MiscService(courseService, ormConnectionService, mapperService, userCourseBridgeService);
    const sampleMergeService = new SampleMergeService();
    const playbackService = new PlaybackService(mapperService, ormConnectionService, coinAcquireService, userSessionActivityService, globalConfig, sampleMergeService);
    const authorizationService = new AuthorizationService(permissionService, ormConnectionService);
    const playerService = new PlayerService(ormConnectionService, courseService, examService, moduleService, userCourseBridgeService, videoService, questionAnswerService, mapperService, playbackService, authorizationService);
    const practiseQuestionService = new PractiseQuestionService(ormConnectionService, questionAnswerService, playerService, mapperService);
    const shopService = new ShopService(ormConnectionService, mapperService, coinTransactionService, courseService, emailService, fileService, urlService);
    const personalityAssessmentService = new PersonalityAssessmentService(ormConnectionService, mapperService);
    const videoRatingService = new VideoRatingService(ormConnectionService);
    const dailyTipService = new DailyTipService(ormConnectionService, mapperService);
    const tempomatService = new TempomatService(ormConnectionService, mapperService, userCourseBridgeService, loggerService, eventService);
    const userStatsService = new UserStatsService(ormConnectionService, mapperService, tempomatService);
    const prequizService = new PrequizService(ormConnectionService, mapperService, userCourseBridgeService);
    const registrationService = new RegistrationService(activationCodeService, emailService, userService, authenticationService, authorizationService, tokenService, ormConnectionService, roleService, mapperService);
    const courseRatingService = new CourseRatingService(mapperService, ormConnectionService);
    const userProgressService = new UserProgressService(mapperService, ormConnectionService, tempomatService);
    const commentService = new CommentService(ormConnectionService, mapperService);
    const likeService = new LikeService(ormConnectionService, mapperService);
    const companyService = new CompanyService(ormConnectionService, mapperService, authorizationService);

    const services = {
        globalConfig,
        urlService,
        mapperService,
        loggerService,
        hashService,
        sqlConnectionService,
        createDBService,
        ormConnectionService,
        sqlFunctionService,
        eventService,
        coinTransactionService,
        coinAcquireService,
        userSessionActivityService,
        activationCodeService,
        emailService,
        questionAnswerService,
        signupService,
        teacherInfoService,
        roleService,
        userService,
        tokenService,
        permissionService,
        authenticationService,
        passwordChangeService,
        seedService,
        recreateDBservice,
        courseItemService,
        userCourseBridgeService,
        questionService,
        examService,
        storageService,
        fileService,
        videoService,
        moduleService,
        pretestService,
        courseService,
        miscService,
        sampleMergeService,
        playbackService,
        authorizationService,
        playerService,
        practiseQuestionService,
        shopService,
        personalityAssessmentService,
        videoRatingService,
        dailyTipService,
        tempomatService,
        userStatsService,
        prequizService,
        registrationService,
        courseRatingService,
        userProgressService,
        commentService,
        likeService,
        companyService,
        typeOrmConnectionService
    };

    return new ServiceProvider(services);
};
