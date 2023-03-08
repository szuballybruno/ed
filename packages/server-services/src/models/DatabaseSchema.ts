import { XDBMSchemaService } from "@thinkhub/x-orm";
import { CourseVersion } from './tables/CourseVersion';
import { Company } from './tables/Company';
import { QuestionVersion } from './tables/QuestionVersion';
import { GivenAnswer } from './tables/GivenAnswer';
import { VideoVersion } from './tables/VideoVersion';
import { ActivationCode } from './tables/ActivationCode';
import { ModuleVersion } from './tables/ModuleVersion';
import { QuestionData } from './tables/QuestionData';
import { ActivitySession } from './tables/ActivitySession';
import { AnswerSession } from './tables/AnswerSession';
import { ExamCompletion } from './tables/ExamCompletion';
import { Exam } from './tables/Exam';
import { ActivityStreak } from './tables/ActivityStreak';
import { Activity } from './tables/Activity';
import { ExamData } from './tables/ExamData';
import { User } from './tables/User';
import { RoleAssignmentBridge } from './tables/RoleAssignmentBridge';
import { RolePermissionBridge } from './tables/RolePermissionBridge';
import { Course } from './tables/Course';
import { Comment } from './tables/Comment';
import { CourseCompletion } from './tables/CourseCompletion';
import { Question } from './tables/Question';
import { Role } from './tables/Role';
import { CourseData } from './tables/CourseData';
import { Permission } from './tables/Permission';
import { StorageFile } from './tables/StorageFile';
import { Video } from './tables/Video';
import { VideoPlaybackSample } from './tables/VideoPlaybackSample';
import { ModuleData } from './tables/ModuleData';
import { Module } from './tables/Module';
import { AnswerGivenAnswerBridge } from './tables/AnswerGivenAnswerBridge';
import { Answer } from './tables/Answer';
import { AnswerData } from './tables/AnswerData';
import { Like } from './tables/Like';
import { CompanyOwnerBridge } from './tables/CompanyOwnerBridge';
import { ShopItem } from './tables/ShopItem';
import { CourseCategory } from './tables/CourseCategory';
import { ShopItemCategory } from './tables/ShopItemCategory';
import { CourseItemCompletion } from './tables/CourseItemCompletion';
import { CourseRatingQuestionUserAnswer } from './tables/CourseRatingQuestionUserAnswer';
import { TeacherInfo } from './tables/TeacherInfo';
import { CourseRatingQuestion } from './tables/CourseRatingQuestion';
import { CourseRatingGroup } from './tables/CourseRatingGroup';
import { ConstantValue } from './tables/ConstantValue';
import { GivenAnswerStreak } from './tables/GivenAnswerStreak';
import { DiscountCode } from './tables/DiscountCode';
import { DailyTipOccurrence } from './tables/DailyTipOccurrence';
import { DailyTip } from './tables/DailyTip';
import { Department } from './tables/Department';
import { UserSessionActivity } from './tables/UserSessionActivity';
import { Group } from './tables/Group';
import { Event } from './tables/Event';
import { PrequizCompletion } from './tables/PrequizCompletion';
import { PrequizQuestion } from './tables/PrequizQuestion';
import { PrequizUserAnswer } from './tables/PrequizUserAnswer';
import { PersonalityTraitCategory } from './tables/PersonalityTraitCategory';
import { MigrationVersion } from './tables/MigrationVersion';
import { Organization } from './tables/Organization';
import { TempomatAdjustmentValue } from './tables/TempomatAdjustmentValue';
import { Task } from './tables/Task';
import { RoleActivityBridge } from './tables/RoleActivityBridge';
import { TestTable } from './tables/TestTable';
import { TestTable2 } from './tables/TestTable2';
import { TypeormMetadata } from './tables/TypeormMetadata';
import { UserCommentBridge } from './tables/UserCommentBridge';
import { UserCourseAccessBridge } from './tables/UserCourseAccessBridge';
import { UserExamProgressBridge } from './tables/UserExamProgressBridge';
import { VideoPlaybackSession } from './tables/VideoPlaybackSession';
import { VideoRating } from './tables/VideoRating';
import { ExamVersion } from './tables/ExamVersion';
import { CourseAccessBridge } from './tables/CourseAccessBridge';
import { AnswerVersion } from './tables/AnswerVersion';
import { VideoCompletion } from './tables/VideoCompletion';
import { UserVideoProgressBridge } from './tables/UserVideoProgressBridge';
import { PrequizAnswer } from './tables/PrequizAnswer';
import { QuestionType } from './tables/QuestionType';
import { VideoSeekEvent } from './tables/VideoSeekEvent';
import { CoinTransaction } from './tables/CoinTransaction';
import { PermissionAssignmentBridge } from './tables/PermissionAssignmentBridge';
import { UserCourseBridge } from './tables/UserCourseBridge';
import { VideoData } from './tables/VideoData';
import { ActivationCodeListView } from './views/ActivationCodeListView';
import { ActivityStreakView } from './views/ActivityStreakView';
import { CoinAcquirePerCourseView } from './views/CoinAcquirePerCourseView';
import { CoinBalanceView } from './views/CoinBalanceView';
import { CommentListView } from './views/CommentListView';
import { CompanyPermissionView } from './views/CompanyPermissionView';
import { ConstantValuesView } from './views/ConstantValuesView';
import { CourseCompanyBridgeView } from './views/CourseCompanyBridgeView';
import { CourseCompletionView } from './views/CourseCompletionView';
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
import { ExamHighestScoreAnswerSessionView } from './views/ExamHighestScoreAnswerSessionView';
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
        CompanyPermissionView,
        ConstantValuesView,
        CourseCompanyBridgeView,
        CourseCompletionView,
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
        ExamHighestScoreAnswerSessionView,
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
        CourseVersion,
        Company,
        QuestionVersion,
        GivenAnswer,
        VideoVersion,
        ActivationCode,
        ModuleVersion,
        QuestionData,
        ActivitySession,
        AnswerSession,
        ExamCompletion,
        Exam,
        ActivityStreak,
        Activity,
        ExamData,
        User,
        RoleAssignmentBridge,
        RolePermissionBridge,
        Course,
        Comment,
        CourseCompletion,
        Question,
        Role,
        CourseData,
        Permission,
        StorageFile,
        Video,
        VideoPlaybackSample,
        ModuleData,
        Module,
        AnswerGivenAnswerBridge,
        Answer,
        AnswerData,
        Like,
        CompanyOwnerBridge,
        ShopItem,
        CourseCategory,
        ShopItemCategory,
        CourseItemCompletion,
        CourseRatingQuestionUserAnswer,
        TeacherInfo,
        CourseRatingQuestion,
        CourseRatingGroup,
        ConstantValue,
        GivenAnswerStreak,
        DiscountCode,
        DailyTipOccurrence,
        DailyTip,
        Department,
        UserSessionActivity,
        Group,
        Event,
        PrequizCompletion,
        PrequizQuestion,
        PrequizUserAnswer,
        PersonalityTraitCategory,
        MigrationVersion,
        Organization,
        TempomatAdjustmentValue,
        Task,
        RoleActivityBridge,
        TestTable,
        TestTable2,
        TypeormMetadata,
        UserCommentBridge,
        UserCourseAccessBridge,
        UserExamProgressBridge,
        VideoPlaybackSession,
        VideoRating,
        ExamVersion,
        CourseAccessBridge,
        AnswerVersion,
        VideoCompletion,
        UserVideoProgressBridge,
        PrequizAnswer,
        QuestionType,
        VideoSeekEvent,
        CoinTransaction,
        PermissionAssignmentBridge,
        UserCourseBridge,
        VideoData
    ]
}