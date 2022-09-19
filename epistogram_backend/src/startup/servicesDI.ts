import { CourseCompletionService } from '../services/CourseCompletionService';
import { CourseProgressService } from '../services/CourseProgressService';
import { DomainProviderService } from '../services/DomainProviderService';
import { FileSystemService } from '../services/FileSystemService';
import { ParametrizedConstructor } from '../services/misc/advancedTypes/ParametrizedConstructor';
import { createDBSchema } from '../services/misc/dbSchema';
import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import { PlaylistService } from '../services/PlaylistService';
import { CreateDBService } from '../services/sqlServices/CreateDBService';
import { RecreateDBService } from '../services/sqlServices/RecreateDBService';
import { SQLPoolService } from '../services/sqlServices/SQLPoolService';
import { TypeORMConnectionService } from '../services/sqlServices/TypeORMConnectionService';
import { VersionCreateService } from '../services/VersionCreateService';
import { VersionSaveService } from '../services/VersionSaveService';
import { XDBMSchemaService } from '../services/XDBManager/XDBManagerTypes';
import { DependencyContainer, DepHierarchyFunction, XDependency } from '../utilities/XDInjection/XDInjector';
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
import { SQLFunctionsService } from './../services/sqlServices/FunctionsService';
import { SeedService } from './../services/sqlServices/SeedService';
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
    }
}

export const instansiateSingletonServices = (rootDir: string) => {

    //
    // INIT GLOBAL CONFIG
    const globalConfiguration = GlobalConfiguration
        .initGlobalConfig(rootDir);

    //
    // INIT DB SCHEMA
    const dbSchema = createDBSchema();

    const container = XDependency
        .getClassBuilder()
        .addClassInstance(XDBMSchemaService, dbSchema)
        .addClassInstance(GlobalConfiguration, globalConfiguration)
        .addClass(LoggerService, [GlobalConfiguration])
        .addClass(SQLPoolService, [GlobalConfiguration])
        .getContainer();

    const { instances } = XDependency
        .instantiate(container);

    return new ServiceProvider(instances);
};

