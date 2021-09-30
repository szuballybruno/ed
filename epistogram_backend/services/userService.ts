import { Request } from "express";
import { User } from "../models/entity/User";
import { staticProvider } from "../staticProvider";
import { TypedError } from "../utilities/helpers";
import { getRequestAccessTokenPayload } from "./authentication";
import { toUserDTO } from "./mappings";

export const getUserById = async (userId: number) => {

    const user = staticProvider
        .ormConnection
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.id = :userId", { userId: userId })
        .leftJoinAndSelect("user.avatarFile", "a")
        .leftJoinAndSelect("user.userActivity", "ua")
        .getOneOrFail();

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

    const user = await staticProvider
        .ormConnection
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

    const currentUser = await getUserById(authTokenPayload.userId);
    if (!currentUser)
        throw new TypedError("User not found by id: " + authTokenPayload.userId, "bad request");

    return toUserDTO(currentUser);
}

export const setUserAvatarFileId = async (userId: number, avatarFileId: number) => {

    await staticProvider
        .ormConnection
        .getRepository(User)
        .save({
            id: userId,
            avatarFileId: avatarFileId
        });
}

export const setUserActiveRefreshToken = (userId: number, refreshToken: string) => {

    return staticProvider
        .ormConnection
        .getRepository(User)
        .save({
            id: userId,
            refreshToken: refreshToken
        });
}

export const removeRefreshToken = (userId: number) => {

    return staticProvider
        .ormConnection
        .getRepository(User)
        .save({
            id: userId,
            refreshToken: ""
        });
}

export const getTeacherDTOAsync = async () => {

    const teachers = await staticProvider
        .ormConnection
        .getRepository(User)
        .find();

    return teachers
        .map(x => toUserDTO(x));
}