
export type IdType = string;

export type InvitationTokenPayload = { userId: IdType };

export type HTTPErrorType = "forbidden" | "internal server error" | "bad request" | "http error";

export type MiscErrorType = "passwordInvalid" | "unknown";

export type ErrorType = HTTPErrorType | MiscErrorType;

export type TaskObjectiveType = "practise" | "continueVideo" | "exam";