export const getTransientServiceContainer = (singletonProvider: ServiceProvider): DependencyContainer<ParametrizedConstructor<any>> => {

    // create transients
    const container = XDependency
        .getClassBuilder()

        // add singleton instances
        .addClassInstance(GlobalConfiguration, singletonProvider.getService(GlobalConfiguration))
        .addClassInstance(XDBMSchemaService, singletonProvider.getService(XDBMSchemaService))
        .addClassInstance(LoggerService, singletonProvider.getService(LoggerService))
        .addClassInstance(SQLPoolService, singletonProvider.getService(SQLPoolService))

        // add transient signatures
        .addClass(UrlService, [GlobalConfiguration, DomainProviderService])
        .addClass(MapperService, [UrlService])
        .addClass(HashService, [GlobalConfiguration])
        .addClass(SQLConnectionService, [SQLPoolService, LoggerService])
        .addClass(TypeORMConnectionService, [GlobalConfiguration, XDBMSchemaService])
        .addClass(CreateDBService, [SQLConnectionService, XDBMSchemaService, GlobalConfiguration, TypeORMConnectionService, LoggerService])
        .addClass(ORMConnectionService, [GlobalConfiguration, SQLConnectionService])
        .addClass(PermissionService, [ORMConnectionService, MapperService])
        .addClass(AuthorizationService, [PermissionService, ORMConnectionService])
        .addClass(SQLFunctionsService, [SQLConnectionService, GlobalConfiguration])
        .addClass(EventService, [MapperService, ORMConnectionService, AuthorizationService])
        .addClass(CoinTransactionService, [SQLFunctionsService, ORMConnectionService, MapperService, AuthorizationService, LoggerService])
        .addClass(CoinAcquireService, [CoinTransactionService, ORMConnectionService, EventService, GlobalConfiguration, LoggerService])
        .addClass(UserSessionActivityService, [ORMConnectionService, CoinAcquireService, LoggerService])
        .addClass(ActivationCodeService, [ORMConnectionService])
        .addClass(DomainProviderService, [ORMConnectionService, GlobalConfiguration])
        .addClass(EmailService, [GlobalConfiguration, UrlService, DomainProviderService])
        .addClass(VersionSaveService, [ORMConnectionService, LoggerService])
        .addClass(SignupService, [EmailService, SQLFunctionsService, ORMConnectionService, MapperService, AuthorizationService, QuestionAnswerService])
        .addClass(QuestionAnswerService, [ORMConnectionService, SQLFunctionsService, CoinAcquireService, VersionSaveService, LoggerService])
        .addClass(TeacherInfoService, [ORMConnectionService, MapperService, AuthorizationService])
        .addClass(RoleService, [ORMConnectionService, MapperService, AuthorizationService])
        .addClass(UserService, [ORMConnectionService, MapperService, TeacherInfoService, HashService, RoleService, AuthorizationService, UserCourseBridgeService])
        .addClass(TokenService, [GlobalConfiguration])
        .addClass(AuthenticationService, [ORMConnectionService, UserService, TokenService, UserSessionActivityService, HashService, PermissionService, GlobalConfiguration, LoggerService])
        .addClass(PasswordChangeService, [UserService, TokenService, EmailService, UrlService, ORMConnectionService, GlobalConfiguration, HashService, AuthorizationService, DomainProviderService])
        .addClass(SeedService, [XDBMSchemaService, GlobalConfiguration, SQLConnectionService, LoggerService])
        .addClass(RecreateDBService, [CreateDBService, SeedService, XDBMSchemaService, SQLConnectionService, LoggerService])
        .addClass(QuestionService, [ORMConnectionService, VersionSaveService, MapperService])
        .addClass(CourseItemService, [ORMConnectionService, MapperService, QuestionService, VersionSaveService, QuestionAnswerService, AuthorizationService])
        .addClass(UserCourseBridgeService, [ORMConnectionService, MapperService, AuthorizationService, LoggerService, PermissionService])
        .addClass(CourseCompletionService, [MapperService, ORMConnectionService])
        .addClass(ExamService, [UserCourseBridgeService, ORMConnectionService, UserSessionActivityService, QuestionAnswerService, QuestionService, MapperService, AuthorizationService, LoggerService, CourseCompletionService])
        .addClass(StorageService, [GlobalConfiguration])
        .addClass(FileSystemService, [])
        .addClass(FileService, [UserService, StorageService, ORMConnectionService, AuthorizationService])
        .addClass(VideoService, [ORMConnectionService, QuestionAnswerService, FileService, UrlService, GlobalConfiguration, AuthorizationService, LoggerService, FileSystemService])
        .addClass(ModuleService, [ORMConnectionService, MapperService, CourseItemService, VersionSaveService, FileService, AuthorizationService])
        .addClass(PlaylistService, [UserCourseBridgeService, ORMConnectionService, MapperService])
        .addClass(CourseProgressService, [UserCourseBridgeService, ORMConnectionService, MapperService, PlaylistService])
        .addClass(MiscService, [CourseProgressService, ORMConnectionService, MapperService, UserCourseBridgeService])
        .addClass(SampleMergeService, [])
        .addClass(PlaybackService, [MapperService, ORMConnectionService, CoinAcquireService, UserSessionActivityService, GlobalConfiguration, SampleMergeService, AuthorizationService, CourseCompletionService])
        .addClass(PersonalityAssessmentService, [ORMConnectionService, MapperService, AuthorizationService])
        .addClass(VideoRatingService, [ORMConnectionService, AuthorizationService])
        .addClass(DailyTipService, [ORMConnectionService, MapperService, AuthorizationService])
        .addClass(TempomatService, [ORMConnectionService, LoggerService, EventService, AuthorizationService])
        .addClass(PretestService, [ORMConnectionService, MapperService, ExamService, UserCourseBridgeService, QuestionAnswerService, AuthorizationService, TempomatService, PermissionService])
        .addClass(VersionCreateService, [ORMConnectionService])
        .addClass(CourseService, [ModuleService, ORMConnectionService, MapperService, FileService, PretestService, AuthorizationService, VersionCreateService])
        .addClass(ShopService, [ORMConnectionService, MapperService, CoinTransactionService, CourseService, EmailService, FileService, UrlService, AuthorizationService])
        .addClass(PlayerService, [ORMConnectionService, CourseService, PlaylistService, ExamService, ModuleService, VideoService, QuestionAnswerService, PlaybackService, UserCourseBridgeService, MapperService, AuthorizationService, PermissionService])
        .addClass(PractiseQuestionService, [ORMConnectionService, QuestionAnswerService, MapperService, AuthorizationService, GlobalConfiguration, QuestionService])
        .addClass(UserStatsService, [ORMConnectionService, MapperService, TempomatService, AuthorizationService, UserProgressService, CompanyService])
        .addClass(PrequizService, [ORMConnectionService, MapperService, UserCourseBridgeService, AuthorizationService])
        .addClass(RegistrationService, [ActivationCodeService, EmailService, UserService, AuthenticationService, AuthorizationService, TokenService, ORMConnectionService, RoleService, MapperService, LoggerService])
        .addClass(CourseRatingService, [MapperService, ORMConnectionService, AuthorizationService])
        .addClass(UserProgressService, [MapperService, ORMConnectionService, TempomatService, AuthorizationService])
        .addClass(CommentService, [ORMConnectionService, MapperService, AuthorizationService])
        .addClass(LikeService, [ORMConnectionService, MapperService, AuthorizationService])
        .addClass(CompanyService, [ORMConnectionService, MapperService, AuthorizationService, DomainProviderService, FileService, XDBMSchemaService])
        .getContainer();

    return XDependency
        .orderDepHierarchy(container);
};

export const instatiateServices = (container: DependencyContainer<DepHierarchyFunction>): ServiceProvider => {

    const { instances } = XDependency
        .instatiateOnly(container);

    return new ServiceProvider(instances);
};
