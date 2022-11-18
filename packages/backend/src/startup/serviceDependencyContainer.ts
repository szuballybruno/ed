import { ActivationCodeService } from '../services/ActivationCodeService';
import { AnswerService } from '../services/AnswerService';
import { AuthenticationService } from '../services/AuthenticationService';
import { AuthorizationService } from '../services/AuthorizationService';
import { CoinAcquireService } from '../services/CoinAcquireService';
import { CoinTransactionService } from '../services/CoinTransactionService';
import { CommentService } from '../services/CommentService';
import { CompanyService } from '../services/CompanyService';
import { CourseCompletionService } from '../services/CourseCompletionService';
import { CourseItemService } from '../services/CourseItemService';
import { CourseProgressService } from '../services/CourseProgressService';
import { CourseRatingService } from '../services/CourseRatingService';
import { CourseService } from '../services/CourseService';
import { DailyTipService } from '../services/DailyTipService';
import { DomainProviderService } from '../services/DomainProviderService';
import { EmailService } from '../services/EmailService';
import { EventService } from '../services/EventService';
import { ExamService } from '../services/ExamService';
import { FileService } from '../services/FileService';
import { FileSystemService } from '../services/FileSystemService';
import { HashService } from '../services/HashService';
import { LeaderboardService } from '../services/LeaderboardService';
import { LikeService } from '../services/LikeService';
import { LoggerService } from '../services/LoggerService';
import { MapperService } from '../services/MapperService';
import { ParametrizedConstructor } from '../services/misc/advancedTypes/ParametrizedConstructor';
import { createDBSchema } from '../services/misc/dbSchema';
import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import { MiscService } from '../services/MiscService';
import { ModuleService } from '../services/ModuleService';
import { ORMConnectionService } from '../services/ORMConnectionService/ORMConnectionService';
import { PasswordChangeService } from '../services/PasswordChangeService';
import { PermissionService } from '../services/PermissionService';
import { PersonalityAssessmentService } from '../services/PersonalityAssessmentService';
import { PlaybackService } from '../services/PlaybackService';
import { PlayerService } from '../services/PlayerService';
import { PlaylistService } from '../services/PlaylistService';
import { PractiseQuestionService } from '../services/PractiseQuestionService';
import { PrequizService } from '../services/PrequizService';
import { PretestService } from '../services/PretestService';
import { QuestionAnswerService } from '../services/QuestionAnswerService';
import { QuestionService } from '../services/QuestionService';
import { RoleService } from '../services/RoleService';
import { SampleMergeService } from '../services/SampleMergeService';
import { ShopService } from '../services/ShopService';
import { SignupService } from '../services/SignupService';
import { SQLFunctionsService } from '../services/sqlServices/FunctionsService';
import { SQLConnectionService } from '../services/sqlServices/SQLConnectionService';
import { SQLPoolService } from '../services/sqlServices/SQLPoolService';
import { StorageService } from '../services/StorageService';
import { TeacherInfoService } from '../services/TeacherInfoService';
import { TempomatService } from '../services/TempomatService';
import { TokenService } from '../services/TokenService';
import { UrlService } from '../services/UrlService';
import { UserCourseBridgeService } from '../services/UserCourseBridgeService';
import { UserInvitationService } from '../services/UserInvitationService';
import { UserProgressService } from '../services/UserProgressService';
import { UserRegistrationService } from '../services/UserRegistrationService';
import { UserService } from '../services/UserService';
import { UserSessionActivityService } from '../services/UserSessionActivityService';
import { UserStatsService } from '../services/UserStatsService';
import { VersionCreateService } from '../services/VersionCreateService';
import { VersionSaveService } from '../services/VersionSaveService';
import { VideoRatingService } from '../services/VideoRatingService';
import { VideoService } from '../services/VideoService';
import { XDBMSchemaService } from '../services/XDBManager/XDBManagerTypes';
import { DependencyContainer, DepHierarchyFunction, XDependency } from '../utilities/XDInjection/XDInjector';

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
    const globalConfiguration = GlobalConfiguration.create(rootDir);

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
        .addClass(ORMConnectionService, [GlobalConfiguration, SQLConnectionService, XDBMSchemaService])
        .addClass(PermissionService, [ORMConnectionService, MapperService])
        .addClass(AuthorizationService, [PermissionService, ORMConnectionService])
        .addClass(SQLFunctionsService, [SQLConnectionService, GlobalConfiguration])
        .addClass(EventService, [MapperService, ORMConnectionService, AuthorizationService, LoggerService])
        .addClass(CoinTransactionService, [SQLFunctionsService, ORMConnectionService, MapperService, AuthorizationService, LoggerService])
        .addClass(CoinAcquireService, [CoinTransactionService, ORMConnectionService, EventService, GlobalConfiguration, LoggerService])
        .addClass(UserSessionActivityService, [ORMConnectionService, CoinAcquireService, LoggerService])
        .addClass(ActivationCodeService, [ORMConnectionService])
        .addClass(DomainProviderService, [ORMConnectionService, GlobalConfiguration])
        .addClass(EmailService, [GlobalConfiguration, UrlService, DomainProviderService])
        .addClass(VersionSaveService, [ORMConnectionService, LoggerService, FileService])
        .addClass(SignupService, [EmailService, SQLFunctionsService, ORMConnectionService, MapperService, AuthorizationService, QuestionAnswerService, PermissionService, CompanyService])
        .addClass(QuestionAnswerService, [ORMConnectionService, CoinAcquireService, LoggerService, GlobalConfiguration])
        .addClass(TeacherInfoService, [ORMConnectionService, MapperService, AuthorizationService])
        .addClass(RoleService, [ORMConnectionService, MapperService, AuthorizationService])
        .addClass(UserStatsService, [ORMConnectionService, MapperService, TempomatService, UserProgressService])
        .addClass(UserService, [ORMConnectionService, MapperService, TeacherInfoService, HashService, RoleService, AuthorizationService, UserCourseBridgeService, UserStatsService, TempomatService])
        .addClass(TokenService, [GlobalConfiguration])
        .addClass(AuthenticationService, [ORMConnectionService, UserService, TokenService, UserSessionActivityService, HashService, PermissionService, GlobalConfiguration, LoggerService])
        .addClass(PasswordChangeService, [UserService, TokenService, EmailService, UrlService, ORMConnectionService, GlobalConfiguration, HashService, AuthorizationService, DomainProviderService])
        .addClass(QuestionService, [ORMConnectionService, VersionSaveService, MapperService, GlobalConfiguration])
        .addClass(AnswerService, [VersionSaveService, LoggerService])
        .addClass(CourseItemService, [ORMConnectionService, MapperService, QuestionService, VersionSaveService, AnswerService, AuthorizationService])
        .addClass(UserCourseBridgeService, [ORMConnectionService, MapperService, PermissionService])
        .addClass(CourseCompletionService, [MapperService, ORMConnectionService])
        .addClass(ExamService, [UserCourseBridgeService, ORMConnectionService, UserSessionActivityService, QuestionAnswerService, QuestionService, MapperService, AuthorizationService, LoggerService, CourseCompletionService])
        .addClass(StorageService, [GlobalConfiguration])
        .addClass(FileSystemService, [])
        .addClass(FileService, [StorageService, ORMConnectionService])
        .addClass(VideoService, [ORMConnectionService, QuestionAnswerService, FileService, UrlService, GlobalConfiguration, AuthorizationService, LoggerService, FileSystemService])
        .addClass(ModuleService, [ORMConnectionService, MapperService, CourseItemService, VersionSaveService, FileService, AuthorizationService])
        .addClass(PlaylistService, [UserCourseBridgeService, ORMConnectionService, MapperService])
        .addClass(CourseProgressService, [UserCourseBridgeService, ORMConnectionService, MapperService, PlaylistService])
        .addClass(MiscService, [CourseProgressService, ORMConnectionService, MapperService, UserCourseBridgeService, DomainProviderService])
        .addClass(SampleMergeService, [])
        .addClass(PlaybackService, [MapperService, ORMConnectionService, CoinAcquireService, UserSessionActivityService, GlobalConfiguration, SampleMergeService, AuthorizationService, CourseCompletionService])
        .addClass(PersonalityAssessmentService, [ORMConnectionService, MapperService, AuthorizationService])
        .addClass(VideoRatingService, [ORMConnectionService, AuthorizationService])
        .addClass(DailyTipService, [ORMConnectionService, MapperService, AuthorizationService])
        .addClass(TempomatService, [ORMConnectionService, LoggerService, EventService, AuthorizationService])
        .addClass(PretestService, [ORMConnectionService, MapperService, ExamService, UserCourseBridgeService, QuestionAnswerService, AuthorizationService, TempomatService, PermissionService, PlayerService])
        .addClass(VersionCreateService, [ORMConnectionService])
        .addClass(CourseService, [ModuleService, ORMConnectionService, MapperService, FileService, UserCourseBridgeService, AuthorizationService, VersionCreateService, PlayerService])
        .addClass(ShopService, [ORMConnectionService, MapperService, CoinTransactionService, CourseService, EmailService, FileService, UrlService, AuthorizationService])
        .addClass(PlayerService, [ORMConnectionService, PlaylistService, ExamService, ModuleService, VideoService, QuestionAnswerService, PlaybackService, UserCourseBridgeService, MapperService, PermissionService])
        .addClass(PractiseQuestionService, [ORMConnectionService, QuestionAnswerService, MapperService, AuthorizationService, GlobalConfiguration, QuestionService])
        .addClass(PrequizService, [ORMConnectionService, MapperService, UserCourseBridgeService, AuthorizationService])
        .addClass(UserInvitationService, [EmailService, UserService, TokenService, ORMConnectionService, LoggerService, RoleService])
        .addClass(UserRegistrationService, [ActivationCodeService, UserService, TokenService, ORMConnectionService, AuthenticationService])
        .addClass(CourseRatingService, [MapperService, ORMConnectionService, AuthorizationService, CoinTransactionService])
        .addClass(UserProgressService, [MapperService, ORMConnectionService, TempomatService, AuthorizationService])
        .addClass(CommentService, [ORMConnectionService, MapperService, AuthorizationService])
        .addClass(LikeService, [ORMConnectionService, MapperService, AuthorizationService])
        .addClass(LeaderboardService, [ORMConnectionService, CompanyService, MapperService])
        .addClass(CompanyService, [ORMConnectionService, MapperService, AuthorizationService, DomainProviderService, FileService, XDBMSchemaService, ActivationCodeService])
        .getContainer();

    return XDependency
        .orderDepHierarchy(container);
};

export const instatiateServices = (container: DependencyContainer<DepHierarchyFunction>): ServiceProvider => {

    const { instances } = XDependency
        .instatiateOnly(container);

    return new ServiceProvider(instances);
};
