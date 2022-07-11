import { Id } from "../../shared/types/versionId";
import { User } from "../entity/User";

export type AccessTokenPayload = {
    userId: Id<User>;
}