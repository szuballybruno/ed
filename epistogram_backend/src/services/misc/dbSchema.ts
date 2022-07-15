import { ActivationCode } from '../../models/entity/ActivationCode';
import { ActivitySession } from '../../models/entity/ActivitySession';
import { ActivityStreak } from '../../models/entity/ActivityStreak';
import { Answer } from '../../models/entity/answer/Answer';
import { AnswerData } from '../../models/entity/answer/AnswerData';
import { AnswerVersion } from '../../models/entity/answer/AnswerVersion';
import { AnswerGivenAnswerBridge } from '../../models/entity/AnswerGivenAnswerBridge';
import { AnswerSession } from '../../models/entity/AnswerSession';
import { CompanyOwnerBridge } from '../../models/entity/authorization/CompanyOwnerBridge';
import { Permission } from '../../models/entity/authorization/Permission';
import { PermissionAssignmentBridge } from '../../models/entity/authorization/PermissionAssignmentBridge';
import { Role } from '../../models/entity/authorization/Role';
import { RoleAssignmentBridge } from '../../models/entity/authorization/RoleAssignmentBridge';
import { RolePermissionBridge } from '../../models/entity/authorization/RolePermissionBridge';
import { CoinTransaction } from '../../models/entity/CoinTransaction';
import { Comment } from '../../models/entity/Comment';
import { Company } from '../../models/entity/Company';
import { Course } from '../../models/entity/course/Course';
import { CourseData } from '../../models/entity/course/CourseData';
import { CourseVersion } from '../../models/entity/course/CourseVersion';
import { CourseAccessBridge } from '../../models/entity/CourseAccessBridge';
import { CourseCategory } from '../../models/entity/CourseCategory';
import { CourseRatingGroup } from '../../models/entity/courseRating/CourseRatingGroup';
import { CourseRatingQuestion } from '../../models/entity/courseRating/CourseRatingQuestion';
import { CourseRatingQuestionUserAnswer } from '../../models/entity/courseRating/CourseRatingQuestionUserAnswer';
import { DailyTip } from '../../models/entity/DailyTip';
import { DailyTipOccurrence } from '../../models/entity/DailyTipOccurrence';
import { DiscountCode } from '../../models/entity/DiscountCode';
import { Event } from '../../models/entity/Event';
import { Exam } from '../../models/entity/exam/Exam';
import { ExamData } from '../../models/entity/exam/ExamData';
import { ExamVersion } from '../../models/entity/exam/ExamVersion';
import { GivenAnswer } from '../../models/entity/GivenAnswer';
import { GivenAnswerStreak } from '../../models/entity/GivenAnswerStreak';
import { Group } from '../../models/entity/Group';
import { JobTitle } from '../../models/entity/JobTitle';
import { Like } from '../../models/entity/Like';
import { Module } from '../../models/entity/module/Module';
import { ModuleData } from '../../models/entity/module/ModuleData';
import { ModuleVersion } from '../../models/entity/module/ModuleVersion';
import { PersonalityTraitCategory } from '../../models/entity/PersonalityTraitCategory';
import { VideoPlaybackSample } from '../../models/entity/playback/VideoPlaybackSample';
import { VideoPlaybackSession } from '../../models/entity/playback/VideoPlaybackSession';
import { VideoSeekEvent } from '../../models/entity/playback/VideoSeekEvent';
import { PrequizAnswer } from '../../models/entity/prequiz/PrequizAnswer';
import { PrequizQuestion } from '../../models/entity/prequiz/PrequizQuestion';
import { PrequizUserAnswer } from '../../models/entity/prequiz/PrequizUserAnswer';
import { Question } from '../../models/entity/question/Question';
import { QuestionData } from '../../models/entity/question/QuestionData';
import { QuestionVersion } from '../../models/entity/question/QuestionVersion';
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
import { Video } from '../../models/entity/video/Video';
import { VideoData } from '../../models/entity/video/VideoData';
import { VideoFile } from '../../models/entity/video/VideoFile';
import { VideoVersion } from '../../models/entity/video/VideoVersion';
import { VideoRating } from '../../models/entity/VideoRating';
import { ActivityStreakView } from '../../models/views/ActivityStreakView';
import { AdminUserListView } from '../../models/views/AdminUserListView';
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
import { CourseDetailsView } from '../../models/views/CourseDetailsView';
import { CourseItemEditView } from '../../models/views/CourseItemEditView';
import { CourseItemPlaylistView } from '../../models/views/CourseItemPlaylistView';
import { CourseLearningStatsView } from '../../models/views/CourseLearningStatsView';
import { CourseModuleOverviewView } from '../../models/views/CourseModuleOverviewView';
import { CourseOverviewView } from '../../models/views/CourseOverviewView';
import { CourseProgressView } from '../../models/views/CourseProgressView';
import { CourseRatingQuestionView } from '../../models/views/CourseRatingQuestionView';
import { CourseShopItemListView } from '../../models/views/CourseShopItemListView';
import { DailyTipView } from '../../models/views/DailyTipView';
import { ExamCompletedView } from '../../models/views/ExamCompletedView';
import { ExamPlayerDataView } from '../../models/views/ExamPlayerDataView';
import { ExamResultView } from '../../models/views/ExamResultView';
import { ExamScoreView } from '../../models/views/ExamScoreView';
import { ExamVersionView } from '../../models/views/ExamVersionView';
import { GivenAnswerScoreView } from '../../models/views/GivenAnswerScoreView';
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
import { UserCourseStatsView } from '../../models/views/UserCourseStatsView';
import { UserDailyActivityChartView } from '../../models/views/UserDailyActivityChartView';
import { UserDailyCourseItemProgressView } from '../../models/views/UserDailyCourseItemProgressView';
import { UserDailyProgressView } from '../../models/views/UserDailyProgressView';
import { UserEngagementView } from '../../models/views/UserEngagementView';
import { UserExamStatsView } from '../../models/views/UserExamStatsView';
import { UserInactiveCourseView } from '../../models/views/UserInactiveCourseView';
import { UserLearningOverviewStatsView } from '../../models/views/UserLearningOverviewStatsView';
import { UserLearningPageStatsView } from '../../models/views/UserLearningPageStatsView';
import { UserPerformanceAnswerGroupView } from '../../models/views/UserPerformanceAnswerGroupView';
import { UserPerformanceView } from '../../models/views/UserPerformanceView';
import { UserPractiseRecommendationView } from '../../models/views/UserPractiseRecommendationView';
import { UserReactionTimeView } from '../../models/views/UserReactionTimeView';
import { UserRoleAssignCompanyView } from '../../models/views/UserRoleAssignCompanyView';
import { UserRoleView } from '../../models/views/UserRoleView';
import { UserSessionBlockView } from '../../models/views/UserSessionBlockView';
import { UserSessionDailyView } from '../../models/views/UserSessionDailyView';
import { UserSessionView } from '../../models/views/UserSessionView';
import { UserSpentTimeRatioView } from '../../models/views/UserSpentTimeRatioView';
import { UserVideoPractiseProgressView } from '../../models/views/UserVideoPractiseProgressView';
import { UserVideoStatsView } from '../../models/views/UserVideoStatsView';
import { UserWeeklyCourseItemProgressView } from '../../models/views/UserWeeklyCourseItemProgressView';
import { VideoCursorSecondsView } from '../../models/views/VideoCursorSecondsView';
import { VideoPlayerDataView } from '../../models/views/VideoPlayerDataView';
import { VideoVersionView } from '../../models/views/VideoVersionView';
import { getActivationCodeSeedData } from '../../sql/seed/seed_activation_codes';
import { getAnswersSeedData } from '../../sql/seed/seed_answers';
import { getAnswerDatasSeedData } from '../../sql/seed/seed_answer_datas';
import { getAnswerSessionSeedData } from '../../sql/seed/seed_answer_sessions';
import { getAnswerVersionsSeedData } from '../../sql/seed/seed_answer_versions';
import { getCommentsSeedData } from '../../sql/seed/seed_comments';
import { getCompaniesSeedData } from '../../sql/seed/seed_companies';
import { getCompanyOwnerBridgeSeedData } from '../../sql/seed/seed_company_owner_bridges';
import { getCourseSeedData } from '../../sql/seed/seed_courses';
import { getCourseAccessBridgeSeedData } from '../../sql/seed/seed_course_access_bridge';
import { getCourseCategoriesSeedData } from '../../sql/seed/seed_course_categories';
import { getCourseDatasSeedData } from '../../sql/seed/seed_course_datas';
import { getCourseRatingGroupSeedData } from '../../sql/seed/seed_course_rating_groups';
import { getCourseRatingQuestionSeedData } from '../../sql/seed/seed_course_rating_question';
import { getCourseVersionsSeedData } from '../../sql/seed/seed_course_versions';
import { getDailyTipsSeed } from '../../sql/seed/seed_daily_tips';
import { getDiscountCodesSeedData } from '../../sql/seed/seed_discount_codes';
import { getExamSeedData } from '../../sql/seed/seed_exams';
import { getExamDatasSeedData } from '../../sql/seed/seed_exam_datas';
import { getExamVersionsSeedData } from '../../sql/seed/seed_exam_versions';
import { getJobTitlesSeedData } from '../../sql/seed/seed_job_titles';
import { getModulesSeedData } from '../../sql/seed/seed_modules';
import { getModuleDatasSeedData } from '../../sql/seed/seed_module_datas';
import { getModuleVersionsSeedData } from '../../sql/seed/seed_module_versions';
import { getPermissionsSeedData } from '../../sql/seed/seed_permissions';
import { getPermissionAssignmentBridgeSeedData } from '../../sql/seed/seed_permission_assignment_bridges';
import { getPersonalityTraitCategoriesSeed } from '../../sql/seed/seed_personality_trait_categories';
import { getPrequizAnswersSeedData } from '../../sql/seed/seed_prequiz_answers';
import { getPrequizQuestionsSeedData } from '../../sql/seed/seed_prequiz_questions';
import { getPrequizUserAnswerSeedData } from '../../sql/seed/seed_prequiz_user_answer';
import { getQuestionSeedData } from '../../sql/seed/seed_questions';
import { getQuestionDatasSeedData } from '../../sql/seed/seed_question_datas';
import { getQuestionTypeSeedData } from '../../sql/seed/seed_question_types';
import { getSeedQuestionVersions } from '../../sql/seed/seed_question_versions';
import { getRolesSeedData } from '../../sql/seed/seed_roles';
import { getRoleAssignmentBridgeSeedData } from '../../sql/seed/seed_role_assignment_bridges';
import { getRolePermissionBridgeSeedData } from '../../sql/seed/seed_role_permission_bridges';
import { getShopItemSeedData } from '../../sql/seed/seed_shop_items';
import { getShopItemCategoriesSeedData } from '../../sql/seed/seed_shop_item_categories';
import { getStorageFileSeedData } from '../../sql/seed/seed_storage_file';
import { getTeacherInfoSeedData } from '../../sql/seed/seed_teacher_info';
import { getTempomatAdjustmentValueSeedData } from '../../sql/seed/seed_tempomat_adjustment_values';
import { getUserSeedData } from '../../sql/seed/seed_users';
import { getUserCourseBridgeSeedData } from '../../sql/seed/seed_user_course_bridges';
import { getUserVideoProgressBridgeSeedData } from '../../sql/seed/seed_user_video_progress_bridges';
import { getVideosSeedData } from '../../sql/seed/seed_videos';
import { getVideoDataSeedData } from '../../sql/seed/seed_video_datas';
import { getVideoFilesSeedData } from '../../sql/seed/seed_video_files';
import { getVideoVersionSeedData } from '../../sql/seed/seed_video_versions';
import { XDInjector } from '../../utilities/XDInjection/XDInjector';
import { XDBMSchemaType } from '../XDBManager/XDBManagerTypes';

