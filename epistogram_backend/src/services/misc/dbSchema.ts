import { ActivationCode } from '../../models/entity/ActivationCode';
import { ActivitySession } from '../../models/entity/ActivitySession';
import { ActivityStreak } from '../../models/entity/ActivityStreak';
import { Answer } from '../../models/entity/Answer';
import { AnswerGivenAnswerBridge } from '../../models/entity/AnswerGivenAnswerBridge';
import { AnswerSession } from '../../models/entity/AnswerSession';
import { CompanyOwnerBridge } from '../../models/entity/authorization/CompanyOwnerBridge';
import { Permission } from '../../models/entity/authorization/Permission';
import { PermissionAssignmentBridge } from '../../models/entity/authorization/PermissionAssignmentBridge';
import { Role } from '../../models/entity/authorization/Role';
import { RoleAssignmentBridge } from '../../models/entity/authorization/RoleAssignmentBridge';
import { RolePermissionBridge } from '../../models/entity/authorization/RolePermissionBridge';
import { CoinTransaction } from '../../models/entity/CoinTransaction';
import { Company } from '../../models/entity/Company';
import { Course } from '../../models/entity/Course';
import { CourseAccessBridge } from '../../models/entity/CourseAccessBridge';
import { CourseCategory } from '../../models/entity/CourseCategory';
import { CourseModule } from '../../models/entity/CourseModule';
import { CourseRatingGroup } from '../../models/entity/courseRating/CourseRatingGroup';
import { CourseRatingQuestion } from '../../models/entity/courseRating/CourseRatingQuestion';
import { CourseRatingQuestionUserAnswer } from '../../models/entity/courseRating/CourseRatingQuestionUserAnswer';
import { DailyTip } from '../../models/entity/DailyTip';
import { DailyTipOccurrence } from '../../models/entity/DailyTipOccurrence';
import { DiscountCode } from '../../models/entity/DiscountCode';
import { Event } from '../../models/entity/Event';
import { Exam } from '../../models/entity/Exam';
import { GivenAnswer } from '../../models/entity/GivenAnswer';
import { GivenAnswerStreak } from '../../models/entity/GivenAnswerStreak';
import { Group } from '../../models/entity/Group';
import { JobTitle } from '../../models/entity/JobTitle';
import { PersonalityTraitCategory } from '../../models/entity/PersonalityTraitCategory';
import { PrequizAnswer } from '../../models/entity/prequiz/PrequizAnswer';
import { PrequizQuestion } from '../../models/entity/prequiz/PrequizQuestion';
import { PrequizUserAnswer } from '../../models/entity/prequiz/PrequizUserAnswer';
import { Question } from '../../models/entity/Question';
import { QuestionType } from '../../models/entity/QuestionType';
import { ShopItem } from '../../models/entity/ShopItem';
import { ShopItemCategory } from '../../models/entity/ShopItemCategory';
import { StorageFile } from '../../models/entity/StorageFile';
import { Task } from '../../models/entity/Task';
import { TeacherInfo } from '../../models/entity/TeacherInfo';
import { TempomatAdjustmentValue } from '../../models/entity/TempomatAdjustmentValue';
import { User } from '../../models/entity/User';
import { UserCourseBridge } from '../../models/entity/UserCourseBridge';
import { UserExamProgressBridge } from '../../models/entity/UserExamProgressBridge';
import { UserSessionActivity } from '../../models/entity/UserSessionActivity';
import { UserVideoProgressBridge } from '../../models/entity/UserVideoProgressBridge';
import { Video } from '../../models/entity/Video';
import { VideoPlaybackSample } from '../../models/entity/VideoPlaybackSample';
import { VideoRating } from '../../models/entity/VideoRating';
import { ActivityStreakView } from '../../models/views/ActivityStreakView';
import { AnswerSessionView } from '../../models/views/AnswerSessionView';
import { AvailableCourseView } from '../../models/views/AvailableCourseView';
import { CoinBalanceView } from '../../models/views/CoinBalanceView';
import { CoinTransactionView } from '../../models/views/CoinTransactionView';
import { CourseAdminContentView } from '../../models/views/CourseAdminContentView';
import { CourseAdminDetailedView } from '../../models/views/CourseAdminDetailedView';
import { CourseAdminShortView } from '../../models/views/CourseAdminShortView';
import { CourseDetailsView } from '../../models/views/CourseDetailsView';
import { CourseItemAllView } from '../../models/views/CourseItemAllView';
import { CourseItemQuestionEditView } from '../../models/views/CourseItemQuestionEditView';
import { CourseItemStateView } from '../../models/views/CourseItemStateView';
import { CourseLearningStatsView } from '../../models/views/CourseLearningStatsView';
import { CourseModuleOverviewView } from '../../models/views/CourseModuleOverviewView';
import { CourseOverviewView } from '../../models/views/CourseOverviewView';
import { CourseProgressView } from '../../models/views/CourseProgressView';
import { CourseRatingQuestionView } from '../../models/views/CourseRatingQuestionView';
import { CourseStateView } from '../../models/views/CourseStateView';
import { DailyTipView } from '../../models/views/DailyTipView';
import { ExamCompletedView } from '../../models/views/ExamCompletedView';
import { ExamResultView } from '../../models/views/ExamResultView';
import { ExamView } from '../../models/views/ExamView';
import { ModuleView } from '../../models/views/ModuleView';
import { PersonalityTraitCategoryView } from '../../models/views/PersonalityTraitCategoryView';
import { PersonalityTraitView } from '../../models/views/PersonalityTraitView';
import { PractiseQuestionView } from '../../models/views/PractiseQuestionView';
import { PrequizQuestionView } from '../../models/views/PrequizQuestionView';
import { PretestResultView } from '../../models/views/PretestResultView';
import { ShopItemStatefulView } from '../../models/views/ShopItemStatefulView';
import { ShopItemView } from '../../models/views/ShopItemView';
import { SignupCompletedView } from '../../models/views/SignupCompletedView';
import { SignupQuestionView } from '../../models/views/SignupQuestionView';
import { UserActiveCourseView } from '../../models/views/UserActiveCourseView';
import { UserSessionDailyView } from '../../models/views/UserActivityDailyView';
import { AdminUserListView } from '../../models/views/UserAdminListView';
import { UserCourseBridgeView } from '../../models/views/UserCourseBridgeView';
import { UserCourseCompletionCurrentView } from '../../models/views/UserCourseCompletionCurrentView';
import { UserCourseCompletionOriginalEstimationView } from '../../models/views/UserCourseCompletionOriginalEstimationView';
import { UserCourseProgressView } from '../../models/views/UserCourseProgressView';
import { UserCourseRecommendedItemQuotaView } from '../../models/views/UserCourseRecommendedItemQuotaView';
import { UserDailyCourseItemProgressView } from '../../models/views/UserDailyCourseItemProgressView';
import { UserDailyProgressView } from '../../models/views/UserDailyProgressView';
import { UserSessionView } from '../../models/views/UserSessionView';
import { UserStatsView } from '../../models/views/UserStatsView';
import { UserTempomatAdjustmentValueView } from '../../models/views/UserTempomatAdjustmentValueView';
import { UserWeeklyCourseItemProgressView } from '../../models/views/UserWeeklyCourseItemProgressView';
import { VideoProgressView } from '../../models/views/VideoProgressView';
import seed_companies from '../../sql/seed/seed_companies';
import seed_company_owner_bridges from '../../sql/seed/seed_company_owner_bridges';
import seed_course_access_bridge from '../../sql/seed/seed_course_access_bridge';
import seed_job_titles from '../../sql/seed/seed_job_titles';
import { permissionList } from '../../sql/seed/seed_permissions';
import seed_permission_assignment_bridges from '../../sql/seed/seed_permission_assignment_bridges';
import seed_question_types from '../../sql/seed/seed_question_types';
import { roleList } from '../../sql/seed/seed_roles';
import { roleAssignmentBridgeSeedList } from '../../sql/seed/seed_role_assignment_bridges';
import { rolePermissionList } from '../../sql/seed/seed_role_permission_bridges';
import { XDBMSchemaType } from '../XDBManager/XDBManagerTypes';

