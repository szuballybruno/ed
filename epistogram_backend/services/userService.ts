import { User } from "../models/entities/user";
import { UserDTO } from "../models/shared_models/UserDTO";
import { ExpressRequest, ExpressResponse, respondForbidden, respondOk, TypedError } from "../utilities/helpers";
import { getRequestAccessTokenMeta } from "./authentication";
import { Connection } from "./connectMongo";
import { log } from "./logger";

export const convertToUserDTO = (user: User) => new UserDTO(user._id, user.userData.organizationId);

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

    return convertToUserDTO(foundUser);
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

    return await getUserDTOById(tokenMeta.userId);
}