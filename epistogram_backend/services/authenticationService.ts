import { Request, Response } from "express";
import { User } from "../models/entity/User";
import { staticProvider } from "../staticProvider";
import { setAuthCookies } from "../utilities/cookieHelpers";
import { getCookie, TypedError } from "../utilities/helpers";
import { toUserDTO } from "./mappings";
import { comparePasswordAsync, hashPasswordAsync } from "./misc/crypt";
import { log } from "./misc/logger";
import { createAccessToken, createRefreshToken, createResetPasswordToken, verifyAccessToken, verifyPasswordResetToken, verifyRefreshToken } from "./tokenService";
import { getUserActiveTokenById as getActiveTokenByUserId, getUserByEmail, getUserById, getUserDTOById, removeRefreshToken, setUserActiveRefreshToken } from "./userService";

export const getRequestAccessTokenPayload = (req: Request) => {

    const accessToken = getCookie(req, staticProvider.globalConfig.misc.accessTokenCookieName)?.value;
    if (!accessToken)
        throw new TypedError("Token not sent.", "bad request");

    const tokenPayload = verifyAccessToken(accessToken);
    if (!tokenPayload)
        throw new TypedError("Token is invalid.", "bad request");

    return tokenPayload;
}

export const getUserIdFromRequest = (req: Request) => {

    return getRequestAccessTokenPayload(req).userId;
}

export const renewUserSessionAsync = async (req: Request, res: Response) => {

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

    await staticProvider.services.emailService.sendResetPasswordMailAsync(user, resetPawsswordUrl);
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
    const user = await getUserByEmail(email);
    if (!user)
        throw new TypedError("Invalid email.", "forbidden");

    const isPasswordCorrect = await comparePasswordAsync(password, user.password);
    if (!isPasswordCorrect)
        throw new TypedError("Invalid password.", "forbidden");

    const userId = user.id;

    await staticProvider
        .services
        .userSessionActivityService
        .saveUserSessionActivityAsync(userId, "login");

    // get auth tokens 
    const tokens = await getUserLoginTokens(userId);

    // set user current refresh token 
    await setUserActiveRefreshToken(userId, tokens.refreshToken);

    return tokens;
}

export const logOutUserAsync = async (userId: number) => {

    await staticProvider
        .services
        .userSessionActivityService
        .saveUserSessionActivityAsync(userId, "logout");

    // remove refresh token, basically makes it invalid from now on
    await removeRefreshToken(userId);
}

export const getUserLoginTokens = async (userId: number) => {

    // get tokens
    const accessToken = createAccessToken(userId);
    const refreshToken = createRefreshToken(userId);

    return {
        accessToken,
        refreshToken
    }
}