import dayjs from "dayjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenMeta } from "../models/DTOs/TokenMeta";
import { UserDTO } from "../models/shared_models/UserDTO";
import { globalConfig } from "../server";
import { ExpressRequest, ExpressResponse, getCookie, TypedError } from "../utilities/helpers";
import { comparePasswordAsync } from "./crypt";
import { verifyJWTToken } from "./jwtGen";
import { log } from "./logger";
import { toUserDTO } from "./mappings";
import { removeRefreshToken, setUserActiveRefreshToken } from "./refreshTokenService";
import { getUserActiveTokenById as getActiveTokenByUserId, getUserByEmail, getUserDTOById } from "./userService";

// CONSTS
export const accessTokenCookieName = "accessToken";
export const refreshTokenCookieName = "refreshToken";

// PUBLICS
export const getRequestAccessTokenMeta = (req: Request) => {

    const accessToken = getCookie(req, accessTokenCookieName)?.value;
    if (!accessToken)
        return null;

    const tokenMeta = verifyJWTToken<TokenMeta>(accessToken, globalConfig.security.jwtSignSecret);
    if (!tokenMeta)
        return null;

    return tokenMeta;
}

export const authorizeRequest = (req: Request) => {
    return new Promise<TokenMeta>((resolve, reject) => {

        const accessToken = getCookie(req, accessTokenCookieName)?.value;
        if (!accessToken)
            throw new TypedError("Access token missing!", "forbidden");

        const tokenMeta = verifyJWTToken<TokenMeta>(accessToken, globalConfig.security.jwtSignSecret);
        if (!tokenMeta)
            throw new TypedError("Invalid token!", "forbidden");

        resolve(tokenMeta);
    });
}

export const getUserDTOByCredentials = async (email: string, password: string) => {

    const user = await getUserByEmail(email);
    if (!user)
        return null;

    const isPasswordCorrect = await comparePasswordAsync(password as string, user.userData.password);
    if (!isPasswordCorrect)
        return null;

    return toUserDTO(user);
}

export const getUserIdFromRequest = (req: ExpressRequest) => {

    // check if there is a refresh token sent in the request 
    const refreshToken = getCookie(req, "refreshToken")?.value;
    if (!refreshToken)
        throw new TypedError("Refresh token not sent.", "bad request");

    // check sent refresh token if invalid by signature or expired
    const tokenMeta = verifyJWTToken<TokenMeta>(refreshToken, globalConfig.security.jwtSignSecret);
    if (!tokenMeta)
        throw new TypedError("Refresh token validation failed.", "forbidden");

    return tokenMeta.userId;
}

export const renewUserSession = async (req: ExpressRequest, res: ExpressResponse) => {

    log("Renewing user session...");

    // check if there is a refresh token sent in the request 
    const refreshToken = getCookie(req, "refreshToken")?.value;
    if (!refreshToken)
        throw new TypedError("Refresh token not sent.", "bad request");

    // check sent refresh token if invalid by signature or expired
    const tokenMeta = verifyJWTToken<TokenMeta>(refreshToken, globalConfig.security.jwtSignSecret);
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
    await setUserActiveRefreshToken(user.userId, refreshToken);

    await setAuthCookies(res, newAccessToken, newRefreshToken);
}

export const logInUser = async (req: ExpressRequest, res: ExpressResponse) => {

    log("Logging in user...");

    // check request 
    if (!req.body)
        throw new TypedError("Body is null.", "bad request");

    // get credentials from request
    const { email, password } = req.body;

    // further validate request 
    if (!email || !password)
        throw new TypedError("Email or password is null.", "bad request");

    // authenticate
    const userDTO = await getUserDTOByCredentials(email, password)
    if (!userDTO)
        throw new TypedError("Invalid credentials.", "forbidden");

    log("User logged in: ");
    log(userDTO);

    const { accessToken, refreshToken } = await getUserLoginTokens(userDTO);

    await setAuthCookies(res, accessToken, refreshToken);
}

export const logOutUser = async (req: ExpressRequest, res: ExpressResponse) => {

    const tokenMeta = getRequestAccessTokenMeta(req);
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
    log(`Setting refresh token of user '${user.userId}' to '${refreshToken}'`);
    await setUserActiveRefreshToken(user.userId, refreshToken);

    return {
        accessToken,
        refreshToken
    }
}

export const setAuthCookies = (res: ExpressResponse, accessToken: string, refreshToken: string) => {

    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
}

// PRIVATES
const getPlainObjectUserInfoDTO = (user: UserDTO) => {

    return {
        userId: user.userId,
        organizationId: user.organizationId
    }
}

const getAccessToken = (user: UserDTO) => {

    const token = jwt.sign(
        getPlainObjectUserInfoDTO(user),
        globalConfig.security.jwtSignSecret, {
        expiresIn: `${globalConfig.security.accessTokenLifespanInS}s`
    });

    return token;
}

const getRefreshToken = (user: UserDTO) => {

    return jwt.sign(
        getPlainObjectUserInfoDTO(user),
        globalConfig.security.jwtSignSecret,
        {
            expiresIn: globalConfig.security.refreshTokenLifespanInS
        });
}

const setAccessTokenCookie = (res: Response, accessToken: string) => {
    res.cookie(accessTokenCookieName, accessToken, {
        secure: true,
        httpOnly: true,
        expires: dayjs().add(globalConfig.security.accessTokenLifespanInS, "seconds").toDate()
    });
}

const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
    res.cookie(refreshTokenCookieName, refreshToken, {
        secure: true,
        httpOnly: true,
        expires: dayjs().add(globalConfig.security.refreshTokenLifespanInS, "seconds").toDate()
    });
}