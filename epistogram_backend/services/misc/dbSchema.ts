import { Activity } from "../../models/entity/Activity";
import { Answer } from "../../models/entity/Answer";
import { AnswerGivenAnswerBridge } from "../../models/entity/AnswerGivenAnswerBridge";
import { AnswerSession } from "../../models/entity/AnswerSession";
import { Course } from "../../models/entity/Course";
import { CourseCategory } from "../../models/entity/CourseCategory";
import { DailyTip } from "../../models/entity/DailyTip";
import { DailyTipOccurrence } from "../../models/entity/DailyTipOccurrence";
import { Exam } from "../../models/entity/Exam";
import { GivenAnswer } from "../../models/entity/GivenAnswer";
import { JobTitle } from "../../models/entity/JobTitle";
import { Organization } from "../../models/entity/Organization";
import { PersonalityCategoryDescription } from "../../models/entity/PersonalityCategoryDescription";
import { Question } from "../../models/entity/Question";
import { QuestionCategory } from "../../models/entity/QuestionCategory";
import { QuestionType } from "../../models/entity/QuestionType";
import { Role } from "../../models/entity/Role";
import { RoleActivityBridge } from "../../models/entity/RoleActivityBridge";
import { StorageFile } from "../../models/entity/StorageFile";
import { Task } from "../../models/entity/Task";
import { TestChild } from "../../models/entity/TestChild";
import { TestParent } from "../../models/entity/TestParent";
import { TestSubChild } from "../../models/entity/TestSubChild";
import { User } from "../../models/entity/User";
import { UserCourseBridge } from "../../models/entity/UserCourseBridge";
import { UserSessionActivity } from "../../models/entity/UserSessionActivity";
import { Video } from "../../models/entity/Video";
import { VideoPlaybackData } from "../../models/entity/VideoPlaybackData";
import { VideoPlaybackSample } from "../../models/entity/VideoPlaybackSample";
import { CourseItemAllView } from "../../models/views/CourseItemAllView";
import { CourseItemStateView } from "../../models/views/CourseItemStateView";
import { CourseItemView } from "../../models/views/CourseItemView";
import { CourseStateView } from "../../models/views/CourseStateView";
import { CourseView } from "../../models/views/CourseView";
import { DailyTipView } from "../../models/views/DailyTipView";
import { ExamCompletedView } from "../../models/views/ExamCompletedView";
import { PractiseQuestionView } from "../../models/views/PractiseQuestionView";
import { SignupAnswersView } from "../../models/views/SignupAnswersView";
import { UserActivityFlatView } from "../../models/views/UserActivityFlatView";
import { ExamSessionSuccessView } from "../../models/views/ExamSessionSuccessView";
import { SignupCompletedView } from "../../models/views/SignupCompletedView";
import { VideoCompletedView } from "../../models/views/VideoCompletedView";
import { VideoProgressView } from "../../models/views/VideoProgressView";
import { ExamResultView } from "../../models/views/ExamResultView";
import { SignupQuestionView } from "../../models/views/SignupQuestionView";
import { CourseAdminShortView } from "../../models/views/CourseAdminShortView";

export const dbSchema = {

    viewScripts: [
        "video_completed_view",
        "exam_session_success_view",
        "exam_completed_view",
        "video_progress_view",
        "course_item_view",
        "course_item_state_view",
        "course_state_view",
        "course_item_all_view",
        "course_view",
        "signup_question_view",
        "signup_answers_view",
        "signup_completed_view",
        "user_activity_view",
        "user_activity_flat_view",
        "exam_result_view",
        "practise_question_view",
        "daily_tip_view",
        "user_session_activity_view",
        "user_session_view",
        "course_admin_short_view"
    ],

    functionScripts: [
        "answer_signup_question_fn",
        "answer_question_fn",
        "create_daily_tip_fn"
    ],

    viewEntities: [
        VideoCompletedView,
        ExamCompletedView,
        ExamSessionSuccessView,
        VideoProgressView,
        CourseItemView,
        CourseItemStateView,
        CourseStateView,
        CourseItemAllView,
        CourseView,
        SignupAnswersView,
        UserActivityFlatView,
        SignupCompletedView,
        DailyTipView,
        ExamResultView,
        SignupQuestionView,
        CourseAdminShortView
    ],

    entities: [
        Course,
        CourseCategory,
        Exam,
        Organization,
        User,
        Video,
        Task,
        GivenAnswer,
        AnswerGivenAnswerBridge,
        Question,
        Answer,
        TestChild,
        TestParent,
        TestSubChild,
        StorageFile,
        AnswerSession,
        VideoPlaybackSample,
        VideoPlaybackData,
        UserCourseBridge,
        QuestionCategory,
        Role,
        Activity,
        RoleActivityBridge,
        PersonalityCategoryDescription,
        PractiseQuestionView,
        JobTitle,
        DailyTip,
        DailyTipOccurrence,
        QuestionType,
        UserSessionActivity
    ]
}