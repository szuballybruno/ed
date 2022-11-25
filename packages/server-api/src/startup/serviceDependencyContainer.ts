import { ActivationCodeService, AnswerService, AuthenticationService, GlobalConfigurationService, AuthorizationService, CoinAcquireService, CoinTransactionService, CommentService, CompanyService, CourseCompletionService, CourseItemService, CourseProgressService, CourseRatingService, CourseService, createDBSchema, DailyTipService, DomainProviderService, EmailService, EventService, ExamService, FileService, FileSystemService, HashService, LeaderboardService, LikeService, LoggerService, MapperService, MiscService, ModuleService, ORMConnectionService, ParametrizedConstructor, PasswordChangeService, PermissionService, PersonalityAssessmentService, PlaybackService, PlayerService, PlaylistService, PractiseQuestionService, PrequizService, PretestService, QuestionAnswerService, QuestionService, RoleService, SampleMergeService, ShopService, SignupService, SQLConnectionService, SQLPoolService, StorageService, TeacherInfoService, TempomatService, TokenService, UrlService, UserCourseBridgeService, UserInvitationService, UserProgressService, UserRegistrationService, UserService, UserSessionActivityService, UserStatsService, VersionCreateService, VersionSaveService, VideoRatingService, VideoService } from '@episto/server-services';
import { DependencyContainer, DepHierarchyFunction, XDependency } from '@episto/xinjector';
import { XDBMSchemaService, XORMConnectionService } from '@episto/xorm';
import { createGlobalConfiguration } from './createGlobalConfiguration';
import { ServiceProvider } from './ServiceProvider';

export const instansiateSingletonServices = (rootDir: string) => {

    //
    // INIT GLOBAL CONFIG
    const { globalConfigService, cookieOptions } = createGlobalConfiguration(rootDir);

    //
    // INIT DB SCHEMA
    const dbSchema = createDBSchema();

    const container = XDependency
        .getClassBuilder()
        .addClassInstance(XDBMSchemaService, dbSchema)
        .addClassInstance(GlobalConfigurationService, globalConfigService)
        .addClass(LoggerService, [GlobalConfigurationService])
        .addClass(SQLPoolService, [GlobalConfigurationService])
        .getContainer();

    const { instances } = XDependency
        .instantiate(container);

    return new ServiceProvider(instances);
};

