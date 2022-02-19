import { RoleType } from "../../sharedd/types/sharedTypes";
import { UserActivityFlatView } from "../views/UserActivityFlatView";

export type AccessTokenPayload = {
    userId: number,
    userRole: RoleType,
    userActivity: UserActivityFlatView
}