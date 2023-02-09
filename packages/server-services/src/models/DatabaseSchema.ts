import { XDBMSchemaService } from "@thinkhub/x-orm";
import { ModuleVersion } from './tables/ModuleVersion';
import { QuestionVersion } from './tables/QuestionVersion';
import { ActivationCode } from './tables/ActivationCode';
import { ExamData } from './tables/ExamData';
import { VideoVersion } from './tables/VideoVersion';
import { ActivitySession } from './tables/ActivitySession';
import { ExamVersion } from './tables/ExamVersion';
import { CourseVersion } from './tables/CourseVersion';
import { Company } from './tables/Company';
import { GivenAnswer } from './tables/GivenAnswer';
import { User } from './tables/User';
import { QuestionData } from './tables/QuestionData';
import { AnswerSession } from './tables/AnswerSession';
import { ExamCompletion } from './tables/ExamCompletion';
import { Exam } from './tables/Exam';
import { ActivityStreak } from './tables/ActivityStreak';
import { Activity } from './tables/Activity';
import { CourseCompletion } from './tables/CourseCompletion';
import { RoleAssignmentBridge } from './tables/RoleAssignmentBridge';
import { PermissionAssignmentBridge } from './tables/PermissionAssignmentBridge';
import { RolePermissionBridge } from './tables/RolePermissionBridge';
import { Course } from './tables/Course';
import { Comment } from './tables/Comment';
import { Role } from './tables/Role';
import { CourseData } from './tables/CourseData';
import { VideoPlaybackSample } from './tables/VideoPlaybackSample';
import { Permission } from './tables/Permission';
import { VideoData } from './tables/VideoData';
import { Module } from './tables/Module';
import { UserCourseBridge } from './tables/UserCourseBridge';
import { StorageFile } from './tables/StorageFile';
import { ModuleData } from './tables/ModuleData';
import { AnswerVersion } from './tables/AnswerVersion';
import { AnswerGivenAnswerBridge } from './tables/AnswerGivenAnswerBridge';
import { Answer } from './tables/Answer';
import { AnswerData } from './tables/AnswerData';
import { Like } from './tables/Like';
import { CompanyOwnerBridge } from './tables/CompanyOwnerBridge';
import { ConstantValue } from './tables/ConstantValue';
import { ShopItem } from './tables/ShopItem';
import { ShopItemCategory } from './tables/ShopItemCategory';
import { CourseRatingQuestion } from './tables/CourseRatingQuestion';
import { CourseRatingGroup } from './tables/CourseRatingGroup';
import { DailyTip } from './tables/DailyTip';
import { TeacherInfo } from './tables/TeacherInfo';
import { CourseRatingQuestionUserAnswer } from './tables/CourseRatingQuestionUserAnswer';
import { GivenAnswerStreak } from './tables/GivenAnswerStreak';
import { UserSessionActivity } from './tables/UserSessionActivity';
import { DailyTipOccurrence } from './tables/DailyTipOccurrence';
import { Group } from './tables/Group';
import { MigrationVersion } from './tables/MigrationVersion';
import { DiscountCode } from './tables/DiscountCode';
import { Department } from './tables/Department';
import { Event } from './tables/Event';
import { Organization } from './tables/Organization';
import { RoleActivityBridge } from './tables/RoleActivityBridge';
import { QuestionType } from './tables/QuestionType';
import { Question } from './tables/Question';
import { PrequizUserAnswer } from './tables/PrequizUserAnswer';
import { PrequizQuestion } from './tables/PrequizQuestion';
import { PersonalityTraitCategory } from './tables/PersonalityTraitCategory';
import { Task } from './tables/Task';
import { TestTable } from './tables/TestTable';
import { TestTable2 } from './tables/TestTable2';
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
import { CoinTransaction } from './tables/CoinTransaction';
import { CourseItemCompletion } from './tables/CourseItemCompletion';
import { PrequizAnswer } from './tables/PrequizAnswer';
import { VideoSeekEvent } from './tables/VideoSeekEvent';
import { CourseCategory } from './tables/CourseCategory';
import { TempomatAdjustmentValue } from './tables/TempomatAdjustmentValue';
import { ActivationCodeListView } from './views/ActivationCodeListView';
import { ActivityStreakView } from './views/ActivityStreakView';
import { CourseItemCompletionView } from './views/CourseItemCompletionView';
import { ExamScoreView } from './views/ExamScoreView';
import { AnswerSessionView } from './views/AnswerSessionView';
import { AnswerSessionEvaluationView } from './views/AnswerSessionEvaluationView';
import { CompanyPermissionView } from './views/CompanyPermissionView';
import { CourseCompletionView } from './views/CourseCompletionView';
import { LatestCourseVersionView } from './views/LatestCourseVersionView';
import { SignupCompletedView } from './views/SignupCompletedView';
import { UserPermissionView } from './views/UserPermissionView';
import { AdminCourseCarouselDataView } from './views/AdminCourseCarouselDataView';
import { CompletedCourseExamCountView } from './views/CompletedCourseExamCountView';
import { CompletedCourseVideoCountView } from './views/CompletedCourseVideoCountView';
import { CourseItemView } from './views/CourseItemView';
import { CourseExamCountView } from './views/CourseExamCountView';
import { CourseItemCountView } from './views/CourseItemCountView';
import { CourseSpentTimeView } from './views/CourseSpentTimeView';
import { CourseVideoCountView } from './views/CourseVideoCountView';
import { LatestAnswerSessionView } from './views/LatestAnswerSessionView';
import { LatestExamView } from './views/LatestExamView';
import { FinalExamScoreView } from './views/FinalExamScoreView';
import { ModuleLastExamView } from './views/ModuleLastExamView';
import { ModuleLastExamScoreView } from './views/ModuleLastExamScoreView';
import { UserCourseProgressActualView } from './views/UserCourseProgressActualView';
import { AdminCourseUserStatsView } from './views/AdminCourseUserStatsView';
import { CompletedCourseItemCountView } from './views/CompletedCourseItemCountView';
import { CourseQuestionsSuccessView } from './views/CourseQuestionsSuccessView';
import { CurrentUserCourseBridgeView } from './views/CurrentUserCourseBridgeView';
import { CourseStateView } from './views/CourseStateView';
import { TempomatCalculationDataView } from './views/TempomatCalculationDataView';
import { UserModulePerformanceView } from './views/UserModulePerformanceView';
import { UserPerformanceView } from './views/UserPerformanceView';
import { UserPractiseRecommendationView } from './views/UserPractiseRecommendationView';
import { AdminUserCourseView } from './views/AdminUserCourseView';
import { UserSessionView } from './views/UserSessionView';
import { AdminUserListView } from './views/AdminUserListView';
import { AnswerSessionGroupView } from './views/AnswerSessionGroupView';
import { AssignablePermissionView } from './views/AssignablePermissionView';
import { UserRoleView } from './views/UserRoleView';
import { AssignableRoleView } from './views/AssignableRoleView';
import { CourseVideoLengthView } from './views/CourseVideoLengthView';
import { AvailableCourseView } from './views/AvailableCourseView';
import { CoinAcquirePerCourseView } from './views/CoinAcquirePerCourseView';
import { CoinBalanceView } from './views/CoinBalanceView';
import { ShopItemStatefulView } from './views/ShopItemStatefulView';
import { CoinTransactionView } from './views/CoinTransactionView';
import { CommentListView } from './views/CommentListView';
import { CompanyAssociatedCoursesView } from './views/CompanyAssociatedCoursesView';
import { CompanyView } from './views/CompanyView';
import { CompletedModuleItemCountView } from './views/CompletedModuleItemCountView';
import { ConstantValuesView } from './views/ConstantValuesView';
import { CorrectAnswerRatesSplitView } from './views/CorrectAnswerRatesSplitView';
import { CourseAdminContentView } from './views/CourseAdminContentView';
import { CourseAdminDetailedView } from './views/CourseAdminDetailedView';
import { CourseCompanyBridgeView } from './views/CourseCompanyBridgeView';
import { CourseAdminListView } from './views/CourseAdminListView';
import { ExamHighestScoreAnswerSessionView } from './views/ExamHighestScoreAnswerSessionView';
import { PlaylistView } from './views/PlaylistView';
import { UserPlaylistView } from './views/UserPlaylistView';
import { CourseAllItemsCompletedView } from './views/CourseAllItemsCompletedView';
import { CourseDetailsView } from './views/CourseDetailsView';
import { CourseItemEditView } from './views/CourseItemEditView';
import { CourseLearningStatsView } from './views/CourseLearningStatsView';
import { CourseLengthEstimationView } from './views/CourseLengthEstimationView';
import { CourseModuleOverviewView } from './views/CourseModuleOverviewView';
import { CourseOverviewView } from './views/CourseOverviewView';
import { CourseProgressView } from './views/CourseProgressView';
import { CourseRatingQuestionView } from './views/CourseRatingQuestionView';
import { CourseShopItemListView } from './views/CourseShopItemListView';
import { CoursesProgressListView } from './views/CoursesProgressListView';
import { DailyTipView } from './views/DailyTipView';
import { ExamCompletedView } from './views/ExamCompletedView';
import { ExamPlayerDataView } from './views/ExamPlayerDataView';
import { ExamResultStatsView } from './views/ExamResultStatsView';
import { ExamResultView } from './views/ExamResultView';
import { ExamVersionView } from './views/ExamVersionView';
import { GivenAnswerView } from './views/GivenAnswerView';
import { HomePageStatsView } from './views/HomePageStatsView';
import { LatestExamResultView } from './views/LatestExamResultView';
import { LatestGivenAnswerView } from './views/LatestGivenAnswerView';
import { LatestVideoView } from './views/LatestVideoView';
import { LeaderboardView } from './views/LeaderboardView';
import { PersonalityTraitView } from './views/PersonalityTraitView';
import { ModuleEditView } from './views/ModuleEditView';
import { ModuleItemCountView } from './views/ModuleItemCountView';
import { ModulePlayerView } from './views/ModulePlayerView';
import { PersonalityTraitCategoryView } from './views/PersonalityTraitCategoryView';
import { PractiseQuestionInfoView } from './views/PractiseQuestionInfoView';
import { PractiseQuestionView } from './views/PractiseQuestionView';
import { PrequizQuestionView } from './views/PrequizQuestionView';
import { PretestResultView } from './views/PretestResultView';
import { QuestionDataView } from './views/QuestionDataView';
import { QuestionModuleCompareView } from './views/QuestionModuleCompareView';
import { RoleListView } from './views/RoleListView';
import { SchemaVersionView } from './views/SchemaVersionView';
import { ShopItemView } from './views/ShopItemView';
import { SignupQuestionView } from './views/SignupQuestionView';
import { UserPrequizAnswersView } from './views/UserPrequizAnswersView';
import { TempomatTargetDateDataView } from './views/TempomatTargetDateDataView';
import { UserActiveCourseView } from './views/UserActiveCourseView';
import { UserAnswerView } from './views/UserAnswerView';
import { UserAssignedAuthItemView } from './views/UserAssignedAuthItemView';
import { UserCourseBridgeView } from './views/UserCourseBridgeView';
import { UserCourseCompletionCurrentView } from './views/UserCourseCompletionCurrentView';
import { UserDailyCourseItemProgressView } from './views/UserDailyCourseItemProgressView';
import { UserDailyProgressView } from './views/UserDailyProgressView';
import { UserInactiveCourseView } from './views/UserInactiveCourseView';
import { UserEngagementView } from './views/UserEngagementView';
import { UserExamStatsView } from './views/UserExamStatsView';
import { UserLatestActivityView } from './views/UserLatestActivityView';
import { UserSessionBlockView } from './views/UserSessionBlockView';
import { UserLearningOverviewStatsView } from './views/UserLearningOverviewStatsView';
import { UserLearningPageStatsView } from './views/UserLearningPageStatsView';
import { UserModuleStatsView } from './views/UserModuleStatsView';
import { UserRoleAssignCompanyView } from './views/UserRoleAssignCompanyView';
import { UserSessionDailyView } from './views/UserSessionDailyView';
import { UserSpentTimeRatioView } from './views/UserSpentTimeRatioView';
import { VideoPlaybackSampleView } from './views/VideoPlaybackSampleView';
import { UserVideoPlaybackSecondsView } from './views/UserVideoPlaybackSecondsView';
import { UserVideoPractiseProgressView } from './views/UserVideoPractiseProgressView';
import { UserVideoStatsView } from './views/UserVideoStatsView';
import { UserWeeklyCourseItemProgressView } from './views/UserWeeklyCourseItemProgressView';
import { VideoCursorSecondsView } from './views/VideoCursorSecondsView';
import { VideoPlayerDataView } from './views/VideoPlayerDataView';
import { VideoVersionView } from './views/VideoVersionView';

