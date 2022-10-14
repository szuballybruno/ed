import { Answer } from '../../models/entity/answer/Answer';
import { AnswerData } from '../../models/entity/answer/AnswerData';
import { AnswerVersion } from '../../models/entity/answer/AnswerVersion';
import { CompanyOwnerBridge } from '../../models/entity/authorization/CompanyOwnerBridge';
import { Permission } from '../../models/entity/authorization/Permission';
import { PermissionAssignmentBridge } from '../../models/entity/authorization/PermissionAssignmentBridge';
import { Role } from '../../models/entity/authorization/Role';
import { RoleAssignmentBridge } from '../../models/entity/authorization/RoleAssignmentBridge';
import { RolePermissionBridge } from '../../models/entity/authorization/RolePermissionBridge';
import { Course } from '../../models/entity/course/Course';
import { CourseData } from '../../models/entity/course/CourseData';
import { CourseVersion } from '../../models/entity/course/CourseVersion';
import { CourseRatingGroup } from '../../models/entity/courseRating/CourseRatingGroup';
import { CourseRatingQuestion } from '../../models/entity/courseRating/CourseRatingQuestion';
import { CourseRatingQuestionUserAnswer } from '../../models/entity/courseRating/CourseRatingQuestionUserAnswer';
import { Exam } from '../../models/entity/exam/Exam';
import { ExamData } from '../../models/entity/exam/ExamData';
import { ExamVersion } from '../../models/entity/exam/ExamVersion';
import { ActivationCode } from '../../models/entity/misc/ActivationCode';
import { ActivitySession } from '../../models/entity/misc/ActivitySession';
import { ActivityStreak } from '../../models/entity/misc/ActivityStreak';
import { AnswerGivenAnswerBridge } from '../../models/entity/misc/AnswerGivenAnswerBridge';
import { AnswerSession } from '../../models/entity/misc/AnswerSession';
import { CoinTransaction } from '../../models/entity/misc/CoinTransaction';
import { Comment } from '../../models/entity/misc/Comment';
import { Company } from '../../models/entity/misc/Company';
import { CourseAccessBridge } from '../../models/entity/misc/CourseAccessBridge';
import { CourseCategory } from '../../models/entity/misc/CourseCategory';
import { CourseCompletion } from '../../models/entity/misc/CourseCompletion';
import { DailyTip } from '../../models/entity/misc/DailyTip';
import { DailyTipOccurrence } from '../../models/entity/misc/DailyTipOccurrence';
import { Department } from '../../models/entity/misc/Department';
import { DiscountCode } from '../../models/entity/misc/DiscountCode';
import { Event } from '../../models/entity/misc/Event';
import { ExamCompletion } from '../../models/entity/misc/ExamCompletion';
import { GivenAnswer } from '../../models/entity/misc/GivenAnswer';
import { GivenAnswerStreak } from '../../models/entity/misc/GivenAnswerStreak';
import { Group } from '../../models/entity/misc/Group';
import { Like } from '../../models/entity/misc/Like';
import { PersonalityTraitCategory } from '../../models/entity/misc/PersonalityTraitCategory';
import { QuestionType } from '../../models/entity/misc/QuestionType';
import { ShopItem } from '../../models/entity/misc/ShopItem';
import { ShopItemCategory } from '../../models/entity/misc/ShopItemCategory';
import { StorageFile } from '../../models/entity/misc/StorageFile';
import { Task } from '../../models/entity/misc/Task';
import { TeacherInfo } from '../../models/entity/misc/TeacherInfo';
import { TempomatAdjustmentValue } from '../../models/entity/misc/TempomatAdjustmentValue';
import { User } from '../../models/entity/misc/User';
import { UserCourseBridge } from '../../models/entity/misc/UserCourseBridge';
import { UserSessionActivity } from '../../models/entity/misc/UserSessionActivity';
import { UserVideoProgressBridge } from '../../models/entity/misc/UserVideoProgressBridge';
import { VideoCompletion } from '../../models/entity/misc/VideoCompletion';
import { VideoRating } from '../../models/entity/misc/VideoRating';
import { Module } from '../../models/entity/module/Module';
import { ModuleData } from '../../models/entity/module/ModuleData';
import { ModuleVersion } from '../../models/entity/module/ModuleVersion';
import { VideoPlaybackSample } from '../../models/entity/playback/VideoPlaybackSample';
import { VideoPlaybackSession } from '../../models/entity/playback/VideoPlaybackSession';
import { VideoSeekEvent } from '../../models/entity/playback/VideoSeekEvent';
import { PrequizAnswer } from '../../models/entity/prequiz/PrequizAnswer';
import { PrequizCompletion } from '../../models/entity/prequiz/PrequizCompletion';
import { PrequizQuestion } from '../../models/entity/prequiz/PrequizQuestion';
import { PrequizUserAnswer } from '../../models/entity/prequiz/PrequizUserAnswer';
import { Question } from '../../models/entity/question/Question';
import { QuestionData } from '../../models/entity/question/QuestionData';
import { QuestionVersion } from '../../models/entity/question/QuestionVersion';
import { Video } from '../../models/entity/video/Video';
import { VideoData } from '../../models/entity/video/VideoData';
import { VideoVersion } from '../../models/entity/video/VideoVersion';
import { ActivityStreakView } from '../../models/views/ActivityStreakView';
import { AnswerSessionGroupView } from '../../models/views/AnswerSessionGroupView';
import { AnswerSessionView } from '../../models/views/AnswerSessionView';
import { AvailableCourseView } from '../../models/views/AvailableCourseView';
import { CoinBalanceView } from '../../models/views/CoinBalanceView';
import { CoinTransactionView } from '../../models/views/CoinTransactionView';
import { CommentListView } from '../../models/views/CommentListView';
import { CorrectAnswerRatesSplitView } from '../../models/views/CorrectAnswerRatesSplitView';
import { CourseAdminContentView } from '../../models/views/CourseAdminContentView';
import { CourseAdminDetailedView } from '../../models/views/CourseAdminDetailedView';
import { CourseAdminShortView } from '../../models/views/CourseAdminShortView';
import { CourseAllItemsCompletedView } from '../../models/views/CourseAllItemsCompletedView';
import { CourseDetailsView } from '../../models/views/CourseDetailsView';
import { CourseItemEditView } from '../../models/views/CourseItemEditView';
import { CourseLearningStatsView } from '../../models/views/CourseLearningStatsView';
import { CourseModuleOverviewView } from '../../models/views/CourseModuleOverviewView';
import { CourseOverviewView } from '../../models/views/CourseOverviewView';
import { CourseProgressView } from '../../models/views/CourseProgressView';
import { CourseRatingQuestionView } from '../../models/views/CourseRatingQuestionView';
import { CourseShopItemListView } from '../../models/views/CourseShopItemListView';
import { CoursesProgressListView } from '../../models/views/CoursesProgressListView';
import { DailyTipView } from '../../models/views/DailyTipView';
import { ExamCompletedView } from '../../models/views/ExamCompletedView';
import { ExamPlayerDataView } from '../../models/views/ExamPlayerDataView';
import { ExamResultStatsView } from '../../models/views/ExamResultStatsView';
import { ExamResultView } from '../../models/views/ExamResultView';
import { ExamScoreView } from '../../models/views/ExamScoreView';
import { ExamVersionView } from '../../models/views/ExamVersionView';
import { GivenAnswerScoreView } from '../../models/views/GivenAnswerScoreView';
import { GivenAnswerView } from '../../models/views/GivenAnswerView';
import { HomePageStatsView } from '../../models/views/HomePageStatsView';
import { ImproveYourselfPageStatsView } from '../../models/views/ImproveYourselfPageStatsView';
import { LatestCourseVersionView } from '../../models/views/LatestCourseVersionView';
import { LatestExamView } from '../../models/views/LatestExamView';
import { LatestVideoView } from '../../models/views/LatestVideoView';
import { ModuleEditView } from '../../models/views/ModuleEditView';
import { ModulePlayerView } from '../../models/views/ModulePlayerView';
import { MostProductiveTimeRangeView } from '../../models/views/MostProductiveTimeRangeView';
import { PersonalityTraitCategoryView } from '../../models/views/PersonalityTraitCategoryView';
import { PersonalityTraitView } from '../../models/views/PersonalityTraitView';
import { PlaylistView } from '../../models/views/PlaylistView';
import { PractiseQuestionView } from '../../models/views/PractiseQuestionView';
import { PrequizQuestionView } from '../../models/views/PrequizQuestionView';
import { PretestResultView } from '../../models/views/PretestResultView';
import { QuestionDataView } from '../../models/views/QuestionDataView';
import { ShopItemStatefulView } from '../../models/views/ShopItemStatefulView';
import { ShopItemView } from '../../models/views/ShopItemView';
import { SignupCompletedView } from '../../models/views/SignupCompletedView';
import { SignupQuestionView } from '../../models/views/SignupQuestionView';
import { TempomatCalculationDataView } from '../../models/views/TempomatCalculationDataView';
import { UserActiveCourseView } from '../../models/views/UserActiveCourseView';
import { UserAnswerView } from '../../models/views/UserAnswerView';
import { UserCourseBridgeView } from '../../models/views/UserCourseBridgeView';
import { UserCourseCompletionCurrentView } from '../../models/views/UserCourseCompletionCurrentView';
import { UserCourseCompletionOriginalEstimationView } from '../../models/views/UserCourseCompletionOriginalEstimationView';
import { UserCourseProgressView } from '../../models/views/UserCourseProgressView';
import { AdminUserCoursesView } from '../../models/views/UserCourseStatsView';
import { UserDailyActivityChartView } from '../../models/views/UserDailyActivityChartView';
import { UserDailyCourseItemProgressView } from '../../models/views/UserDailyCourseItemProgressView';
import { UserDailyProgressView } from '../../models/views/UserDailyProgressView';
import { UserEngagementView } from '../../models/views/UserEngagementView';
import { UserExamStatsView } from '../../models/views/UserExamStatsView';
import { UserInactiveCourseView } from '../../models/views/UserInactiveCourseView';
import { UserLearningOverviewStatsView } from '../../models/views/UserLearningOverviewStatsView';
import { UserLearningPageStatsView } from '../../models/views/UserLearningPageStatsView';
import { UserPerformanceAnswerGroupView } from '../../models/views/UserPerformanceAnswerGroupView';
import { UserPerformanceComparisonStatsView } from '../../models/views/UserPerformanceComparisonStatsView';
import { UserPerformanceView } from '../../models/views/UserPerformanceView';
import { UserPractiseRecommendationView } from '../../models/views/UserPractiseRecommendationView';
import { UserReactionTimeView } from '../../models/views/UserReactionTimeView';
import { UserRoleAssignCompanyView } from '../../models/views/UserRoleAssignCompanyView';
import { UserRoleView } from '../../models/views/UserRoleView';
import { UserSessionDailyView } from '../../models/views/UserSessionDailyView';
import { UserSessionView } from '../../models/views/UserSessionView';
import { UserSpentTimeRatioView } from '../../models/views/UserSpentTimeRatioView';
import { UserVideoPractiseProgressView } from '../../models/views/UserVideoPractiseProgressView';
import { UserVideoStatsView } from '../../models/views/UserVideoStatsView';
import { UserWeeklyCourseItemProgressView } from '../../models/views/UserWeeklyCourseItemProgressView';
import { VideoCursorSecondsView } from '../../models/views/VideoCursorSecondsView';
import { VideoPlayerDataView } from '../../models/views/VideoPlayerDataView';
import { VideoVersionView } from '../../models/views/VideoVersionView';
import { XDBMSchemaService } from '../XDBManager/XDBManagerTypes';

