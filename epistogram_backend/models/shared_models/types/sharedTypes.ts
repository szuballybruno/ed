
export type RoleType = "admin" | "notadmin";

export type InvitationTokenPayload = { userId: number };

export type HTTPErrorType = "forbidden" | "internal server error" | "bad request" | "http error";

export type MiscErrorType = "passwordInvalid" | "unknown";

export type CoursePlaybackErrorType = "courseItemNotFound";

export type ErrorType = HTTPErrorType | MiscErrorType | CoursePlaybackErrorType;

export type TaskObjectiveType = "practise" | "continueVideo" | "exam";

export type CourseItemType = "video" | "exam";