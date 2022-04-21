import { Permission } from '../../models/entity/authorization/Permission';
import { Answer } from '../../models/entity/Answer';
import { AnswerGivenAnswerBridge } from '../../models/entity/AnswerGivenAnswerBridge';
import { AnswerSession } from '../../models/entity/AnswerSession';
import { Course } from '../../models/entity/Course';
import { CourseCategory } from '../../models/entity/CourseCategory';
import { DailyTip } from '../../models/entity/DailyTip';
import { DailyTipOccurrence } from '../../models/entity/DailyTipOccurrence';
import { Exam } from '../../models/entity/Exam';
import { GivenAnswer } from '../../models/entity/GivenAnswer';
import { JobTitle } from '../../models/entity/JobTitle';
import { Company } from '../../models/entity/Company';
import { Question } from '../../models/entity/Question';
import { PersonalityTraitCategory } from '../../models/entity/PersonalityTraitCategory';
import { QuestionType } from '../../models/entity/QuestionType';
import { Role } from '../../models/entity/authorization/Role';
import { RolePermissionBridge } from '../../models/entity/authorization/RolePermissionBridge';
import { StorageFile } from '../../models/entity/StorageFile';
import { Task } from '../../models/entity/Task';
import { User } from '../../models/entity/User';
import { UserCourseBridge } from '../../models/entity/UserCourseBridge';
import { UserSessionActivity } from '../../models/entity/UserSessionActivity';
import { Video } from '../../models/entity/Video';
import { VideoPlaybackSample } from '../../models/entity/VideoPlaybackSample';
import { CourseItemAllView } from '../../models/views/CourseItemAllView';
import { CourseItemStateView } from '../../models/views/CourseItemStateView';
import { CourseStateView } from '../../models/views/CourseStateView';
import { CourseView } from '../../models/views/CourseView';
import { DailyTipView } from '../../models/views/DailyTipView';
import { ExamCompletedView } from '../../models/views/ExamCompletedView';
import { PractiseQuestionView } from '../../models/views/PractiseQuestionView';
import { SignupCompletedView } from '../../models/views/SignupCompletedView';
import { VideoCompletedView } from '../../models/views/VideoCompletedView';
import { VideoProgressView } from '../../models/views/VideoProgressView';
import { ExamResultView } from '../../models/views/ExamResultView';
import { SignupQuestionView } from '../../models/views/SignupQuestionView';
import { CourseAdminShortView } from '../../models/views/CourseAdminShortView';
import { CourseAdminDetailedView } from '../../models/views/CourseAdminDetailedView';
import { CourseModule } from '../../models/entity/CourseModule';
import { UserStatsView } from '../../models/views/UserStatsView';
import { CoinTransaction } from '../../models/entity/CoinTransaction';
import { GivenAnswerStreak } from '../../models/entity/GivenAnswerStreak';
import { UserSessionDailyView } from '../../models/views/UserActivityDailyView';
import { UserSessionView } from '../../models/views/UserSessionView';
import { ActivitySession } from '../../models/entity/ActivitySession';
import { ActivityStreak } from '../../models/entity/ActivityStreak';
import { ActivityStreakView } from '../../models/views/ActivityStreakView';
import { Event } from '../../models/entity/Event';
import { CoinTransactionView } from '../../models/views/CoinTransactionView';
import { CoinBalanceView } from '../../models/views/CoinBalanceView';
import { ActivationCode } from '../../models/entity/ActivationCode';
import { UserCourseAccessBridge } from '../../models/entity/UserCourseAccessBridge';
import { ShopItem } from '../../models/entity/ShopItem';
import { ShopItemCategory } from '../../models/entity/ShopItemCategory';
import { ShopItemStatefulView } from '../../models/views/ShopItemStatefulView';
import { ShopItemView } from '../../models/views/ShopItemView';
import { DiscountCode } from '../../models/entity/DiscountCode';
import { CourseLearningStatsView } from '../../models/views/CourseLearningStatsView';
import { CourseProgressView } from '../../models/views/CourseProgressView';
import { CourseAdminContentView } from '../../models/views/CourseAdminContentView';
import { CourseDetailsView } from '../../models/views/CourseDetailsView';
import { CourseModuleOverviewView } from '../../models/views/CourseModuleOverviewView';
import { TeacherInfo } from '../../models/entity/TeacherInfo';
import { ExamView } from '../../models/views/ExamView';
import { VideoRating } from '../../models/entity/VideoRating';
import { CourseOverviewView } from '../../models/views/CourseOverviewView';
import { PersonalityTraitView } from '../../models/views/PersonalityTraitView';
import { PersonalityTraitCategoryView } from '../../models/views/PersonalityTraitCategoryView';
import { AdminUserListView } from '../../models/views/UserAdminListView';
import { PrequizQuestion } from '../../models/entity/prequiz/PrequizQuestion';
import { PrequizUserAnswer } from '../../models/entity/prequiz/PrequizUserAnswer';
import { PrequizQuestionView } from '../../models/views/PrequizQuestionView';
import { PretestResultView } from '../../models/views/PretestResultView';
import { CourseRatingGroup } from '../../models/entity/courseRating/CourseRatingGroup';
import { CourseRatingQuestion } from '../../models/entity/courseRating/CourseRatingQuestion';
import { CourseRatingQuestionUserAnswer } from '../../models/entity/courseRating/CourseRatingQuestionUserAnswer';
import { CourseRatingQuestionView } from '../../models/views/CourseRatingQuestionView';
import { PrequizAnswer } from '../../models/entity/prequiz/PrequizAnswer';
import { UserDailyProgressView } from '../../models/views/UserDailyProgressView';
import { UserVideoProgressBridge } from '../../models/entity/UserVideoProgressBridge';
import { UserExamProgressBridge } from '../../models/entity/UserExamProgressBridge';
import { AnswerSessionView } from '../../models/views/AnswerSessionView';
import { UserDailyCourseItemProgressView } from '../../models/views/UserDailyCourseItemProgressView';
import { UserActiveCourseView } from '../../models/views/UserActiveCourseView';
import { UserWeeklyCourseItemProgressView } from '../../models/views/UserWeeklyCourseItemProgressView';
import { UserCourseProgressView } from '../../models/views/UserCourseProgressView';
import { UserCourseCompletionCurrentView } from '../../models/views/UserCourseCompletionCurrentView';
import { UserCourseRecommendedItemQuotaView } from '../../models/views/UserCourseRecommendedItemQuotaView';
import { TempomatAdjustmentValue } from '../../models/entity/TempomatAdjustmentValue';
import { UserTempomatAdjustmentValueView } from '../../models/views/UserTempomatAdjustmentValueView';
import { UserCourseBridgeView } from '../../models/views/UserCourseBridgeView';
import { UserCourseCompletionOriginalEstimationView } from '../../models/views/UserCourseCompletionOriginalEstimationView';
import { CourseItemQuestionEditView } from '../../models/views/CourseItemQuestionEditView';
import { ModuleView } from '../../models/views/ModuleView';
import { RoleAssignmentBridge } from '../../models/entity/authorization/RoleAssignmentBridge';
import { CompanyOwnerBridge } from '../../models/entity/authorization/CompanyOwnerBridge';

