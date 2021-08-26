
export type IdType = string;

export type RoleType = "admin" | "notadmin";

export type InvitationTokenPayload = { userId: number };

export type HTTPErrorType = "forbidden" | "internal server error" | "bad request" | "http error";

export type MiscErrorType = "passwordInvalid" | "unknown";

export type VideoErrorType = "videoNotFound";

export type ErrorType = HTTPErrorType | MiscErrorType | VideoErrorType;

export type TaskObjectiveType = "practise" | "continueVideo" | "exam";

export type CourseItemType = "video" | "exam";