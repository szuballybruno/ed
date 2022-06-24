import { ClassType } from '../services/misc/advancedTypes/ClassType';
import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
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
import { DbConnectionService } from './../services/sqlServices/DatabaseConnectionService';
import { SQLFunctionsService } from './../services/sqlServices/FunctionsService';
import { SeedService } from './../services/sqlServices/SeedService';
import { SQLBootstrapperService } from './../services/sqlServices/SQLBootstrapper';
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

type CTAnyArgs<T> = { new(...args: any[]): T };

export type ServicesType = { [K: string]: any } & {
    getService: <T>(ct: CTAnyArgs<T>) => T
};

export const instatiateServices = (globalConfig: GlobalConfiguration, dbSchema: XDBMSchemaType): ServicesType => {

    const services = {} as any;

    services.urlService = new UrlService(globalConfig);
    services.mapperService = new MapperService(services.urlService);
    services.loggerService = new LoggerService();
    services.hashService = new HashService(globalConfig);
    services.sqlConnectionService = new SQLConnectionService(globalConfig);
    services.sqlBootstrapperService = new SQLBootstrapperService(services.sqlConnectionService, dbSchema, globalConfig);
    services.ormConnectionService = new ORMConnectionService(globalConfig, dbSchema, services.sqlConnectionService);
    services.userStatsService = new UserStatsService(services.ormConnectionService, services.mapperService);
    services.sqlFunctionService = new SQLFunctionsService(services.sqlConnectionService, globalConfig);
    services.eventService = new EventService(services.mapperService, services.ormConnectionService);
    services.coinTransactionService = new CoinTransactionService(services.sqlFunctionService, services.ormConnectionService, services.mapperService);
    services.coinAcquireService = new CoinAcquireService(services.coinTransactionService, services.ormConnectionService, services.eventService);
    services.userSessionActivityService = new UserSessionActivityService(services.sqlFunctionService, services.coinAcquireService);
    services.activationCodeService = new ActivationCodeService(services.ormConnectionService);
    services.emailService = new EmailService(globalConfig, services.urlService);
    services.questionAnswerService = new QuestionAnswerService(services.ormConnectionService, services.sqlFunctionService, services.coinAcquireService);
    services.signupService = new SignupService(services.emailService, services.sqlFunctionService, services.ormConnectionService);
    services.teacherInfoService = new TeacherInfoService(services.ormConnectionService, services.mapperService);
    services.roleService = new RoleService(services.ormConnectionService, services.mapperService);
    services.userService = new UserService(services.ormConnectionService, services.mapperService, services.teacherInfoService, services.hashService, services.roleService);
    services.tokenService = new TokenService(globalConfig);
    services.permissionService = new PermissionService(services.ormConnectionService, services.mapperService);
    services.authenticationService = new AuthenticationService(services.userService, services.tokenService, services.userSessionActivityService, services.hashService, services.permissionService);
    services.registrationService = new RegistrationService(services.activationCodeService, services.emailService, services.userService, services.authenticationService, services.tokenService, services.ormConnectionService, services.roleService, services.mapperService);
    services.passwordChangeService = new PasswordChangeService(services.userService, services.tokenService, services.emailService, services.urlService, services.ormConnectionService, globalConfig, services.hashService);
    services.seedService = new SeedService(dbSchema, services.sqlBootstrapperService, services.sqlConnectionService);
    services.dbConnectionService = new DbConnectionService(globalConfig, services.sqlConnectionService, services.sqlBootstrapperService, services.ormConnectionService, services.seedService);
    services.courseItemService = new CourseItemService(services.ormConnectionService, services.mapperService);
    services.userCourseBridgeService = new UserCourseBridgeService(services.courseItemService, services.ormConnectionService, services.mapperService);
    services.questionService = new QuestionService(services.ormConnectionService);
    services.examService = new ExamService(services.userCourseBridgeService, services.ormConnectionService, services.userSessionActivityService, services.questionAnswerService, services.questionService, services.mapperService);
    services.storageService = new StorageService(globalConfig);
    services.fileService = new FileService(services.userService, services.storageService, services.ormConnectionService);
    services.videoService = new VideoService(services.ormConnectionService, services.userCourseBridgeService, services.questionAnswerService, services.fileService, services.questionService, services.urlService, services.mapperService, globalConfig);
    services.moduleService = new ModuleService(services.examService, services.videoService, services.ormConnectionService, services.mapperService, services.fileService);
    services.pretestService = new PretestService(services.ormConnectionService, services.mapperService, services.examService, services.userCourseBridgeService);
    services.courseService = new CourseService(services.moduleService, services.userCourseBridgeService, services.videoService, services.ormConnectionService, services.mapperService, services.fileService, services.examService, services.pretestService, services.courseItemService);
    services.miscService = new MiscService(services.courseService, services.ormConnectionService, services.mapperService, services.userCourseBridgeService, services.permissionService);
    services.sampleMergeService = new SampleMergeService();
    services.playbackService = new PlaybackService(services.mapperService, services.ormConnectionService, services.coinAcquireService, services.userSessionActivityService, globalConfig, services.sampleMergeService);
    services.authorizationService = new AuthorizationService(services.permissionService, services.ormConnectionService);
    services.playerService = new PlayerService(services.ormConnectionService, services.courseService, services.examService, services.moduleService, services.userCourseBridgeService, services.videoService, services.questionAnswerService, services.mapperService, services.playbackService, services.authorizationService);
    services.practiseQuestionService = new PractiseQuestionService(services.ormConnectionService, services.questionAnswerService, services.playerService, services.mapperService);
    services.shopService = new ShopService(services.ormConnectionService, services.mapperService, services.coinTransactionService, services.courseService, services.emailService, services.fileService, services.urlService);
    services.personalityAssessmentService = new PersonalityAssessmentService(services.ormConnectionService, services.mapperService);
    services.videoRatingService = new VideoRatingService(services.ormConnectionService);
    services.dailyTipService = new DailyTipService(services.ormConnectionService, services.mapperService);
    services.tempomatService = new TempomatService(services.ormConnectionService, services.mapperService, services.userCourseBridgeService, services.loggerService, services.eventService);
    services.prequizService = new PrequizService(services.ormConnectionService, services.mapperService, services.userCourseBridgeService, services.tempomatService);
    services.courseRatingService = new CourseRatingService(services.mapperService, services.ormConnectionService);
    services.userProgressService = new UserProgressService(services.mapperService, services.ormConnectionService);
    services.commentService = new CommentService(services.ormConnectionService, services.mapperService);
    services.likeService = new LikeService(services.ormConnectionService, services.mapperService);
    services.companyService = new CompanyService(services.ormConnectionService, services.mapperService, services.authorizationService);

    services.getService = <T>(ct: CTAnyArgs<T>) => {

        return Object
            .values(services)
            .single(x => (x as any).constructor.name === ct.name) as T;
    }

    return services;
};