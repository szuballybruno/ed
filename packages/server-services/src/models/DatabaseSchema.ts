import { XDBMSchemaService } from "@episto/x-orm";
import { ModuleVersion } from './tables/ModuleVersion';
import { VideoVersion } from './tables/VideoVersion';
import { AnswerSession } from './tables/AnswerSession';
import { ActivationCode } from './tables/ActivationCode';
import { ExamVersion } from './tables/ExamVersion';
import { CourseVersion } from './tables/CourseVersion';
import { Company } from './tables/Company';
import { ActivitySession } from './tables/ActivitySession';
import { CourseCategory } from './tables/CourseCategory';
import { ExamCompletion } from './tables/ExamCompletion';
import { Exam } from './tables/Exam';
import { ActivityStreak } from './tables/ActivityStreak';
import { Activity } from './tables/Activity';
import { Like } from './tables/Like';
import { ExamData } from './tables/ExamData';
import { GivenAnswer } from './tables/GivenAnswer';
import { ShopItem } from './tables/ShopItem';
import { ShopItemCategory } from './tables/ShopItemCategory';
import { Question } from './tables/Question';
import { QuestionVersion } from './tables/QuestionVersion';
import { QuestionData } from './tables/QuestionData';
import { CourseData } from './tables/CourseData';
import { RoleAssignmentBridge } from './tables/RoleAssignmentBridge';
import { CourseCompletion } from './tables/CourseCompletion';
import { StorageFile } from './tables/StorageFile';
import { Comment } from './tables/Comment';
import { Course } from './tables/Course';
import { RolePermissionBridge } from './tables/RolePermissionBridge';
import { Permission } from './tables/Permission';
import { Module } from './tables/Module';
import { VideoPlaybackSample } from './tables/VideoPlaybackSample';
import { PrequizAnswer } from './tables/PrequizAnswer';
import { ModuleData } from './tables/ModuleData';
import { PrequizUserAnswer } from './tables/PrequizUserAnswer';
import { TempomatAdjustmentValue } from './tables/TempomatAdjustmentValue';
import { AnswerVersion } from './tables/AnswerVersion';
import { AnswerGivenAnswerBridge } from './tables/AnswerGivenAnswerBridge';
import { Answer } from './tables/Answer';
import { AnswerData } from './tables/AnswerData';
import { FeatureAssignmentBridge } from './tables/FeatureAssignmentBridge';
import { ConstantValue } from './tables/ConstantValue';
import { CompanyOwnerBridge } from './tables/CompanyOwnerBridge';
import { CourseItemCompletion } from './tables/CourseItemCompletion';
import { TeacherInfo } from './tables/TeacherInfo';
import { CourseCategoryAssignmentBridge } from './tables/CourseCategoryAssignmentBridge';
import { Feature } from './tables/Feature';
import { Event } from './tables/Event';
import { CourseRatingGroup } from './tables/CourseRatingGroup';
import { DailyTipOccurrence } from './tables/DailyTipOccurrence';
import { Department } from './tables/Department';
import { DiscountCode } from './tables/DiscountCode';
import { CourseRatingQuestion } from './tables/CourseRatingQuestion';
import { CourseRatingQuestionUserAnswer } from './tables/CourseRatingQuestionUserAnswer';
import { DailyTip } from './tables/DailyTip';
import { Group } from './tables/Group';
import { MigrationVersion } from './tables/MigrationVersion';
import { Organization } from './tables/Organization';
import { FeatureConstraintBridge } from './tables/FeatureConstraintBridge';
import { GivenAnswerStreak } from './tables/GivenAnswerStreak';
import { PersonalityTraitCategory } from './tables/PersonalityTraitCategory';
import { QuestionType } from './tables/QuestionType';
import { Task } from './tables/Task';
import { RoleActivityBridge } from './tables/RoleActivityBridge';
import { TestTable } from './tables/TestTable';
import { TestTable2 } from './tables/TestTable2';
import { PrequizQuestion } from './tables/PrequizQuestion';
import { TypeormMetadata } from './tables/TypeormMetadata';
import { UserCommentBridge } from './tables/UserCommentBridge';
import { UserCourseAccessBridge } from './tables/UserCourseAccessBridge';
import { UserExamProgressBridge } from './tables/UserExamProgressBridge';
import { VideoPlaybackSession } from './tables/VideoPlaybackSession';
import { VideoRating } from './tables/VideoRating';
import { PrequizCompletion } from './tables/PrequizCompletion';
import { CourseAccessBridge } from './tables/CourseAccessBridge';
import { VideoCompletion } from './tables/VideoCompletion';
import { UserVideoProgressBridge } from './tables/UserVideoProgressBridge';
import { Video } from './tables/Video';
import { VideoSeekEvent } from './tables/VideoSeekEvent';
import { UserSessionActivity } from './tables/UserSessionActivity';
import { CoinTransaction } from './tables/CoinTransaction';
import { PermissionAssignmentBridge } from './tables/PermissionAssignmentBridge';
import { Role } from './tables/Role';
import { UserCourseBridge } from './tables/UserCourseBridge';
import { User } from './tables/User';
import { VideoData } from './tables/VideoData';
import { ActivationCodeListView } from './views/ActivationCodeListView';
import { ActivityStreakView } from './views/ActivityStreakView';
import { CoinAcquirePerCourseView } from './views/CoinAcquirePerCourseView';
import { CoinBalanceView } from './views/CoinBalanceView';
import { CommentListView } from './views/CommentListView';
import { CompanyCourseCategoryView } from './views/CompanyCourseCategoryView';
import { CompanyFeatureView } from './views/CompanyFeatureView';
import { CompanyPermissionView } from './views/CompanyPermissionView';
import { ConstantValuesView } from './views/ConstantValuesView';
import { CourseCompanyBridgeView } from './views/CourseCompanyBridgeView';
import { CourseCompletionView } from './views/CourseCompletionView';
import { CourseFeatureView } from './views/CourseFeatureView';
import { CourseItemCompletionView } from './views/CourseItemCompletionView';
import { CourseModuleOverviewView } from './views/CourseModuleOverviewView';
import { CourseQuestionsSuccessView } from './views/CourseQuestionsSuccessView';
import { CourseRatingQuestionView } from './views/CourseRatingQuestionView';
import { CourseShopItemListView } from './views/CourseShopItemListView';
import { CourseVideoLengthView } from './views/CourseVideoLengthView';
import { CurrentUserCourseBridgeView } from './views/CurrentUserCourseBridgeView';
import { ExamScoreView } from './views/ExamScoreView';
import { ExamVersionView } from './views/ExamVersionView';
import { GivenAnswerView } from './views/GivenAnswerView';
import { LatestAnswerSessionView } from './views/LatestAnswerSessionView';
import { LatestCourseVersionView } from './views/LatestCourseVersionView';
import { LatestExamView } from './views/LatestExamView';
import { LatestGivenAnswerView } from './views/LatestGivenAnswerView';
import { LatestVideoView } from './views/LatestVideoView';
import { LeaderboardView } from './views/LeaderboardView';
import { ModuleEditView } from './views/ModuleEditView';
import { ModulePlayerView } from './views/ModulePlayerView';
import { PersonalityTraitCategoryView } from './views/PersonalityTraitCategoryView';
import { PersonalityTraitView } from './views/PersonalityTraitView';
import { PractiseQuestionInfoView } from './views/PractiseQuestionInfoView';
import { PractiseQuestionView } from './views/PractiseQuestionView';
import { PrequizQuestionView } from './views/PrequizQuestionView';
import { QuestionDataView } from './views/QuestionDataView';
import { QuestionModuleCompareView } from './views/QuestionModuleCompareView';
import { SchemaVersionView } from './views/SchemaVersionView';
import { ShopItemStatefulView } from './views/ShopItemStatefulView';
import { ShopItemView } from './views/ShopItemView';
import { SignupQuestionView } from './views/SignupQuestionView';
import { UserAssignedAuthItemView } from './views/UserAssignedAuthItemView';
import { UserCourseBridgeView } from './views/UserCourseBridgeView';
import { UserFeatureView } from './views/UserFeatureView';
import { UserModulePerformanceView } from './views/UserModulePerformanceView';
import { UserPractiseRecommendationView } from './views/UserPractiseRecommendationView';
import { UserPrequizAnswersView } from './views/UserPrequizAnswersView';
import { UserRoleView } from './views/UserRoleView';
import { UserSessionView } from './views/UserSessionView';
import { VideoCursorSecondsView } from './views/VideoCursorSecondsView';
import { VideoPlaybackSampleView } from './views/VideoPlaybackSampleView';
import { VideoPlayerDataView } from './views/VideoPlayerDataView';
import { VideoVersionView } from './views/VideoVersionView';
import { CoinTransactionView } from './views/CoinTransactionView';
import { CompanyAssociatedCoursesView } from './views/CompanyAssociatedCoursesView';
import { CompletedCourseExamCountView } from './views/CompletedCourseExamCountView';
import { CompletedCourseItemCountView } from './views/CompletedCourseItemCountView';
import { CompletedCourseVideoCountView } from './views/CompletedCourseVideoCountView';
import { CompletedModuleItemCountView } from './views/CompletedModuleItemCountView';
import { CourseAdminDetailedView } from './views/CourseAdminDetailedView';
import { CourseItemView } from './views/CourseItemView';
import { CourseExamCountView } from './views/CourseExamCountView';
import { CourseItemCountView } from './views/CourseItemCountView';
import { CourseItemEditView } from './views/CourseItemEditView';
import { CourseLengthEstimationView } from './views/CourseLengthEstimationView';
import { CourseVideoCountView } from './views/CourseVideoCountView';
import { DailyTipView } from './views/DailyTipView';
import { ModuleLastExamView } from './views/ModuleLastExamView';
import { UserLatestActivityView } from './views/UserLatestActivityView';
import { UserPerformanceView } from './views/UserPerformanceView';
import { UserSessionBlockView } from './views/UserSessionBlockView';
import { UserSessionDailyView } from './views/UserSessionDailyView';
import { UserVideoPlaybackSecondsView } from './views/UserVideoPlaybackSecondsView';
import { UserVideoPractiseProgressView } from './views/UserVideoPractiseProgressView';
import { AnswerSessionView } from './views/AnswerSessionView';
import { AnswerSessionEvaluationView } from './views/AnswerSessionEvaluationView';
import { AnswerSessionGroupView } from './views/AnswerSessionGroupView';
import { CorrectAnswerRatesSplitView } from './views/CorrectAnswerRatesSplitView';
import { ExamCompletedView } from './views/ExamCompletedView';
import { UserAnswerView } from './views/UserAnswerView';
import { UserDailyProgressView } from './views/UserDailyProgressView';
import { UserExamStatsView } from './views/UserExamStatsView';
import { UserPerformanceAnswerGroupView } from './views/UserPerformanceAnswerGroupView';
import { CourseAdminContentView } from './views/CourseAdminContentView';
import { CourseSpentTimeView } from './views/CourseSpentTimeView';
import { UserSpentTimeRatioView } from './views/UserSpentTimeRatioView';
import { CourseStateView } from './views/CourseStateView';
import { ExamHighestScoreAnswerSessionView } from './views/ExamHighestScoreAnswerSessionView';
import { ModuleItemCountView } from './views/ModuleItemCountView';
import { PlaylistView } from './views/PlaylistView';
import { SignupCompletedView } from './views/SignupCompletedView';
import { UserActiveCourseView } from './views/UserActiveCourseView';
import { UserCourseCompletionCurrentView } from './views/UserCourseCompletionCurrentView';
import { UserCourseProgressActualView } from './views/UserCourseProgressActualView';
import { CourseProgressView } from './views/CourseProgressView';
import { UserDailyCourseItemProgressView } from './views/UserDailyCourseItemProgressView';
import { UserWeeklyCourseItemProgressView } from './views/UserWeeklyCourseItemProgressView';
import { UserInactiveCourseView } from './views/UserInactiveCourseView';
import { UserEngagementView } from './views/UserEngagementView';
import { UserReactionTimeView } from './views/UserReactionTimeView';
import { CourseAdminListView } from './views/CourseAdminListView';
import { ExamPlayerDataView } from './views/ExamPlayerDataView';
import { ExamResultStatsView } from './views/ExamResultStatsView';
import { ExamResultView } from './views/ExamResultView';
import { LatestExamResultView } from './views/LatestExamResultView';
import { FinalExamScoreView } from './views/FinalExamScoreView';
import { HomePageStatsView } from './views/HomePageStatsView';
import { ModuleLastExamScoreView } from './views/ModuleLastExamScoreView';
import { PretestResultView } from './views/PretestResultView';
import { TempomatTargetDateDataView } from './views/TempomatTargetDateDataView';
import { UserCourseCompletionOriginalEstimationView } from './views/UserCourseCompletionOriginalEstimationView';
import { UserLearningPageStatsView } from './views/UserLearningPageStatsView';
import { UserPerformanceComparisonStatsView } from './views/UserPerformanceComparisonStatsView';
import { UserPermissionView } from './views/UserPermissionView';
import { AssignablePermissionView } from './views/AssignablePermissionView';
import { CompanyView } from './views/CompanyView';
import { RoleListView } from './views/RoleListView';
import { UserRoleAssignCompanyView } from './views/UserRoleAssignCompanyView';
import { AssignableRoleView } from './views/AssignableRoleView';
import { AdminCourseCarouselDataView } from './views/AdminCourseCarouselDataView';
import { AdminUserListView } from './views/AdminUserListView';
import { CourseDetailsView } from './views/CourseDetailsView';
import { TempomatCalculationDataView } from './views/TempomatCalculationDataView';
import { UserPlaylistView } from './views/UserPlaylistView';
import { CourseAllItemsCompletedView } from './views/CourseAllItemsCompletedView';
import { AvailableCourseView } from './views/AvailableCourseView';
import { CoursesProgressListView } from './views/CoursesProgressListView';
import { UserModuleStatsView } from './views/UserModuleStatsView';
import { UserVideoStatsView } from './views/UserVideoStatsView';
import { UserOverviewView } from './views/UserOverviewView';
import { UserLearningOverviewStatsView } from './views/UserLearningOverviewStatsView';
import { CourseLearningStatsView } from './views/CourseLearningStatsView';
import { CourseOverviewView } from './views/CourseOverviewView';
import { AdminUserCourseView } from './views/AdminUserCourseView';
import { AdminCourseUserStatsView } from './views/AdminCourseUserStatsView';

