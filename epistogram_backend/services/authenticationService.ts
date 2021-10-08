import dayjs from "dayjs";
import { Request, Response } from "express";
import { TokenMeta as TokenPayload } from "../models/DTOs/TokenMeta";
import { UserDTO } from "../models/shared_models/UserDTO";
import { getCookie, TypedError } from "../utilities/helpers";
import { comparePasswordAsync, hashPasswordAsync } from "./misc/crypt";
import { getJWTToken, verifyJWTToken } from "./misc/jwtGen";
import { log } from "./misc/logger";
import { toUserDTO } from "./mappings";
import { getUserActiveTokenById as getActiveTokenByUserId, getUserByEmail, getUserById, getUserDTOById, removeRefreshToken, setUserActiveRefreshToken } from "./userService";
import { staticProvider } from "../staticProvider";
import { sendResetPasswordMailAsync } from "./emailService";
import { User } from "../models/entity/User";

// CONSTS
export const accessTokenCookieName = "accessToken";
export const refreshTokenCookieName = "refreshToken";

// PUBLICS
export const getRequestAccessTokenPayload = (req: Request) => {

    const accessToken = getCookie(req, accessTokenCookieName)?.value;
    if (!accessToken)
        return null;

    const tokenPayload = verifyJWTToken<TokenPayload>(accessToken, staticProvider.globalConfig.security.jwtSignSecret);
    if (!tokenPayload)
        return null;

    return tokenPayload;
}

export const authorizeRequest = (req: Request) => {
    return new Promise<TokenPayload>((resolve, reject) => {

        const accessToken = getCookie(req, accessTokenCookieName)?.value;
        if (!accessToken)
            throw new TypedError("Access token missing!", "forbidden");

        const tokenMeta = verifyJWTToken<TokenPayload>(accessToken, staticProvider.globalConfig.security.jwtSignSecret);
        if (!tokenMeta)
            throw new TypedError("Invalid token!", "forbidden");

        resolve(tokenMeta);
    });
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

    // check if there is a refresh token sent in the request 
    const accessToken = getCookie(req, "accessToken")?.value;
    if (!accessToken)
        throw new TypedError("Access token not sent.", "bad request");

    // check sent access token if invalid by signature or expired
    const tokenMeta = verifyJWTToken<TokenPayload>(accessToken, staticProvider.globalConfig.security.jwtSignSecret);
    if (!tokenMeta)
        throw new TypedError("Access token validation failed.", "forbidden");

    return tokenMeta.userId;
}

export const renewUserSession = async (req: Request, res: Response) => {

    log("Renewing user session...");

    // check if there is a refresh token sent in the request 
    const refreshToken = getCookie(req, "refreshToken")?.value;
    if (!refreshToken)
        throw new TypedError("Refresh token not sent.", "bad request");

    // check sent refresh token if invalid by signature or expired
    const tokenMeta = verifyJWTToken<TokenPayload>(refreshToken, staticProvider.globalConfig.security.jwtSignSecret);
    if (!tokenMeta)
        throw new TypedError("Refresh token validation failed.", "forbidden");

    // check if this refresh token is associated to the user
    const refreshTokenFromDb = await getActiveTokenByUserId(tokenMeta.userId);
    if (!refreshTokenFromDb)
        throw new TypedError(`User has no active token, or it's not the same as the one in request! User id '${tokenMeta.userId}', active token '${refreshTokenFromDb}'`, "forbidden");

    // get user 
    const user = await getUserDTOById(tokenMeta.userId);
    if (!user)
        throw new TypedError("User not found by id " + tokenMeta.userId, "internal server error");

    // get tokens
    const newAccessToken = getAccessToken(user);
    const newRefreshToken = getRefreshToken(user);

    // save refresh token to DB
    await setUserActiveRefreshToken(user.id, refreshToken);

    await setAuthCookies(res, newAccessToken, newRefreshToken);
}

export const requestChangePasswordAsync = async (userId: number, oldPassword: string) => {

    const resetPawsswordToken = await getJWTToken(
        { userId: userId },
        staticProvider.globalConfig.mail.tokenMailSecret,
        "24h");

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
    const tokenPayload = verifyJWTToken<{ userId: number }>(
        passwordResetToken,
        staticProvider.globalConfig.mail.tokenMailSecret);

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

    return await getUserLoginTokens(userDTO);
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

export const getUserLoginTokens = async (user: UserDTO) => {

    // get tokens
    const accessToken = getAccessToken(user);
    const refreshToken = getRefreshToken(user);

    // save refresh token to DB
    log(`Setting refresh token of user '${user.id}' to '${refreshToken}'`);
    await setUserActiveRefreshToken(user.id, refreshToken);

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
const getPlainObjectUserInfoDTO = (user: UserDTO) => {

    return {
        userId: user.id,
        organizationId: user.organizationId
    }
}

const getAccessToken = (user: UserDTO) => {

    return getJWTToken(
        getPlainObjectUserInfoDTO(user),
        staticProvider.globalConfig.security.jwtSignSecret,
        `${staticProvider.globalConfig.security.accessTokenLifespanInS}s`);
}

const getRefreshToken = (user: UserDTO) => {

    return getJWTToken(
        getPlainObjectUserInfoDTO(user),
        staticProvider.globalConfig.security.jwtSignSecret,
        `${staticProvider.globalConfig.security.refreshTokenLifespanInS}s`);
}


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