export const createDBSchema = (): XDBMSchemaType => {

    const injector = new XDInjector<Function>()
        .add(getQuestionTypeSeedData, [], QuestionType)
        .add(getPermissionsSeedData, [], Permission)
        .add(getJobTitlesSeedData, [], JobTitle)
        .add(getCompaniesSeedData, [], Company)
        .add(getStorageFileSeedData, [], StorageFile)
        .add(getPersonalityTraitCategoriesSeed, [], PersonalityTraitCategory)
        .add(getQuestionDatasSeedData, [], QuestionData)
        .add(getCourseCategoriesSeedData, [], CourseCategory)
        .add(getCourseRatingGroupSeedData, [], CourseRatingGroup)
        .add(getShopItemCategoriesSeedData, [], ShopItemCategory)
        .add(getPrequizQuestionsSeedData, [], PrequizQuestion)
        .add(getExamDatasSeedData, [], ExamData)
        .add(getVideosSeedData, [], Video)
        .add(getExamSeedData, [], Exam)
        .add(getModulesSeedData, [], Module)
        .add(getCourseSeedData, [], Course)
        .add(getQuestionSeedData, [], Question)
        .add(getAnswersSeedData, [], Answer)
        .add(getActivationCodeSeedData, [getCompaniesSeedData], ActivationCode)
        .add(getRolesSeedData, [getCompaniesSeedData], Role)
        .add(getRolePermissionBridgeSeedData, [getPermissionsSeedData, getRolesSeedData], RolePermissionBridge)
        .add(getPrequizAnswersSeedData, [getPrequizQuestionsSeedData], PrequizAnswer)
        .add(getTempomatAdjustmentValueSeedData, [getPrequizAnswersSeedData], TempomatAdjustmentValue)
        .add(getShopItemSeedData, [getStorageFileSeedData, getShopItemCategoriesSeedData], ShopItem)
        .add(getDiscountCodesSeedData, [getShopItemSeedData], DiscountCode)
        .add(getCourseRatingQuestionSeedData, [getCourseRatingGroupSeedData], CourseRatingQuestion)
        .add(getUserSeedData, [getCompaniesSeedData, getJobTitlesSeedData], User)
        .add(getCompanyOwnerBridgeSeedData, [getUserSeedData, getCompaniesSeedData], CompanyOwnerBridge)
        .add(getTeacherInfoSeedData, [getUserSeedData], TeacherInfo)
        .add(getAnswerSessionSeedData, [getUserSeedData], AnswerSession)
        .add(getCourseDatasSeedData, [getCourseCategoriesSeedData, getStorageFileSeedData, getUserSeedData], CourseData)
        .add(getModuleDatasSeedData, [getCourseDatasSeedData], ModuleData)
        .add(getDailyTipsSeed, [getStorageFileSeedData, getPersonalityTraitCategoriesSeed], DailyTip)
        .add(getCourseVersionsSeedData, [getCourseDatasSeedData, getCourseSeedData], CourseVersion)
        .add(getVideoFilesSeedData, [getStorageFileSeedData], VideoFile)
        .add(getVideoDataSeedData, [getVideoFilesSeedData], VideoData)
        .add(getModuleVersionsSeedData, [getCourseVersionsSeedData, getModuleDatasSeedData, getModulesSeedData], ModuleVersion)
        .add(getVideoVersionSeedData, [getVideoDataSeedData, getVideosSeedData, getModuleVersionsSeedData], VideoVersion)
        .add(getExamVersionsSeedData, [getModuleVersionsSeedData, getExamDatasSeedData, getExamSeedData], ExamVersion)
        .add(getCommentsSeedData, [getVideoVersionSeedData, getUserSeedData], Comment)
        .add(getSeedQuestionVersions, [getQuestionSeedData, getQuestionDatasSeedData, getExamVersionsSeedData, getVideoVersionSeedData, getPersonalityTraitCategoriesSeed], QuestionVersion)
        .add(getAnswerDatasSeedData, [getQuestionDatasSeedData], AnswerData)
        .add(getAnswerVersionsSeedData, [getAnswersSeedData, getAnswerDatasSeedData, getSeedQuestionVersions], AnswerVersion)
        .add(getCourseAccessBridgeSeedData, [getCompaniesSeedData, getCourseSeedData], CourseAccessBridge)
        .add(getUserCourseBridgeSeedData, [getUserSeedData, getCourseSeedData, getVideosSeedData], UserCourseBridge)
        .add(getUserVideoProgressBridgeSeedData, [getUserSeedData, getVideoVersionSeedData, getVideoFilesSeedData], UserVideoProgressBridge)
        .add(getRoleAssignmentBridgeSeedData, [getCompaniesSeedData, getRolesSeedData, getUserSeedData], RoleAssignmentBridge)
        .add(getPermissionAssignmentBridgeSeedData, [getCompaniesSeedData, getCourseSeedData, getPermissionsSeedData, getUserSeedData], PermissionAssignmentBridge)
        .add(getPrequizUserAnswerSeedData, [getUserSeedData, getCourseSeedData, getPrequizQuestionsSeedData, getPrequizAnswersSeedData], PrequizUserAnswer)
        .build();

    const seedScripts = injector
        .getFunctions()
        .map((func): [Function, any] => {

            return [func.props, injector.getInstance(func.fn)];
        });

    const schema: XDBMSchemaType = {
        seedScripts,

        views: [
            ['basic', 'given_answer_score_view', GivenAnswerScoreView],
            ['basic', 'activity_streak_view', ActivityStreakView],
            ['basic', 'answer_session_view', AnswerSessionView],
            ['basic', 'coin_acquire_per_course_view'],
            ['basic', 'coin_balance_view', CoinBalanceView],
            ['basic', 'comment_list_view', CommentListView],
            ['basic', 'company_permission_view'],
            ['basic', 'course_item_completed_view'],
            ['basic', 'course_item_view'],
            ['basic', 'course_module_overview_view', CourseModuleOverviewView],
            ['basic', 'course_questions_success_view'],
            ['basic', 'course_rating_question_view', CourseRatingQuestionView],
            ['basic', 'latest_course_version_view', LatestCourseVersionView],
            ['basic', 'latest_exam_view', LatestExamView],
            ['basic', 'latest_video_view', LatestVideoView],
            ['basic', 'latest_given_answer_view'],
            ['basic', 'module_player_view', ModulePlayerView],
            ['basic', 'module_edit_view', ModuleEditView],
            ['basic', 'personality_trait_category_view', PersonalityTraitCategoryView],
            ['basic', 'personality_trait_view', PersonalityTraitView],
            ['basic', 'practise_question_view', PractiseQuestionView],
            ['basic', 'prequiz_question_view', PrequizQuestionView],
            ['basic', 'shop_item_stateful_view', ShopItemStatefulView],
            ['basic', 'shop_item_view', ShopItemView],
            ['basic', 'signup_question_view', SignupQuestionView],
            ['basic', 'user_active_course_view', UserActiveCourseView],
            ['basic', 'user_assigned_auth_item_view'],
            ['basic', 'user_course_bridge_view', UserCourseBridgeView],
            ['basic', 'user_practise_recommendation_view', UserPractiseRecommendationView],
            ['basic', 'user_prequiz_answers_view'],
            ['basic', 'user_role_view', UserRoleView],
            ['basic', 'user_session_view', UserSessionView],
            ['basic', 'video_cursor_seconds_view', VideoCursorSecondsView],
            ['basic', 'video_playback_sample_view'],
            ['basic', 'video_version_view', VideoVersionView],
            ['basic', 'exam_version_view', ExamVersionView],
            ['basic', 'course_shop_item_list_view', CourseShopItemListView],
            ['common', 'exam_score_view', ExamScoreView],
            ['common', 'video_player_data_view', VideoPlayerDataView],
            ['common', 'user_permission_view'], // 6 | company_permission_view
            ['common', 'answer_session_evaluation_view'], // 3 | 1 answer_session_view
            ['common', 'exam_completed_view', ExamCompletedView], // 6 | 1 answer_session_evaluation_view
            ['common', 'course_item_playlist_view', CourseItemPlaylistView], // 2 | latest_course_version_view, course_item_view, user_practise_recommendation_view
            ['common', 'available_course_view', AvailableCourseView], // 2
            ['common', 'exam_result_view', ExamResultView], // 1
            ['common', 'course_admin_short_view', CourseAdminShortView], // 1 course_admin_content_view
            ['common', 'course_length_estimation_view'], // 1 user_course_completion_original_estimation_view
            ['common', 'exam_latest_success_rate_view'], // 1 course_learning_stats_view
            ['common', 'course_spent_time_view'], // 2 course_learning_stats_view, user_spent_time_ratio_viewí
            ['common', 'course_item_count_view'], // 6
            ['common', 'question_data_view', QuestionDataView], // 0 | latest_question_view
            ['common', 'user_course_completion_original_estimation_view', UserCourseCompletionOriginalEstimationView], // 1 user_course_stats_view
            ['common', 'user_course_completion_current_view', UserCourseCompletionCurrentView], // 2 user_course_progress_view, user_course_recommended_item_quota_view
            ['common', 'user_answer_view', UserAnswerView], // 2 user_performance_answer_group_view, user_video_stats_view
            ['common', 'user_session_block_view', UserSessionBlockView],  // 1 user_learning_overview_stats_view
            ['common', 'user_daily_course_item_progress_view', UserDailyCourseItemProgressView], // 1 user_weekly_course_item_progress_view
            ['common', 'user_course_progress_actual'], // 1 user_course_progress_view
            ['common', 'user_course_progress_view', UserCourseProgressView], // 1 user_course_stats_view
            ['common', 'user_video_practise_progress_view', UserVideoPractiseProgressView], // 1 user_video_practise_progress_view
            ['common', 'tempomat_calculation_data_view', TempomatCalculationDataView],
            ['common', 'user_daily_activity_chart_view', UserDailyActivityChartView],
            ['common', 'answer_session_group_view', AnswerSessionGroupView],
            ['', 'correct_answer_rates_split_view', CorrectAnswerRatesSplitView],
            ['', 'user_performance_answer_group_view', UserPerformanceAnswerGroupView], // 2 user_reaction_time_view, user_performance_view
            ['', 'user_reaction_time_view', UserReactionTimeView], // 1 user_learning_overview_stats_view
            ['', 'most_productive_time_range_view', MostProductiveTimeRangeView],
            ['', 'user_session_daily_view', UserSessionDailyView],
            ['', 'user_performance_view', UserPerformanceView],
            ['', 'signup_completed_view', SignupCompletedView],
            ['', 'daily_tip_view', DailyTipView],
            ['', 'course_admin_detailed_view', CourseAdminDetailedView],
            ['', 'course_admin_content_view', CourseAdminContentView],
            ['', 'coin_transaction_view', CoinTransactionView],
            ['', 'course_item_edit_view', CourseItemEditView],
            ['', 'course_details_view', CourseDetailsView],
            ['', 'exam_player_data_view', ExamPlayerDataView],
            ['', 'pretest_result_view', PretestResultView],
            ['', 'user_daily_progress_view', UserDailyProgressView],
            ['', 'user_weekly_course_item_progress_view', UserWeeklyCourseItemProgressView],
            ['', 'role_list_view'],
            ['', 'company_view'],
            ['', 'assignable_permission_view'],
            ['', 'assignable_role_view'],
            ['', 'user_role_assign_company_view', UserRoleAssignCompanyView],
            ['stats', 'course_learning_stats_view', CourseLearningStatsView],
            ['common', 'course_progress_view', CourseProgressView], // 2 user_inactive_course_view, user_course_stats_view
            ['', 'course_overview_view', CourseOverviewView],
            ['', 'user_inactive_course_view', UserInactiveCourseView],
            ['stats', 'home_page_stats_view', HomePageStatsView],
            ['stats', 'user_engagement_view', UserEngagementView],
            ['stats', 'user_learning_overview_stats_view', UserLearningOverviewStatsView],
            ['stats', 'user_course_stats_view', UserCourseStatsView],
            ['stats', 'user_video_stats_view', UserVideoStatsView],
            ['stats', 'user_exam_stats_view', UserExamStatsView],
            ['stats', 'user_spent_time_ratio_view', UserSpentTimeRatioView],
            ['stats', 'user_learning_page_stats_view', UserLearningPageStatsView],
            ['stats', 'improve_yourself_page_stats_view', ImproveYourselfPageStatsView],
            ['', 'user_latest_activity_view'],
            ['', 'admin_user_list_view', AdminUserListView]
        ],

        functionScripts: [
            'answer_signup_question_fn',
            'acquire_task_lock_fn',
            'answer_question_fn',
            'create_daily_tip_fn',
            'insert_coin_transaction',
            'get_user_session_first_activity_id'
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
            },
            {
                tableName: 'role',
                name: 'role_constraint'
            }
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
            'permission_assignment_validity_check_trigger',
            'role_permission_bridge_validity_trigger'
        ],

        entities: [
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
            VideoFile,
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
            JobTitle,
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
            UserExamProgressBridge,
            TempomatAdjustmentValue
        ],
    };

    return new XDBMSchemaType(schema);
};