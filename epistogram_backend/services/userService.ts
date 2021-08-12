import { User } from "../models/entities/user";
import { Connection } from "./connectMongo";

export const getUserById = async (userId: string) => {

    const userFromDB = await Connection.db.collection("users").findOne({ "_id": userId })
    if (!userFromDB)
        return null;

    return new User(
        userFromDB._id,
        userFromDB.userData.organizationId,
        userFromDB.userData.refreshToken);
}