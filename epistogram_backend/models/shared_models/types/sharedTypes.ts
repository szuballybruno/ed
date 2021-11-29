import { type } from "os";

export type InvitationTokenPayload = { userId: number };

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

export type CoinAcquireReasonType = "activity_streak_3_days" | "activity_streak_5_days" | "activity_streak_10_days";

export type EventType = "coin_acquire";

export const UserRoleEnum = {
    administratorId: 1,
    supervisorId: 2,
    userId: 3
}

export const QuestionTypeEnum = {
    singleAnswer: 1,
    multipleAnswers: 2
}