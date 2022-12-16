import { XDBMSchemaService } from "@episto/x-orm";
import { ActivationCode } from './tables/ActivationCode';
import { ActivitySession } from './tables/ActivitySession';
import { ActivityStreak } from './tables/ActivityStreak';
import { Answer } from './tables/Answer';
import { AnswerData } from './tables/AnswerData';
import { AnswerGivenAnswerBridge } from './tables/AnswerGivenAnswerBridge';
import { AnswerSession } from './tables/AnswerSession';
import { AnswerVersion } from './tables/AnswerVersion';
import { CoinTransaction } from './tables/CoinTransaction';
import { Comment } from './tables/Comment';
import { Company } from './tables/Company';
import { CompanyOwnerBridge } from './tables/CompanyOwnerBridge';
import { Course } from './tables/Course';
import { CourseAccessBridge } from './tables/CourseAccessBridge';
import { CourseCategory } from './tables/CourseCategory';
import { CourseCompletion } from './tables/CourseCompletion';
import { CourseData } from './tables/CourseData';
import { CourseRatingGroup } from './tables/CourseRatingGroup';
import { CourseRatingQuestion } from './tables/CourseRatingQuestion';
import { CourseRatingQuestionUserAnswer } from './tables/CourseRatingQuestionUserAnswer';
import { CourseVersion } from './tables/CourseVersion';
import { DailyTip } from './tables/DailyTip';
import { DailyTipOccurrence } from './tables/DailyTipOccurrence';
import { Department } from './tables/Department';
import { DiscountCode } from './tables/DiscountCode';
import { Event } from './tables/Event';
import { Exam } from './tables/Exam';
import { ExamCompletion } from './tables/ExamCompletion';
import { ExamData } from './tables/ExamData';
import { ExamVersion } from './tables/ExamVersion';
import { GivenAnswer } from './tables/GivenAnswer';
import { GivenAnswerStreak } from './tables/GivenAnswerStreak';
import { Group } from './tables/Group';
import { Like } from './tables/Like';
import { Module } from './tables/Module';
import { ModuleData } from './tables/ModuleData';
import { ModuleVersion } from './tables/ModuleVersion';
import { Permission } from './tables/Permission';
import { PermissionAssignmentBridge } from './tables/PermissionAssignmentBridge';
import { PersonalityTraitCategory } from './tables/PersonalityTraitCategory';
import { PrequizAnswer } from './tables/PrequizAnswer';
import { PrequizCompletion } from './tables/PrequizCompletion';
import { PrequizQuestion } from './tables/PrequizQuestion';
import { PrequizUserAnswer } from './tables/PrequizUserAnswer';
import { Question } from './tables/Question';
import { QuestionData } from './tables/QuestionData';
import { QuestionType } from './tables/QuestionType';
import { QuestionVersion } from './tables/QuestionVersion';
import { Role } from './tables/Role';
import { RoleAssignmentBridge } from './tables/RoleAssignmentBridge';
import { RolePermissionBridge } from './tables/RolePermissionBridge';
import { ShopItem } from './tables/ShopItem';
import { ShopItemCategory } from './tables/ShopItemCategory';
import { StorageFile } from './tables/StorageFile';
import { Task } from './tables/Task';
import { TeacherInfo } from './tables/TeacherInfo';
import { TempomatAdjustmentValue } from './tables/TempomatAdjustmentValue';
import { User } from './tables/User';
import { UserCourseBridge } from './tables/UserCourseBridge';
import { UserSessionActivity } from './tables/UserSessionActivity';
import { UserVideoProgressBridge } from './tables/UserVideoProgressBridge';
import { Video } from './tables/Video';
import { VideoCompletion } from './tables/VideoCompletion';
import { VideoData } from './tables/VideoData';
import { VideoPlaybackSample } from './tables/VideoPlaybackSample';
import { VideoPlaybackSession } from './tables/VideoPlaybackSession';
import { VideoRating } from './tables/VideoRating';
import { VideoSeekEvent } from './tables/VideoSeekEvent';
import { VideoVersion } from './tables/VideoVersion';
import { ActivationCodeListView } from './views/ActivationCodeListView';
import { ActivityStreakView } from './views/ActivityStreakView';
import { AdminCourseUserStatsView } from './views/AdminCourseUserStatsView';
import { AdminUserCoursesView } from './views/AdminUserCoursesView';
import { AnswerSessionGroupView } from './views/AnswerSessionGroupView';
import { AnswerSessionView } from './views/AnswerSessionView';
import { AvailableCourseView } from './views/AvailableCourseView';
import { CoinBalanceView } from './views/CoinBalanceView';
import { CoinTransactionView } from './views/CoinTransactionView';
import { CommentListView } from './views/CommentListView';
import { CorrectAnswerRatesSplitView } from './views/CorrectAnswerRatesSplitView';
import { CourseAdminContentView } from './views/CourseAdminContentView';
import { CourseAdminDetailedView } from './views/CourseAdminDetailedView';
import { CourseAdminListView } from './views/CourseAdminListView';
import { CourseAllItemsCompletedView } from './views/CourseAllItemsCompletedView';
import { CourseDetailsView } from './views/CourseDetailsView';
import { CourseItemEditView } from './views/CourseItemEditView';
import { CourseLearningStatsView } from './views/CourseLearningStatsView';
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
import { ExamScoreView } from './views/ExamScoreView';
import { ExamVersionView } from './views/ExamVersionView';
import { GivenAnswerView } from './views/GivenAnswerView';
import { HomePageStatsView } from './views/HomePageStatsView';
import { LatestCourseVersionView } from './views/LatestCourseVersionView';
import { LatestExamResultView } from './views/LatestExamResultView';
import { LatestExamView } from './views/LatestExamView';
import { LatestVideoView } from './views/LatestVideoView';
import { LeaderboardView } from './views/LeaderboardView';
import { ModuleEditView } from './views/ModuleEditView';
import { ModulePlayerView } from './views/ModulePlayerView';
import { PersonalityTraitCategoryView } from './views/PersonalityTraitCategoryView';
import { PersonalityTraitView } from './views/PersonalityTraitView';
import { PlaylistView } from './views/PlaylistView';
import { PractiseQuestionView } from './views/PractiseQuestionView';
import { PrequizQuestionView } from './views/PrequizQuestionView';
import { PretestResultView } from './views/PretestResultView';
import { QuestionDataView } from './views/QuestionDataView';
import { QuestionModuleCompareView } from './views/QuestionModuleCompareView';
import { ShopItemStatefulView } from './views/ShopItemStatefulView';
import { ShopItemView } from './views/ShopItemView';
import { SignupCompletedView } from './views/SignupCompletedView';
import { SignupQuestionView } from './views/SignupQuestionView';
import { TempomatCalculationDataView } from './views/TempomatCalculationDataView';
import { UserActiveCourseView } from './views/UserActiveCourseView';
import { UserAnswerView } from './views/UserAnswerView';
import { UserCourseBridgeView } from './views/UserCourseBridgeView';
import { UserDailyCourseItemProgressView } from './views/UserDailyCourseItemProgressView';
import { UserDailyProgressView } from './views/UserDailyProgressView';
import { UserEngagementView } from './views/UserEngagementView';
import { UserExamStatsView } from './views/UserExamStatsView';
import { UserInactiveCourseView } from './views/UserInactiveCourseView';
import { UserLearningOverviewStatsView } from './views/UserLearningOverviewStatsView';
import { UserLearningPageStatsView } from './views/UserLearningPageStatsView';
import { UserModulePerformanceAnswerGroupView } from './views/UserModulePerformanceAnswerGroupView';
import { UserModuleStatsView } from './views/UserModuleStatsView';
import { UserOverviewView } from './views/UserOverviewView';
import { UserPerformanceAnswerGroupView } from './views/UserPerformanceAnswerGroupView';
import { UserPlaylistView } from './views/UserPlaylistView';
import { UserPractiseRecommendationView } from './views/UserPractiseRecommendationView';
import { UserReactionTimeView } from './views/UserReactionTimeView';
import { UserRoleAssignCompanyView } from './views/UserRoleAssignCompanyView';
import { UserRoleView } from './views/UserRoleView';
import { UserSessionDailyView } from './views/UserSessionDailyView';
import { UserSessionView } from './views/UserSessionView';
import { UserSpentTimeRatioView } from './views/UserSpentTimeRatioView';
import { UserVideoPractiseProgressView } from './views/UserVideoPractiseProgressView';
import { UserVideoStatsView } from './views/UserVideoStatsView';
import { UserWeeklyCourseItemProgressView } from './views/UserWeeklyCourseItemProgressView';
import { VideoCursorSecondsView } from './views/VideoCursorSecondsView';
import { VideoPlayerDataView } from './views/VideoPlayerDataView';
import { VideoVersionView } from './views/VideoVersionView';