export const databaseSchema: XDBMSchemaService = {

    views: [
        ActivationCodeListView,
        ActivityStreakView,
        CoinAcquirePerCourseView,
        CoinBalanceView,
        CommentListView,
        CompanyCourseCategoryView,
        CompanyFeatureView,
        CompanyPermissionView,
        ConstantValuesView,
        CourseCompanyBridgeView,
        CourseCompletionView,
        CourseFeatureView,
        CourseItemCompletionView,
        CourseModuleOverviewView,
        CourseQuestionsSuccessView,
        CourseRatingQuestionView,
        CourseShopItemListView,
        CourseVideoLengthView,
        CurrentUserCourseBridgeView,
        ExamScoreView,
        ExamVersionView,
        GivenAnswerView,
        LatestAnswerSessionView,
        LatestCourseVersionView,
        LatestExamView,
        LatestGivenAnswerView,
        LatestVideoView,
        LeaderboardView,
        ModuleEditView,
        ModulePlayerView,
        PersonalityTraitCategoryView,
        PersonalityTraitView,
        PractiseQuestionInfoView,
        PractiseQuestionView,
        PrequizQuestionView,
        QuestionDataView,
        QuestionModuleCompareView,
        SchemaVersionView,
        ShopItemStatefulView,
        ShopItemView,
        SignupQuestionView,
        UserAssignedAuthItemView,
        UserCourseBridgeView,
        UserFeatureView,
        UserModulePerformanceView,
        UserPractiseRecommendationView,
        UserPrequizAnswersView,
        UserRoleView,
        UserSessionView,
        VideoCursorSecondsView,
        VideoPlaybackSampleView,
        VideoPlayerDataView,
        VideoVersionView,
        CoinTransactionView,
        CompanyAssociatedCoursesView,
        CompletedCourseExamCountView,
        CompletedCourseItemCountView,
        CompletedCourseVideoCountView,
        CompletedModuleItemCountView,
        CourseAdminDetailedView,
        CourseItemView,
        CourseExamCountView,
        CourseItemCountView,
        CourseItemEditView,
        CourseLengthEstimationView,
        CourseVideoCountView,
        DailyTipView,
        ModuleLastExamView,
        UserLatestActivityView,
        UserPerformanceView,
        UserSessionBlockView,
        UserSessionDailyView,
        UserVideoPlaybackSecondsView,
        UserVideoPractiseProgressView,
        AnswerSessionView,
        AnswerSessionEvaluationView,
        AnswerSessionGroupView,
        CorrectAnswerRatesSplitView,
        ExamCompletedView,
        UserAnswerView,
        UserDailyProgressView,
        UserExamStatsView,
        UserPerformanceAnswerGroupView,
        CourseAdminContentView,
        CourseSpentTimeView,
        UserSpentTimeRatioView,
        CourseStateView,
        ExamHighestScoreAnswerSessionView,
        ModuleItemCountView,
        PlaylistView,
        SignupCompletedView,
        UserActiveCourseView,
        UserCourseCompletionCurrentView,
        UserCourseProgressActualView,
        CourseProgressView,
        UserDailyCourseItemProgressView,
        UserWeeklyCourseItemProgressView,
        UserInactiveCourseView,
        UserEngagementView,
        UserReactionTimeView,
        CourseAdminListView,
        ExamPlayerDataView,
        ExamResultStatsView,
        ExamResultView,
        LatestExamResultView,
        FinalExamScoreView,
        HomePageStatsView,
        ModuleLastExamScoreView,
        PretestResultView,
        TempomatTargetDateDataView,
        UserCourseCompletionOriginalEstimationView,
        UserLearningPageStatsView,
        UserPerformanceComparisonStatsView,
        UserPermissionView,
        AssignablePermissionView,
        CompanyView,
        RoleListView,
        UserRoleAssignCompanyView,
        AssignableRoleView,
        AdminCourseCarouselDataView,
        AdminUserListView,
        CourseDetailsView,
        TempomatCalculationDataView,
        UserPlaylistView,
        CourseAllItemsCompletedView,
        AvailableCourseView,
        CoursesProgressListView,
        UserModuleStatsView,
        UserVideoStatsView,
        UserOverviewView,
        UserLearningOverviewStatsView,
        CourseLearningStatsView,
        CourseOverviewView,
        AdminUserCourseView,
        AdminCourseUserStatsView
    ],

    entities: [
        ModuleVersion,
        VideoVersion,
        AnswerSession,
        ActivationCode,
        ExamVersion,
        CourseVersion,
        Company,
        ActivitySession,
        CourseCategory,
        ExamCompletion,
        Exam,
        ActivityStreak,
        Activity,
        Like,
        ExamData,
        GivenAnswer,
        ShopItem,
        ShopItemCategory,
        Question,
        QuestionVersion,
        QuestionData,
        CourseData,
        RoleAssignmentBridge,
        CourseCompletion,
        StorageFile,
        Comment,
        Course,
        RolePermissionBridge,
        Permission,
        Module,
        VideoPlaybackSample,
        PrequizAnswer,
        ModuleData,
        PrequizUserAnswer,
        TempomatAdjustmentValue,
        AnswerVersion,
        AnswerGivenAnswerBridge,
        Answer,
        AnswerData,
        FeatureAssignmentBridge,
        ConstantValue,
        CompanyOwnerBridge,
        CourseItemCompletion,
        TeacherInfo,
        CourseCategoryAssignmentBridge,
        Feature,
        Event,
        CourseRatingGroup,
        DailyTipOccurrence,
        Department,
        DiscountCode,
        CourseRatingQuestion,
        CourseRatingQuestionUserAnswer,
        DailyTip,
        Group,
        MigrationVersion,
        Organization,
        FeatureConstraintBridge,
        GivenAnswerStreak,
        PersonalityTraitCategory,
        QuestionType,
        Task,
        RoleActivityBridge,
        TestTable,
        TestTable2,
        PrequizQuestion,
        TypeormMetadata,
        UserCommentBridge,
        UserCourseAccessBridge,
        UserExamProgressBridge,
        VideoPlaybackSession,
        VideoRating,
        PrequizCompletion,
        CourseAccessBridge,
        VideoCompletion,
        UserVideoProgressBridge,
        Video,
        VideoSeekEvent,
        UserSessionActivity,
        CoinTransaction,
        PermissionAssignmentBridge,
        Role,
        UserCourseBridge,
        User,
        VideoData
    ]
}