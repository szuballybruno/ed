import { User } from "../models/entities/user";
import { UserDTO } from "../models/shared_models/UserDTO";
import { ExpressRequest, ExpressResponse, respondForbidden, respondOk } from "../utilities/helpers";
import { getRequestAccessTokenMeta } from "./authentication";
import { Connection } from "./connectMongo";

export const convertToUserDTO = (user: User) => new UserDTO(user.userId, user.userData.organizationId);

export const getUserDTOById = async (userId: string) => {

    const userFromDB = await Connection.db.collection("users").findOne({ "_id": userId }) as User;
    if (!userFromDB)
        return null;

    return convertToUserDTO(userFromDB);
}

export const getUserActiveTokenById = async (userId: string) => {

    const userFromDB = await Connection.db.collection("users").findOne({ "_id": userId }) as User;
    if (!userFromDB)
        return null;

    return userFromDB.userData.refreshToken;
}

export const getUserByEmail = async (email: string) => {

    const userFromDB = await Connection.db.collection("users").findOne({ "userData.email": email })
    if (!userFromDB)
        return null;

    return userFromDB as User;
}

export const getCurrentUser = async (req: ExpressRequest, res: ExpressResponse) => {

    const tokenMeta = getRequestAccessTokenMeta(req);
    if (!tokenMeta)
        return respondForbidden(req, res);

    const user = await getUserDTOById(tokenMeta.userId);

    respondOk(req, res, user);
}