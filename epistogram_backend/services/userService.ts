import { User } from "../models/entities/user";
import { ExpressRequest, ExpressResponse, respondOk } from "../utilities/helpers";
import { getRequestAccessTokenMeta } from "./authentication";
import { Connection } from "./connectMongo";

export const getUserById = async (userId: string) => {

    const userFromDB = await Connection.db.collection("users").findOne({ "_id": userId })
    if (!userFromDB)
        return null;

    return userFromDB as User;
}

export const getUserByEmail = async (email: string) => {

    const userFromDB = await Connection.db.collection("users").findOne({ "userData.email": email })
    if (!userFromDB)
        return null;

    return userFromDB as User;
}

export const getCurrentUser = async (req: ExpressRequest, res: ExpressResponse) => {

    const tokenMeta = getRequestAccessTokenMeta(req);
    const user = await getUserById(tokenMeta.userId);

    respondOk(req, res, user);
}