export const dbSchema = {

    seedScripts: [
        'seed_companies',
        'seed_question_types',
        'seed_permissions',
        'seed_roles',
        'seed_signup_exam',
        'seed_job_titles',
        'seed_users',
        'seed_company_owner_bridges',
        'seed_role_assignment_bridges',
        'seed_role_permission_bridges',
        'seed_signup_questions',
        'seed_course_categories',
        'seed_courses',
        'seed_exams',
        'seed_videos',
        'seed_answer_sessions',
        'seed_questions_video',
        'seed_questions_exam',
        'seed_daily_tips',
        'seed_activation_codes',
        'seed_shop_item_categories',
        'seed_shop_items',
        'seed_discount_codes',
        'seed_prequiz_questions',
        'seed_course_rating',
        'seed_tempomat_adjustment_values'
    ],

    viewScripts: [
        'answer_session_view',
        'exam_completed_view',
        'video_progress_view',
        'course_item_view',
        'course_item_state_view',
        'course_state_view',
        'course_item_all_view',
        'course_view',
        'signup_question_view',
        'latest_given_answer_view',
        'personality_trait_view',
        'signup_completed_view',
        'user_permission_view',
        'exam_result_view',
        'practise_question_view',
        'daily_tip_view',
        'course_admin_short_view',
        'course_admin_detailed_view',
        'course_admin_content_view',
        'video_playback_sample_view',
        'user_session_view',
        'user_stats_view',
        'user_session_daily_view',
        'activity_streak_view',
        'shop_item_view',
        'shop_item_stateful_view',
        'course_length_estimation_view',
        'coin_transaction_view',
        'coin_balance_view',
        'course_questions_success_view',
        'exam_latest_success_rate_view',
        'course_spent_time_view',
        'course_item_count_view',
        'course_learning_stats_view',
        'course_progress_view',
        'course_module_overview_view',
        'course_details_view',
        'exam_view',
        'coin_acquire_per_course_view',
        'course_overview_view',
        'personality_trait_category_view',
        'course_item_completed_view',
        'user_latest_activity_view',
        'admin_user_list_view',
        'prequiz_question_view',
        'pretest_result_view',
        'course_rating_question_view',
        'user_prequiz_answers_view',
        'user_course_bridge_view',
        'user_course_completion_original_estimation_view',
        'user_course_completion_current_view',
        'user_spent_time_view',
        'user_daily_progress_view',
        'user_daily_course_item_progress_view',
        'user_active_course_view',
        'user_weekly_course_item_progress_view',
        'user_course_progress_actual',
        'user_course_progress_view',
        'user_course_recommended_item_quota_view',
        'user_tempomat_adjustment_value_view',
        'course_item_question_edit_view',
        'module_view'
    ],

    functionScripts: [
        'answer_signup_question_fn',
        'acquire_task_lock_fn',
        'answer_question_fn',
        'create_daily_tip_fn',
        'insert_coin_transaction',
        'get_user_session_first_activity_id',
        'save_user_session_activity'
    ],

    constraints: [
        {
            tableName: 'coin_transaction',
            name: 'coin_transaction_valid_relation_enforce_constraint'
        },
        {
            tableName: 'activation_code',
            name: 'activation_code_uniqe_constraint'
        }
    ],

    indices: [
        {
            tableName: 'exam',
            name: 'exam_final_type_index'
        },
        {
            tableName: 'user',
            name: 'user_email_unique_index'
        }
    ],

    viewEntities: [
        ModuleView,
        VideoCompletedView,
        ExamCompletedView,
        VideoProgressView,
        CourseItemStateView,
        CourseStateView,
        CourseItemAllView,
        CourseView,
        PersonalityTraitView,
        SignupCompletedView,
        DailyTipView,
        ExamResultView,
        SignupQuestionView,
        CourseAdminShortView,
        CourseAdminDetailedView,
        CourseAdminContentView,
        UserStatsView,
        UserSessionDailyView,
        UserSessionView,
        ActivityStreakView,
        CoinTransactionView,
        CoinBalanceView,
        ActivationCode,
        ShopItemView,
        ShopItemStatefulView,
        CourseLearningStatsView,
        CourseProgressView,
        CourseDetailsView,
        CourseModuleOverviewView,
        ExamView,
        CourseOverviewView,
        PersonalityTraitCategoryView,
        AdminUserListView,
        PrequizQuestionView,
        PretestResultView,
        CourseRatingQuestionView,
        UserDailyProgressView,
        AnswerSessionView,
        UserDailyCourseItemProgressView,
        UserActiveCourseView,
        UserWeeklyCourseItemProgressView,
        UserCourseProgressView,
        UserCourseCompletionCurrentView,
        UserCourseRecommendedItemQuotaView,
        UserTempomatAdjustmentValueView,
        UserCourseBridgeView,
        UserCourseCompletionOriginalEstimationView,
        CourseItemQuestionEditView
    ] as any[],

    entities: [
        Course,
        CourseCategory,
        Exam,
        Company,
        User,
        Video,
        Task,
        GivenAnswer,
        CompanyOwnerBridge,
        AnswerGivenAnswerBridge,
        Question,
        Answer,
        StorageFile,
        AnswerSession,
        VideoPlaybackSample,
        TeacherInfo,
        UserCourseBridge,
        PersonalityTraitCategory,
        Role,
        Permission,
        RolePermissionBridge,
        RoleAssignmentBridge,
        PractiseQuestionView,
        JobTitle,
        DailyTip,
        DailyTipOccurrence,
        QuestionType,
        UserSessionActivity,
        CourseModule,
        CoinTransaction,
        GivenAnswerStreak,
        ActivitySession,
        ActivityStreak,
        Event,
        ActivationCode,
        UserCourseAccessBridge,
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
        UserExamProgressBridge,
        TempomatAdjustmentValue
    ] as any[]
};