export const getTransientServiceContainer = (singletonProvider: ServiceProvider): DependencyContainer<ParametrizedConstructor<any>> => {

    const schemaService = singletonProvider.getService(XDBMSchemaService);
    const loggerService = singletonProvider.getService(LoggerService);
    const poolService = singletonProvider.getService(SQLPoolService);
    const connService = new SQLConnectionService(poolService, loggerService);

    // create transients
    const container = XDependency
        .getClassBuilder()

        // add singleton instances
        .addClassInstance(GlobalConfigurationService, singletonProvider.getService(GlobalConfigurationService))
        .addClassInstance(XDBMSchemaService, singletonProvider.getService(XDBMSchemaService))
        .addClassInstance(LoggerService, singletonProvider.getService(LoggerService))
        .addClassInstance(SQLPoolService, singletonProvider.getService(SQLPoolService))

        // add transient signatures
        .addClass(UrlService, [GlobalConfigurationService, DomainProviderService])
        .addClass(MapperService, [UrlService])
        .addClass(HashService, [GlobalConfigurationService])
        .addClass(SQLConnectionService, [SQLPoolService, LoggerService])
        .addClassInstance(XORMConnectionService, new XORMConnectionService(schemaService, connService))
        .addClass(ORMConnectionService, [GlobalConfigurationService, SQLConnectionService])
        .addClass(PermissionService, [ORMConnectionService, MapperService])
        .addClass(AuthorizationService, [PermissionService, ORMConnectionService])
        .addClass(EventService, [MapperService, ORMConnectionService, AuthorizationService, LoggerService])
        .addClass(CoinTransactionService, [ORMConnectionService, MapperService, LoggerService])
        .addClass(CoinAcquireService, [CoinTransactionService, ORMConnectionService, EventService, GlobalConfigurationService, LoggerService])
        .addClass(UserSessionActivityService, [ORMConnectionService, CoinAcquireService, LoggerService])
        .addClass(ActivationCodeService, [ORMConnectionService])
        .addClass(DomainProviderService, [ORMConnectionService, GlobalConfigurationService])
        .addClass(EmailService, [GlobalConfigurationService, UrlService, DomainProviderService])
        .addClass(VersionSaveService, [ORMConnectionService, LoggerService, FileService])
        .addClass(SignupService, [ORMConnectionService, MapperService, PermissionService, CompanyService])
        .addClass(QuestionAnswerService, [ORMConnectionService, CoinAcquireService, LoggerService, GlobalConfigurationService])
        .addClass(TeacherInfoService, [ORMConnectionService, MapperService, AuthorizationService])
        .addClass(RoleService, [ORMConnectionService, MapperService, AuthorizationService])
        .addClass(UserStatsService, [ORMConnectionService, MapperService, TempomatService, UserProgressService])
        .addClass(UserService, [ORMConnectionService, MapperService, TeacherInfoService, HashService, RoleService, AuthorizationService, UserCourseBridgeService, UserStatsService, TempomatService])
        .addClass(TokenService, [GlobalConfigurationService])
        .addClass(AuthenticationService, [ORMConnectionService, UserService, TokenService, UserSessionActivityService, HashService, PermissionService, GlobalConfigurationService, LoggerService])
        .addClass(PasswordChangeService, [UserService, TokenService, EmailService, UrlService, ORMConnectionService, GlobalConfigurationService, HashService, AuthorizationService, DomainProviderService])
        .addClass(QuestionService, [ORMConnectionService, VersionSaveService, MapperService, GlobalConfigurationService])
        .addClass(AnswerService, [VersionSaveService, LoggerService])
        .addClass(CourseItemService, [ORMConnectionService, MapperService, QuestionService, VersionSaveService, AnswerService, AuthorizationService])
        .addClass(UserCourseBridgeService, [ORMConnectionService, MapperService, PermissionService])
        .addClass(CourseCompletionService, [MapperService, ORMConnectionService])
        .addClass(ExamService, [UserCourseBridgeService, ORMConnectionService, UserSessionActivityService, QuestionAnswerService, QuestionService, MapperService, AuthorizationService, LoggerService, CourseCompletionService])
        .addClass(StorageService, [GlobalConfigurationService])
        .addClass(FileSystemService, [])
        .addClass(FileService, [StorageService, ORMConnectionService])
        .addClass(VideoService, [ORMConnectionService, QuestionAnswerService, FileService, UrlService, GlobalConfigurationService, AuthorizationService, LoggerService, FileSystemService])
        .addClass(ModuleService, [ORMConnectionService, MapperService, CourseItemService, VersionSaveService, FileService, AuthorizationService])
        .addClass(PlaylistService, [UserCourseBridgeService, ORMConnectionService, MapperService])
        .addClass(CourseProgressService, [UserCourseBridgeService, ORMConnectionService, MapperService, PlaylistService])
        .addClass(MiscService, [CourseProgressService, ORMConnectionService, MapperService, UserCourseBridgeService, DomainProviderService])
        .addClass(SampleMergeService, [])
        .addClass(PlaybackService, [MapperService, ORMConnectionService, CoinAcquireService, UserSessionActivityService, GlobalConfigurationService, SampleMergeService, AuthorizationService, CourseCompletionService])
        .addClass(PersonalityAssessmentService, [ORMConnectionService, MapperService, AuthorizationService])
        .addClass(VideoRatingService, [ORMConnectionService, AuthorizationService])
        .addClass(DailyTipService, [ORMConnectionService, MapperService, AuthorizationService])
        .addClass(TempomatService, [ORMConnectionService, LoggerService, EventService, AuthorizationService])
        .addClass(PretestService, [ORMConnectionService, MapperService, ExamService, UserCourseBridgeService, QuestionAnswerService, AuthorizationService, TempomatService, PermissionService, PlayerService])
        .addClass(VersionCreateService, [ORMConnectionService])
        .addClass(CourseService, [ModuleService, ORMConnectionService, MapperService, FileService, UserCourseBridgeService, AuthorizationService, VersionCreateService, PlayerService])
        .addClass(ShopService, [ORMConnectionService, MapperService, CoinTransactionService, CourseService, EmailService, FileService, UrlService, AuthorizationService])
        .addClass(PlayerService, [ORMConnectionService, PlaylistService, ExamService, ModuleService, VideoService, QuestionAnswerService, PlaybackService, UserCourseBridgeService, MapperService, PermissionService])
        .addClass(PractiseQuestionService, [ORMConnectionService, QuestionAnswerService, MapperService, AuthorizationService, GlobalConfigurationService, QuestionService])
        .addClass(PrequizService, [ORMConnectionService, MapperService, UserCourseBridgeService, AuthorizationService])
        .addClass(UserInvitationService, [EmailService, UserService, TokenService, ORMConnectionService, LoggerService, RoleService])
        .addClass(UserRegistrationService, [ActivationCodeService, UserService, TokenService, ORMConnectionService, AuthenticationService])
        .addClass(CourseRatingService, [MapperService, ORMConnectionService, AuthorizationService, CoinTransactionService])
        .addClass(UserProgressService, [MapperService, ORMConnectionService, TempomatService, AuthorizationService])
        .addClass(CommentService, [ORMConnectionService, MapperService, AuthorizationService])
        .addClass(LikeService, [ORMConnectionService, MapperService, AuthorizationService])
        .addClass(LeaderboardService, [ORMConnectionService, CompanyService, MapperService])
        .addClass(CompanyService, [ORMConnectionService, MapperService, AuthorizationService, DomainProviderService, FileService])
        .getContainer();

    return XDependency
        .orderDepHierarchy(container);
};

export const instatiateServices = (container: DependencyContainer<DepHierarchyFunction>): ServiceProvider => {

    const { instances } = XDependency
        .instatiateOnly(container);

    return new ServiceProvider(instances);
};