export const databaseSchema: XDBMSchemaService = {

    views: [
        ActivationCodeListView,
        ActivityStreakView,
        CourseItemCompletionView,
        ExamScoreView,
        AnswerSessionView,
        AnswerSessionEvaluationView,
        CompanyPermissionView,
        CourseCompletionView,
        LatestCourseVersionView,
        SignupCompletedView,
        UserPermissionView,
        AdminCourseCarouselDataView,
        CompletedCourseExamCountView,
        CompletedCourseVideoCountView,
        CourseItemView,
        CourseExamCountView,
        CourseItemCountView,
        CourseSpentTimeView,
        CourseVideoCountView,
        LatestAnswerSessionView,
        LatestExamView,
        FinalExamScoreView,
        ModuleLastExamView,
        ModuleLastExamScoreView,
        UserCourseProgressActualView,
        AdminCourseUserStatsView,
        CompletedCourseItemCountView,
        CourseQuestionsSuccessView,
        CurrentUserCourseBridgeView,
        CourseStateView,
        TempomatCalculationDataView,
        UserModulePerformanceView,
        UserPerformanceView,
        UserPractiseRecommendationView,
        AdminUserCourseView,
        UserSessionView,
        AdminUserListView,
        AnswerSessionGroupView,
        AssignablePermissionView,
        UserRoleView,
        AssignableRoleView,
        CourseVideoLengthView,
        AvailableCourseView,
        CoinAcquirePerCourseView,
        CoinBalanceView,
        ShopItemStatefulView,
        CoinTransactionView,
        CommentListView,
        CompanyAssociatedCoursesView,
        CompanyView,
        CompletedModuleItemCountView,
        ConstantValuesView,
        CorrectAnswerRatesSplitView,
        CourseAdminContentView,
        CourseAdminDetailedView,
        CourseCompanyBridgeView,
        CourseAdminListView,
        ExamHighestScoreAnswerSessionView,
        PlaylistView,
        UserPlaylistView,
        CourseAllItemsCompletedView,
        CourseDetailsView,
        CourseItemEditView,
        CourseLearningStatsView,
        CourseLengthEstimationView,
        CourseModuleOverviewView,
        CourseOverviewView,
        CourseProgressView,
        CourseRatingQuestionView,
        CourseShopItemListView,
        CoursesProgressListView,
        DailyTipView,
        ExamCompletedView,
        ExamPlayerDataView,
        ExamResultStatsView,
        ExamResultView,
        ExamVersionView,
        GivenAnswerView,
        HomePageStatsView,
        LatestExamResultView,
        LatestGivenAnswerView,
        LatestVideoView,
        LeaderboardView,
        PersonalityTraitView,
        ModuleEditView,
        ModuleItemCountView,
        ModulePlayerView,
        PersonalityTraitCategoryView,
        PractiseQuestionInfoView,
        PractiseQuestionView,
        PrequizQuestionView,
        PretestResultView,
        QuestionDataView,
        QuestionModuleCompareView,
        RoleListView,
        SchemaVersionView,
        ShopItemView,
        SignupQuestionView,
        UserPrequizAnswersView,
        TempomatTargetDateDataView,
        UserActiveCourseView,
        UserAnswerView,
        UserAssignedAuthItemView,
        UserCourseBridgeView,
        UserCourseCompletionCurrentView,
        UserDailyCourseItemProgressView,
        UserDailyProgressView,
        UserInactiveCourseView,
        UserEngagementView,
        UserExamStatsView,
        UserLatestActivityView,
        UserSessionBlockView,
        UserLearningOverviewStatsView,
        UserLearningPageStatsView,
        UserModuleStatsView,
        UserRoleAssignCompanyView,
        UserSessionDailyView,
        UserSpentTimeRatioView,
        VideoPlaybackSampleView,
        UserVideoPlaybackSecondsView,
        UserVideoPractiseProgressView,
        UserVideoStatsView,
        UserWeeklyCourseItemProgressView,
        VideoCursorSecondsView,
        VideoPlayerDataView,
        VideoVersionView
    ],

    entities: [
        ModuleVersion,
        QuestionVersion,
        ActivationCode,
        ExamData,
        VideoVersion,
        ActivitySession,
        ExamVersion,
        CourseVersion,
        Company,
        GivenAnswer,
        User,
        QuestionData,
        AnswerSession,
        ExamCompletion,
        Exam,
        ActivityStreak,
        Activity,
        CourseCompletion,
        RoleAssignmentBridge,
        PermissionAssignmentBridge,
        RolePermissionBridge,
        Course,
        Comment,
        Role,
        CourseData,
        VideoPlaybackSample,
        Permission,
        VideoData,
        Module,
        UserCourseBridge,
        StorageFile,
        ModuleData,
        AnswerVersion,
        AnswerGivenAnswerBridge,
        Answer,
        AnswerData,
        Like,
        CompanyOwnerBridge,
        ConstantValue,
        ShopItem,
        ShopItemCategory,
        CourseRatingQuestion,
        CourseRatingGroup,
        DailyTip,
        TeacherInfo,
        CourseRatingQuestionUserAnswer,
        GivenAnswerStreak,
        UserSessionActivity,
        DailyTipOccurrence,
        Group,
        MigrationVersion,
        DiscountCode,
        Department,
        Event,
        Organization,
        RoleActivityBridge,
        QuestionType,
        Question,
        PrequizUserAnswer,
        PrequizQuestion,
        PersonalityTraitCategory,
        Task,
        TestTable,
        TestTable2,
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
        CoinTransaction,
        CourseItemCompletion,
        PrequizAnswer,
        VideoSeekEvent,
        CourseCategory,
        TempomatAdjustmentValue
    ]
}