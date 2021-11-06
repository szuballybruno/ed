import { Activity } from "../../models/entity/Activity";
import { Answer } from "../../models/entity/Answer";
import { AnswerSession } from "../../models/entity/AnswerSession";
import { Course } from "../../models/entity/Course";
import { CourseCategory } from "../../models/entity/CourseCategory";
import { DailyTip } from "../../models/entity/DailyTip";
import { DailyTipOccurrence } from "../../models/entity/DailyTipOccurrence";
import { Exam } from "../../models/entity/Exam";
import { JobTitle } from "../../models/entity/JobTitle";
import { Organization } from "../../models/entity/Organization";
import { PersonalityCategoryDescription } from "../../models/entity/PersonalityCategoryDescription";
import { Question } from "../../models/entity/Question";
import { QuestionAnswer } from "../../models/entity/QuestionAnswer";
import { QuestionCategory } from "../../models/entity/QuestionCategory";
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
import { UserExamAnswerSessionView } from "../../models/views/UserExamAnswerSessionView";
import { UserSignupCompletedView } from "../../models/views/UserSignupCompletedView";
import { VideoCompletedView } from "../../models/views/VideoCompletedView";
import { VideoProgressView } from "../../models/views/VideoProgressView";

// asdasdasd
// adsasdasds
export const dbSchema = {

    viewScripts: [
        "video_completed_view",
        "exam_completed_view",
        "user_exam_answer_session_view",
        "video_progress_view",
        "course_item_view",
        "course_item_state_view",
        "course_state_view",
        "course_item_all_view",
        "course_view",
        "exam_session_answers_view",
        "signup_answers_view",
        "user_signup_completed_view",
        "user_activity_view",
        "user_activity_flat_view",
        "practise_question_view",
        "daily_tip_view",
        "user_session_view"
    ],

    functionScripts: [
        "answer_signup_question_fn",
        "answer_question_fn",
        "create_daily_tip_fn"
    ],

    viewEntities: [
        VideoCompletedView,
        ExamCompletedView,
        UserExamAnswerSessionView,
        VideoProgressView,
        CourseItemView,
        CourseItemStateView,
        CourseStateView,
        CourseItemAllView,
        CourseView,
        SignupAnswersView,
        UserActivityFlatView,
        UserSignupCompletedView,
        DailyTipView
    ],

    entities: [
        Course,
        CourseCategory,
        Exam,
        Organization,
        User,
        Video,
        Task,
        QuestionAnswer,
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
        UserSessionActivity
    ]
}