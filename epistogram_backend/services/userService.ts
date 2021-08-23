import { User } from "../models/entities/User";
import { ExpressRequest, TypedError } from "../utilities/helpers";
import { getRequestAccessTokenMeta } from "./authentication";
import { Connection } from "./connectMongo";
import { log } from "./logger";
import { toUserDTO } from "./mappings";

export const getUserById = async (userId: string) => {

    // const userFromDB = await Connection.db.collection("users").findOne({ "_id": userId }) as User;

    const cursor = await Connection.db.collection("users").find();
    const usersFromDB = (await cursor.toArray());
    const foundUser = usersFromDB.filter((x: any) => x?._id == userId)[0] as User;

    return foundUser;
}

export const getUserDTOById = async (userId: string) => {

    const foundUser = await getUserById(userId);
    if (!foundUser)
        return null;

    return toUserDTO(foundUser);
}

export const getUserActiveTokenById = async (userId: string) => {

    //const userFromDB = await Connection.db.collection("users").findOne({ "_id": userId }) as User;

    const foundUser = await getUserById(userId);
    if (!foundUser)
        return null;

    return foundUser.userData.refreshToken;
}

export const getUserByEmail = async (email: string) => {

    const userFromDB = await Connection.db.collection("users").findOne({ "userData.email": email })
    if (!userFromDB)
        return null;

    return userFromDB as User;
}

export const getCurrentUser = async (req: ExpressRequest) => {

    const tokenMeta = getRequestAccessTokenMeta(req);
    if (!tokenMeta)
        throw new TypedError("Token meta is missing!", "forbidden");

    const currentUser = await getUserDTOById(tokenMeta.userId);
    if (!currentUser)
        throw new TypedError("User not found by id: " + tokenMeta.userId, "bad request");

    return currentUser;
}