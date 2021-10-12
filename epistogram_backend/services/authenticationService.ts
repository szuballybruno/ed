import dayjs from "dayjs";
import { Request, Response } from "express";
import { User } from "../models/entity/User";
import { UserDTO } from "../models/shared_models/UserDTO";
import { staticProvider } from "../staticProvider";
import { getCookie, TypedError } from "../utilities/helpers";
import { sendResetPasswordMailAsync } from "./emailService";
import { toUserDTO } from "./mappings";
import { comparePasswordAsync, hashPasswordAsync } from "./misc/crypt";
import { log } from "./misc/logger";
import { createAccessToken, createRefreshToken, createResetPasswordToken, verifyAccessToken, verifyPasswordResetToken, verifyRefreshToken } from "./tokenService";
import { getUserActiveTokenById as getActiveTokenByUserId, getUserByEmail, getUserById, getUserDTOById, removeRefreshToken, setUserActiveRefreshToken } from "./userService";

// CONSTS
export const accessTokenCookieName = "accessToken";
export const refreshTokenCookieName = "refreshToken";

// PUBLICS
export const getRequestAccessTokenPayload = (req: Request) => {

    const accessToken = getCookie(req, accessTokenCookieName)?.value;
    if (!accessToken)
        throw new TypedError("There's a problem with the sent access token.", "bad request");

    const tokenPayload = verifyAccessToken(accessToken);
    if (!tokenPayload)
        throw new TypedError("There's a problem with the sent access token.", "bad request");

    return tokenPayload;
}

export const getUserDTOByCredentials = async (email: string, password: string) => {

    const user = await getUserByEmail(email);
    if (!user)
        return null;

    const isPasswordCorrect = await comparePasswordAsync(password, user.password);
    if (!isPasswordCorrect)
        return null;

    return toUserDTO(user);
}

export const getUserIdFromRequest = (req: Request) => {

    return getRequestAccessTokenPayload(req).userId;
}

export const renewUserSession = async (req: Request, res: Response) => {

    log("Renewing user session...");

    // check if there is a refresh token sent in the request 
    const refreshToken = getCookie(req, "refreshToken")?.value;
    if (!refreshToken)
        throw new TypedError("Refresh token not sent.", "bad request");

    // check sent refresh token if invalid by signature or expired
    const tokenMeta = verifyRefreshToken(refreshToken);

    // check if this refresh token is associated to the user
    const refreshTokenFromDb = await getActiveTokenByUserId(tokenMeta.userId);
    if (!refreshTokenFromDb)
        throw new TypedError(`User has no active token, or it's not the same as the one in request! User id '${tokenMeta.userId}', active token '${refreshTokenFromDb}'`, "forbidden");

    // get user 
    const user = await getUserDTOById(tokenMeta.userId);
    if (!user)
        throw new TypedError("User not found by id " + tokenMeta.userId, "internal server error");

    // get tokens
    const newAccessToken = createAccessToken(user.id);
    const newRefreshToken = createRefreshToken(user.id);

    // save refresh token to DB
    await setUserActiveRefreshToken(user.id, refreshToken);

    await setAuthCookies(res, newAccessToken, newRefreshToken);
}

export const requestChangePasswordAsync = async (userId: number, oldPassword: string) => {

    const resetPawsswordToken = createResetPasswordToken(userId);
    const user = await getUserById(userId);

    if (!await comparePasswordAsync(oldPassword, user.password))
        throw new TypedError("Wrong password!", "bad request");

    await staticProvider
        .ormConnection
        .getRepository(User)
        .save({
            id: user.id,
            resetPasswordToken: resetPawsswordToken
        });

    const resetPawsswordUrl = staticProvider.globalConfig.misc.frontendUrl + `/set-new-password?token=${resetPawsswordToken}`;

    await sendResetPasswordMailAsync(user, resetPawsswordUrl);
}

export const changePasswordAsync = async (
    userId: number,
    password: string,
    passwordCompare: string,
    passwordResetToken: string) => {

    const user = await getUserById(userId);

    // verify new password with compare password 
    if (password !== passwordCompare)
        throw new TypedError("Passwords don't match.", "bad request");

    // verify token
    const tokenPayload = verifyPasswordResetToken(passwordResetToken);

    // verify token user id 
    if (tokenPayload.userId !== user.id)
        throw new TypedError("Wrong token.", "bad request");

    // verify user reset password token
    if (user.resetPasswordToken !== passwordResetToken)
        throw new TypedError("Wrong token.", "bad request");

    // hash new password
    const hashedPassword = await hashPasswordAsync(password);

    await staticProvider
        .ormConnection
        .getRepository(User)
        .save({
            id: user.id,
            resetPasswordToken: null,
            password: hashedPassword
        } as User);
}

export const logInUser = async (email: string, password: string) => {

    log(`Logging in user... ${email} - ${password}`);

    // further validate request 
    if (!email || !password)
        throw new TypedError("Email or password is null.", "bad request");

    // authenticate
    const userDTO = await getUserDTOByCredentials(email, password)
    if (!userDTO)
        throw new TypedError("Invalid credentials.", "forbidden");

    log("User logged in: ");
    log(userDTO);

    return await getUserLoginTokens(userDTO.id);
}

export const logOutUser = async (req: Request, res: Response) => {

    const tokenMeta = getRequestAccessTokenPayload(req);
    if (!tokenMeta)
        throw new TypedError("Token meta not found.", "internal server error");

    // remove refresh token, basically makes it invalid from now on
    await removeRefreshToken(tokenMeta.userId);

    // remove browser cookies
    res.clearCookie(accessTokenCookieName);
    res.clearCookie(refreshTokenCookieName);
}

export const getUserLoginTokens = async (userId: number) => {

    // get tokens
    const accessToken = createAccessToken(userId);
    const refreshToken = createRefreshToken(userId);

    // save refresh token to DB
    log(`Setting refresh token of user '${userId}' to '${refreshToken}'`);
    await setUserActiveRefreshToken(userId, refreshToken);

    return {
        accessToken,
        refreshToken
    }
}

export const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {

    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
}

// PRIVATES

const setAccessTokenCookie = (res: Response, accessToken: string) => {

    const frontendUrl = staticProvider.globalConfig.misc.frontendUrl;
    const isLocalhost = staticProvider.globalConfig.misc.isLocalhost;

    res.cookie(accessTokenCookieName, accessToken, {
        secure: true,
        httpOnly: true,
        expires: dayjs().add(staticProvider.globalConfig.security.accessTokenLifespanInS, "seconds").toDate(),
        sameSite: "none"
        // domain: isLocalhost ? undefined : frontendUrl
    });
}

const setRefreshTokenCookie = (res: Response, refreshToken: string) => {

    const frontendUrl = staticProvider.globalConfig.misc.frontendUrl;
    const isLocalhost = staticProvider.globalConfig.misc.isLocalhost;

    res.cookie(refreshTokenCookieName, refreshToken, {
        secure: true,
        httpOnly: true,
        expires: dayjs().add(staticProvider.globalConfig.security.refreshTokenLifespanInS, "seconds").toDate(),
        sameSite: "none"
        // domain: isLocalhost ? undefined : frontendUrl
    });
}