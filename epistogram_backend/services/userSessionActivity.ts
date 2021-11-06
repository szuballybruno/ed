import { UserSessionActivity } from "../models/entity/UserSessionActivity";
import { SessionActivityType } from "../models/shared_models/types/sharedTypes";
import { staticProvider } from "../staticProvider";

export const saveUserSessionActivityAsync = async (userId: number, type: SessionActivityType) => {

    await staticProvider
        .ormConnection
        .getRepository(UserSessionActivity)
        .insert({
            type,
            userId
        })
}