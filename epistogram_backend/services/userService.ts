import { Request } from "express";
import { AnswerSession } from "../models/entity/AnswerSession";
import { Course } from "../models/entity/Course";
import { User } from "../models/entity/User";
import { UserRoleEnum } from "../models/shared_models/types/sharedTypes";
import { staticProvider } from "../staticProvider";
import { TypedError } from "../utilities/helpers";
import { getRequestAccessTokenPayload } from "./authenticationService";
import { toUserDTO } from "./mappings";
import { hashPasswordAsync } from "./misc/crypt";
import { log } from "./misc/logger";

export const createUserAsync = async (opts: {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    isInvited: boolean,
    organizationId?: number,
    phoneNumber?: string,
    roleId?: number,
    jobTitleId?: number
}) => {

    const isInvited = opts.isInvited;

    // does user already exist?
    const existingUser = await getUserByEmail(opts.email);
    if (existingUser)
        throw new TypedError("User already exists. Email: " + opts.email, "bad request");

    // hash user password 
    const hashedPassword = await hashPasswordAsync(opts.password);

    // set default user fileds
    const user = {
        email: opts.email,
        roleId: opts.roleId ?? UserRoleEnum.userId,
        firstName: opts.firstName,
        lastName: opts.lastName,
        jobTitleId: opts.jobTitleId,
        phoneNumber: opts.phoneNumber,
        organizationId: opts.organizationId,
        password: hashedPassword,
        isInvitationAccepted: isInvited,
        isTrusted: isInvited
    } as User;

    // insert user
    await staticProvider
        .ormConnection
        .getRepository(User)
        .insert(user);

    const userId = user.id;

    // insert signup answer session
    await staticProvider
        .ormConnection
        .getRepository(AnswerSession)
        .insert({
            examId: 1, // -- 1 always points to signup exam 
            isSignupAnswerSession: true,
            userId: userId
        });

    // insert practise answer session
    await staticProvider
        .ormConnection
        .getRepository(AnswerSession)
        .insert({
            userId: userId,
            isPractiseAnswerSession: true
        });

    return user;
}

export const setUserInivitationDataAsync = async (userId: number, rawPassword: string,) => {

    await staticProvider
        .ormConnection
        .getRepository(User)
        .save({
            id: userId,
            isPendingInvitation: false,
            password: await hashPasswordAsync(rawPassword)
        });
}

export const getUserById = async (userId: number) => {

    const user = staticProvider
        .ormConnection
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.id = :userId", { userId: userId })
        .leftJoinAndSelect("user.avatarFile", "a")
        .leftJoinAndSelect("user.userActivity", "ua")
        .leftJoinAndSelect("user.jobTitle", "jt")
        .getOneOrFail();

    return user;
}

export const deleteUserAsync = async (userId: number, deletedUserId: number) => {

    // TODO permissions

    const connectedCourses = await staticProvider
        .ormConnection
        .getRepository(Course)
        .find({
            where: {
                teacherId: deletedUserId
            }
        });

    if (connectedCourses.length > 0)
        throw new TypedError("Cannot delete user when it's set as teacher on undeleted courses!", "bad request");

    return await staticProvider
        .ormConnection
        .getRepository(User)
        .softDelete(deletedUserId);
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

    log(`Setting refresh token of user '${userId}' to '${refreshToken}'`);

    return staticProvider
        .ormConnection
        .getRepository(User)
        .save({
            id: userId,
            refreshToken: refreshToken
        });
}

export const setUserInvitationTokenasync = async (userId: number, invitationToken: string) => {

    await staticProvider
        .ormConnection
        .getRepository(User)
        .save({
            id: userId,
            invitationToken
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