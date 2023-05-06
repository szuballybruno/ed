import { ActivationCodeService, AdminStatsService, AnswerService, AuthenticationService, AuthorizationService, CoinAcquireService, CoinTransactionService, CommentService, CompanyService, CourseCategoryService, CourseCompletionService, CourseItemService, CourseProgressService, CourseRatingService, CourseService, DBSchemaProviderService, DailyTipService, DomainProviderService, EmailService, EventService, ExamService, FeatureService, FileService, FileSystemService, GlobalConfigurationService, HashService, LeaderboardService, LikeService, LoggerService, MapperService, MiscService, ModuleService, ORMConnectionService, ParametrizedConstructor, PasswordChangeService, PermissionService, PersonalityAssessmentService, PlaybackService, PlayerService, PlaylistService, PractiseQuestionService, PrequizService, PretestService, QuestionAnswerService, QuestionService, RoleService, SQLConnectionService, SQLPoolService, SampleMergeService, ShopService, SignupService, StorageService, TeacherInfoService, TempomatService, TokenService, UrlService, UserCourseBridgeService, UserInvitationService, UserProgressService, UserRegistrationService, UserService, UserSessionActivityService, UserStatsService, VersionCreateService, VersionSaveService, VideoRatingService, VideoService } from '@episto/server-services';
import { DepHierarchyFunction, DependencyContainer, XDependency } from '@episto/x-injector';
import { LiveSchemaProvider, SchemaValidator } from '@episto/x-orm';
import { CookieOptionProvider } from './CookieOptionProvider';
import { ServiceProvider } from './ServiceProvider';
import { createGlobalConfiguration } from './createGlobalConfiguration';

export const instansiateSingletonServices = (rootDir: string) => {

    //
    // INIT GLOBAL CONFIG
    const { globalConfigService, cookieOptions } = createGlobalConfiguration(rootDir);

    //
    // INIT DB SCHEMA
    const container = XDependency
        .getClassBuilder()
        .addClass(DBSchemaProviderService, [])
        .addClassInstance(GlobalConfigurationService, globalConfigService)
        .addClassInstance(CookieOptionProvider, new CookieOptionProvider(cookieOptions))
        .addClass(LoggerService, [GlobalConfigurationService])
        .addClass(SQLPoolService, [GlobalConfigurationService])
        .getContainer();

    const { instances } = XDependency
        .instantiate(container);

    return new ServiceProvider(instances);
};

export const getTransientServiceContainer = (singletonProvider: ServiceProvider): DependencyContainer<ParametrizedConstructor<any>> => {

    const loggerService = singletonProvider.getService(LoggerService);
    const gcService = singletonProvider.getService(GlobalConfigurationService);
    const cookieOptionProvider = singletonProvider.getService(CookieOptionProvider);

    // create transients
    const container = XDependency
        .getClassBuilder()

        // add singleton instances
        .addClassInstance(GlobalConfigurationService, gcService)
        .addClassInstance(LoggerService, loggerService)
        .addClassInstance(CookieOptionProvider, cookieOptionProvider)
        .addClassInstance(DBSchemaProviderService, singletonProvider.getService(DBSchemaProviderService))
        .addClassInstance(SQLPoolService, singletonProvider.getService(SQLPoolService))

        // add transient signatures
        .addClass(SQLConnectionService, [SQLPoolService, LoggerService])
        .addClass(LiveSchemaProvider, [SQLConnectionService])
        .addClass(SchemaValidator, [DBSchemaProviderService, LiveSchemaProvider])
        .addClass(UrlService, [GlobalConfigurationService, DomainProviderService])
        .addClass(MapperService, [UrlService])
        .addClass(HashService, [GlobalConfigurationService])
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
        .addClass(SignupService, [ORMConnectionService, MapperService, PermissionService, CompanyService, FeatureService])
        .addClass(QuestionAnswerService, [ORMConnectionService, CoinAcquireService, LoggerService, GlobalConfigurationService])
        .addClass(TeacherInfoService, [ORMConnectionService, MapperService, AuthorizationService])
        .addClass(RoleService, [ORMConnectionService, MapperService, AuthorizationService])
        .addClass(UserStatsService, [ORMConnectionService, MapperService, TempomatService, UserProgressService])
        .addClass(UserService, [ORMConnectionService, MapperService, TeacherInfoService, HashService, RoleService, AuthorizationService, UserCourseBridgeService, TempomatService, UserStatsService])
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
        .addClass(TempomatService, [GlobalConfigurationService, ORMConnectionService])
        .addClass(PretestService, [ORMConnectionService, MapperService, ExamService, UserCourseBridgeService, QuestionAnswerService, AuthorizationService, TempomatService, PermissionService, PlayerService])
        .addClass(VersionCreateService, [ORMConnectionService])
        .addClass(CourseService, [TempomatService, ModuleService, ORMConnectionService, MapperService, FileService, UserCourseBridgeService, AuthorizationService, VersionCreateService, CompanyService, PlayerService, FeatureService])
        .addClass(ShopService, [ORMConnectionService, MapperService, CoinTransactionService, CourseService, EmailService, FileService, UrlService, AuthorizationService])
        .addClass(PlayerService, [ORMConnectionService, PlaylistService, ExamService, ModuleService, VideoService, QuestionAnswerService, PlaybackService, UserCourseBridgeService, MapperService, PermissionService])
        .addClass(PractiseQuestionService, [ORMConnectionService, QuestionAnswerService, MapperService, AuthorizationService, GlobalConfigurationService, QuestionService])
        .addClass(PrequizService, [TempomatService, ORMConnectionService, MapperService, UserCourseBridgeService, AuthorizationService])
        .addClass(UserInvitationService, [EmailService, UserService, TokenService, ORMConnectionService, LoggerService, RoleService])
        .addClass(UserRegistrationService, [ActivationCodeService, UserService, TokenService, ORMConnectionService, AuthenticationService])
        .addClass(CourseRatingService, [MapperService, ORMConnectionService, AuthorizationService, CoinTransactionService])
        .addClass(UserProgressService, [MapperService, ORMConnectionService, TempomatService, AuthorizationService])
        .addClass(CommentService, [ORMConnectionService, MapperService, AuthorizationService])
        .addClass(LikeService, [ORMConnectionService, MapperService, AuthorizationService])
        .addClass(LeaderboardService, [ORMConnectionService, CompanyService, MapperService])
        .addClass(CompanyService, [ORMConnectionService, MapperService, AuthorizationService, DomainProviderService, FileService])
        .addClass(AdminStatsService, [ORMConnectionService, MapperService])
        .addClass(FeatureService, [ORMConnectionService, CompanyService, MapperService])
        .addClass(CourseCategoryService, [ORMConnectionService, MapperService])
        .getContainer();

    return XDependency
        .orderDepHierarchy(container);
};

export const instatiateServices = (container: DependencyContainer<DepHierarchyFunction>): ServiceProvider => {

    const { instances } = XDependency
        .instatiateOnly(container);

    return new ServiceProvider(instances);
};
