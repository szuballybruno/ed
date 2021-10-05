import { type } from "os";

export type InvitationTokenPayload = { userId: number };

export type HTTPErrorType = "forbidden" | "internal server error" | "bad request" | "http error";

export type MiscErrorType = "passwordInvalid" | "unknown";

export type CoursePlaybackErrorType = "courseItemNotFound";

export type ErrorType = HTTPErrorType | MiscErrorType | CoursePlaybackErrorType;

export type TaskObjectiveType = "video" | "playlist" | "course" | "exam";

export type CourseItemType = "video" | "exam";

export type CourseItemStateType = "completed" | "locked" | "current" | "available";

export type CourseModeType = "beginner" | "advanced";

export type TaskPriorityType = "normal" | "important" | "urgent";

export type TaskStatusType = "assigned" | "inProgress" | "submitted" | "rejected" | "completed";

export const UserRoleEnum = {
    administratorId: 1,
    supervisorId: 2,
    userId: 3
}