export const dbSchema: XDBMSchemaType = {

    seedScripts: [
        [Company, seed_companies],
        [QuestionType, seed_question_types],
        [Permission, permissionList],
        'seed_signup_exam',
        [JobTitle, seed_job_titles],
        'seed_users',
        [Role, roleList],
        [CompanyOwnerBridge, seed_company_owner_bridges],
        [RolePermissionBridge, rolePermissionList],
        'seed_signup_questions',
        'seed_course_categories',
        'seed_courses',
        [PermissionAssignmentBridge, seed_permission_assignment_bridges],
        [RoleAssignmentBridge, roleAssignmentBridgeSeedList],
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
        'seed_tempomat_adjustment_values',
        [CourseAccessBridge, seed_course_access_bridge]
    ],

    views: [
        ['answer_session_view', AnswerSessionView],
        ['exam_completed_view', ExamCompletedView],
        ['video_progress_view', VideoProgressView],
        ['course_item_view'],
        ['course_item_state_view', CourseItemStateView],
        ['course_state_view', CourseStateView],
        ['course_item_all_view', CourseItemAllView],
        ['signup_question_view', SignupQuestionView],
        ['user_roles_view'],
        ['latest_given_answer_view'],
        ['personality_trait_view', PersonalityTraitView],
        ['signup_completed_view', SignupCompletedView],
        ['company_permission_view'],
        ['user_permission_view'],
        ['available_course_view', AvailableCourseView],
        ['exam_result_view', ExamResultView],
        ['practise_question_view', PractiseQuestionView],
        ['daily_tip_view', DailyTipView],
        ['course_admin_short_view', CourseAdminShortView],
        ['course_admin_detailed_view', CourseAdminDetailedView],
        ['course_admin_content_view', CourseAdminContentView],
        ['video_playback_sample_view'],
        ['user_session_view', UserSessionView],
        ['user_stats_view', UserStatsView],
        ['user_session_daily_view', UserSessionDailyView],
        ['activity_streak_view', ActivityStreakView],
        ['shop_item_view', ShopItemView],
        ['shop_item_stateful_view', ShopItemStatefulView],
        ['course_length_estimation_view'],
        ['coin_transaction_view', CoinTransactionView],
        ['coin_balance_view', CoinBalanceView],
        ['course_questions_success_view'],
        ['exam_latest_success_rate_view'],
        ['course_spent_time_view'],
        ['course_item_count_view'],
        ['course_learning_stats_view', CourseLearningStatsView],
        ['course_progress_view', CourseProgressView],
        ['course_module_overview_view', CourseModuleOverviewView],
        ['course_details_view', CourseDetailsView],
        ['exam_view', ExamView],
        ['coin_acquire_per_course_view'],
        ['course_overview_view', CourseOverviewView],
        ['personality_trait_category_view', PersonalityTraitCategoryView],
        ['course_item_completed_view'],
        ['user_latest_activity_view'],
        ['admin_user_list_view', AdminUserListView],
        ['prequiz_question_view', PrequizQuestionView],
        ['pretest_result_view', PretestResultView],
        ['course_rating_question_view', CourseRatingQuestionView],
        ['user_prequiz_answers_view'],
        ['user_course_bridge_view', UserCourseBridgeView],
        ['user_course_completion_original_estimation_view', UserCourseCompletionOriginalEstimationView],
        ['user_course_completion_current_view', UserCourseCompletionCurrentView],
        ['user_spent_time_view'],
        ['user_daily_progress_view', UserDailyProgressView],
        ['user_daily_course_item_progress_view', UserDailyCourseItemProgressView],
        ['user_active_course_view', UserActiveCourseView],
        ['user_weekly_course_item_progress_view', UserWeeklyCourseItemProgressView],
        ['user_course_progress_actual'],
        ['user_course_progress_view', UserCourseProgressView],
        ['user_course_recommended_item_quota_view', UserCourseRecommendedItemQuotaView],
        ['user_tempomat_adjustment_value_view', UserTempomatAdjustmentValueView],
        ['course_item_question_edit_view', CourseItemQuestionEditView],
        ['module_view', ModuleView],
        ['role_list_view'],
        ['company_view'],
        ['assignable_permission_view'],
        ['assignable_role_view'],
        ['user_assigned_auth_item_view']
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
        },
        {
            tableName: 'role_permission_bridge',
            name: 'role_permission_bridge_constraint'
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

    triggers: [
        'role_assignment_validity_check_trigger',
        'permission_assignment_validity_check_trigger'
    ],

    entities: [
        ActivationCode,
        Course,
        Group,
        CourseCategory,
        Exam,
        Company,
        User,
        Video,
        PermissionAssignmentBridge,
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
        UserExamProgressBridge,
        TempomatAdjustmentValue
    ],
};