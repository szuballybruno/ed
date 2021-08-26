import { Request } from "express";
import { User } from "../models/entity/User";
import { getTypeORMConnection } from "../server";
import { TypedError } from "../utilities/helpers";
import { getRequestAccessTokenPayload } from "./authentication";
import { toUserDTO } from "./mappings";

export const getUserById = async (userId: number) => {

    const user = getTypeORMConnection()
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.id = :userId", { userId: userId })
        .getOneOrFail();

    // const cursor = await Connection.db.collection("users").find();
    // const usersFromDB = (await cursor.toArray());
    // const foundUser = usersFromDB.filter((x: any) => x?._id == userId)[0] as MongoUser;

    return user;
}

export const getUserDTOById = async (userId: number) => {

    const foundUser = await getUserById(userId);
    if (!foundUser)
        return null;

    return toUserDTO(foundUser);
}

export const getUserActiveTokenById = async (userId: number) => {

    //const userFromDB = await Connection.db.collection("users").findOne({ "_id": userId }) as User;

    const foundUser = await getUserById(userId);
    if (!foundUser)
        return null;

    return foundUser.refreshToken;
}

export const getUserByEmail = async (email: string) => {

    const user = await getTypeORMConnection()
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.email = :email", { email: email })
        .getOne();

    if (!user)
        return null;

    return user;
}

export const getCurrentUser = async (req: Request) => {

    const authTokenPayload = getRequestAccessTokenPayload(req);
    if (!authTokenPayload)
        throw new TypedError("Token meta is missing!", "forbidden");

    const currentUser = await getUserDTOById(authTokenPayload.userId);
    if (!currentUser)
        throw new TypedError("User not found by id: " + authTokenPayload.userId, "bad request");

    return currentUser;
}

export const setUserActiveRefreshToken = (userId: number, refreshToken: string) => {

    return getTypeORMConnection()
        .getRepository(User)
        .save({
            id: userId,
            refreshToken: refreshToken
        });
}

export const removeRefreshToken = (userId: number) => {

    return getTypeORMConnection()
        .getRepository(User)
        .save({
            id: userId,
            refreshToken: ""
        });
}