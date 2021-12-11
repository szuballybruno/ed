import { type } from "os";

export type InvitationTokenPayload = { userEmail: string };

export type HTTPErrorType = "forbidden" | "internal server error" | "bad request" | "http error" | "under maintenance";

export type MiscErrorType = "passwordInvalid" | "unknown";

export type CoursePlaybackErrorType = "courseItemNotFound";

export type ErrorType = HTTPErrorType | MiscErrorType | CoursePlaybackErrorType;

// tasks
export type TaskObjectiveType = "video" | "playlist" | "course" | "exam";
export type TaskPriorityType = "normal" | "important" | "urgent";
export type TaskStatusType = "assigned" | "inProgress" | "submitted" | "rejected" | "completed";

export type CourseItemType = "video" | "exam" | "module";

export type CourseItemStateType = "completed" | "locked" | "current" | "available";

export type SessionActivityType = "login" | "logout" | "generic" | "video" | "exam";

export type CourseModeType = "beginner" | "advanced";

export type CoinAcquireReasonType =
    "activity_streak_3_days" |
    "activity_streak_5_days" |
    "activity_streak_10_days" |
    "answer_streak_5" |
    "answer_streak_10" |
    "correct_answer";

export type EventType = "coin_acquire_answer_streak" | "coin_acquire_session_streak";

export type CourseVisibilityType = "public" | "private";

export const RoleIdEnum = {
    administrator: 1,
    supervisor: 2,
    user: 3
}

export const JobTitleIdEnum = {
    genericUser: 1,
    tester: 2
}

export const QuestionTypeEnum = {
    singleAnswer: 1,
    multipleAnswers: 2
}