export const databaseSchema: XDBMSchemaService = {

    views: [
        ActivationCodeListView,
        PlaylistView,
        ActivityStreakView,
        AnswerSessionView,
        CoinBalanceView,
        CommentListView,
        CourseModuleOverviewView,
        CourseRatingQuestionView,
        LatestCourseVersionView,
        LatestExamView,
        LatestVideoView,
        ModulePlayerView,
        ModuleEditView,
        PersonalityTraitCategoryView,
        PersonalityTraitView,
        PractiseQuestionView,
        PrequizQuestionView,
        ShopItemStatefulView,
        ShopItemView,
        SignupQuestionView,
        UserActiveCourseView,
        UserCourseBridgeView,
        UserPractiseRecommendationView,
        UserRoleView,
        UserSessionView,
        VideoCursorSecondsView,
        VideoVersionView,
        ExamVersionView,
        CourseShopItemListView,
        CourseAllItemsCompletedView,
        ExamScoreView,
        VideoPlayerDataView,
        ExamCompletedView,
        UserPlaylistView,
        CourseDetailsView,
        AvailableCourseView,
        ExamResultView,
        LatestExamResultView,
        CourseAdminListView,
        QuestionDataView,
        UserAnswerView,
        UserDailyCourseItemProgressView,
        UserVideoPractiseProgressView,
        TempomatCalculationDataView,
        AnswerSessionGroupView,
        CorrectAnswerRatesSplitView,
        UserPerformanceAnswerGroupView,
        UserModulePerformanceAnswerGroupView,
        UserReactionTimeView,
        UserSessionDailyView,
        SignupCompletedView,
        DailyTipView,
        CourseAdminDetailedView,
        CourseAdminContentView,
        CoinTransactionView,
        CourseItemEditView,
        ExamPlayerDataView,
        PretestResultView,
        UserDailyProgressView,
        UserWeeklyCourseItemProgressView,
        UserRoleAssignCompanyView,
        CourseLearningStatsView,
        ExamResultStatsView,
        CourseProgressView,
        CoursesProgressListView,
        CourseOverviewView,
        UserInactiveCourseView,
        HomePageStatsView,
        UserEngagementView,
        UserLearningOverviewStatsView,
        AdminUserCoursesView,
        UserVideoStatsView,
        UserExamStatsView,
        UserModuleStatsView,
        UserSpentTimeRatioView,
        UserLearningPageStatsView,
        GivenAnswerView,
        AdminCourseUserStatsView,
        QuestionModuleCompareView,
        LeaderboardView,
        UserOverviewView,
    ],

    entities: [
        PrequizCompletion,
        VideoVersion,
        Video,
        ExamVersion,
        Exam,
        ModuleVersion,
        Module,
        CourseVersion,
        Course,
        AnswerVersion,
        Answer,
        QuestionVersion,
        Question,
        ActivationCode,
        CourseData,
        Group,
        CourseCategory,
        ExamData,
        Company,
        User,
        VideoData,
        PermissionAssignmentBridge,
        Task,
        GivenAnswer,
        CompanyOwnerBridge,
        AnswerGivenAnswerBridge,
        QuestionData,
        AnswerData,
        StorageFile,
        AnswerSession,
        VideoPlaybackSample,
        VideoPlaybackSession,
        VideoSeekEvent,
        TeacherInfo,
        UserCourseBridge,
        PersonalityTraitCategory,
        Role,
        Permission,
        RolePermissionBridge,
        RoleAssignmentBridge,
        Department,
        Comment,
        Like,
        DailyTip,
        DailyTipOccurrence,
        QuestionType,
        UserSessionActivity,
        ModuleData,
        CoinTransaction,
        GivenAnswerStreak,
        ActivitySession,
        ActivityStreak,
        Event,
        ActivationCode,
        CourseAccessBridge,
        ShopItem,
        ShopItemCategory,
        DiscountCode,
        VideoRating,
        PrequizQuestion,
        PrequizAnswer,
        PrequizUserAnswer,
        CourseRatingGroup,
        CourseRatingQuestion,
        CourseRatingQuestionUserAnswer,
        UserVideoProgressBridge,
        TempomatAdjustmentValue,
        ExamCompletion,
        VideoCompletion,
        CourseCompletion
    ]
}