export const createDBSchema = (): XDBMSchemaService => {

    const schema: XDBMSchemaService = {

        views: [
            GivenAnswerScoreView,
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
            PlaylistView,
            CourseDetailsView,
            AvailableCourseView,
            ExamResultView,
            CourseAdminShortView,
            QuestionDataView,
            UserCourseCompletionOriginalEstimationView,
            UserCourseCompletionCurrentView,
            UserAnswerView,
            UserDailyCourseItemProgressView,
            UserCourseProgressView,
            UserVideoPractiseProgressView,
            TempomatCalculationDataView,
            UserDailyActivityChartView,
            AnswerSessionGroupView,
            CorrectAnswerRatesSplitView,
            UserPerformanceAnswerGroupView,
            UserReactionTimeView,
            MostProductiveTimeRangeView,
            UserSessionDailyView,
            UserPerformanceView,
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
            UserPerformanceComparisonStatsView,
            UserLearningOverviewStatsView,
            AdminUserCoursesView,
            UserVideoStatsView,
            UserExamStatsView,
            UserSpentTimeRatioView,
            UserLearningPageStatsView,
            ImproveYourselfPageStatsView,
            GivenAnswerView
        ],

        functionScripts: [
            'acquire_task_lock_fn',
            'create_daily_tip_fn',
            'get_user_session_first_activity_id'
        ],

        constraints: [
            {
                tableName: 'coin_transaction',
                fileName: 'coin_transaction_valid_relation_enforce_constraint'
            },
            {
                tableName: 'activation_code',
                fileName: 'activation_code_uniqe_constraint'
            },
            {
                tableName: 'role_permission_bridge',
                fileName: 'role_permission_bridge_constraint'
            },
            {
                tableName: 'role',
                fileName: 'role_constraint'
            },
            { fileName: 'video_completion_constraints' },
            { fileName: 'exam_completion_constraints' },
            { fileName: 'prequiz_completion_constraints' },
            { fileName: 'course_completion_constraints' },
            { fileName: 'course_access_bridge_constraints' },
            { fileName: 'prequiz_constraints' },
            { fileName: 'permission_assignment_bridge_constraints' },
            { fileName: 'video_data_constraints' }
        ],

        indices: [
            {
                tableName: 'user',
                name: 'user_email_unique_index'
            },
            {
                tableName: 'user_course_bridge',
                name: 'single_current_course_bridge_unique_index'
            }
        ],

        triggers: [
            'role_assignment_validity_check_trigger',
            'exam_pretest_module_integrity_trigger',
            'permission_assignment_bridge_trigger',
            'role_permission_bridge_validity_trigger',
            'ucb_stage_trigger',
            'prequiz_completion_trigger'
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
    };

    return new XDBMSchemaService(schema);
};
