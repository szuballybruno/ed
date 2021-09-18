import { User } from "../models/entity/User"
import { staticProvider } from "../staticProvider"

export const deleteUserAsync = async (userId: number, deletedUserId: number) => {

    // TODO permissions

    return await staticProvider
        .ormConnection
        .getRepository(User)
        .softDelete(deletedUserId);
}