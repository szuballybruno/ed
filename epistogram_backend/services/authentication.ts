import dayjs from "dayjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/entities/user";
import { globalConfig } from "../server";
import { ExpressRequest, ExpressResponse, IdType, respondBadRequest, respondForbidden, respondInternalServerError, respondOk } from "../utilities/helpers";
import { getRefreshTokenByUserId, removeRefreshToken, setUserActiveRefreshToken } from "./authenticationPersistance";
import { logError } from "./logger";
import { getUserByEmail, getUserById } from "./userService";
import { TokenMeta } from "../models/DTOs/TokenMeta";

export const accessTokenCookieName = "accessToken";
export const refreshTokenCookieName = "refreshToken";
const accessTokenLifespanInS = 30;
const refreshTokenLifespanInS = 604800; // one week

export class UserInfo {
    userId: string;
    organizationId: string;

    constructor(userId: string, organizationId: string) {
        this.userId = userId;
        this.organizationId = organizationId;
    }
}

export const getPlainObjectUserInfoDTO = (user: User) => {

    return {
        userId: user.userId,
        organizationId: user.userData.organizationId
    }
}

export const getAccessToken = (user: User) => {

    const secret = globalConfig.security.jwtSignSecret;
    const token = jwt
        .sign(getPlainObjectUserInfoDTO(user), secret, { expiresIn: `${accessTokenLifespanInS}s` });

    return token;
}

export const getRefreshToken = async (user: User) => {

    // const refreshToken = await getRefreshTokenByUserId(user.userId);
    // if (!refreshToken)
    //     throw new Error("Error getting refresh token!");

    // const isValid = validateToken(refreshToken, globalConfig.security.jwtSignSecret).isValid;
    // if (!isValid)
    //     throw new Error("Invalid token!");

    const newRefreshToken = jwt.sign(getPlainObjectUserInfoDTO(user), globalConfig.security.jwtSignSecret);

    // save refresh token to DB
    await setUserActiveRefreshToken(user.userId, newRefreshToken);

    return newRefreshToken;
}

export const validateToken = (token: string, secret: string) => {

    try {
        jwt.verify(token, secret);
    }
    catch (e) {

        logError(e);
        return null;
    }

    return jwt.decode(token) as TokenMeta;
}

export const getRequestAccessTokenMeta = (req: Request) => {

    const accessToken = getCookie(req, accessTokenCookieName)?.value;
    if (!accessToken)
        return null;

    const tokenMeta = validateToken(accessToken, globalConfig.security.jwtSignSecret);
    if (!tokenMeta)
        return null;

    return tokenMeta;
}

const setAccessTokenCookie = (res: Response, accessToken: string) => {
    res.cookie(accessTokenCookieName, accessToken, {
        secure: false, //TODO: Write back to secure
        httpOnly: true,
        expires: dayjs().add(accessTokenLifespanInS, "seconds").toDate()
    });
}

const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
    res.cookie(refreshTokenCookieName, refreshToken, {
        secure: false, //TODO: Write back to secure
        httpOnly: true,
        expires: dayjs().add(refreshTokenLifespanInS, "seconds").toDate()
    });
}

export const getCookies = (req: Request) => {

    const cookieString = (req.headers.cookie as string);
    if (!cookieString)
        return [];

    return cookieString
        .split('; ')
        .map(x => ({
            key: x.split("=")[0],
            value: x.split("=")[1]
        }));
}

export const getCookie = (req: Request, key: string) => getCookies(req).filter(x => x.key == key)[0];

export const respondValidationError = (res: Response, error: string) =>
    res.status(400).json({ error: error });

export const setAuthCookies = async (res: Response, user: User) => {

    const accessToken = getAccessToken(user);
    setAccessTokenCookie(res, accessToken);

    const refreshToken = await getRefreshToken(user);
    setRefreshTokenCookie(res, refreshToken);
}

export const authorizeRequest = (req: Request, onAuthorized: (tokenMeta: TokenMeta) => void, onError: () => void) => {

    const accessToken = getCookie(req, accessTokenCookieName)?.value;
    if (!accessToken) {
        onError();
        return;
    }

    const tokenMeta = validateToken(accessToken, globalConfig.security.jwtSignSecret);
    if (!tokenMeta) {
        onError();
        return;
    }

    onAuthorized(tokenMeta);
}

export const getUserByCredentials = async (email: string, password: string) => {

    const user = await getUserByEmail(email);
    if (!user)
        return null;

    const isPasswordCorrect = await bcrypt.compare(password as string, user.userData.password);
    if (!isPasswordCorrect)
        return null;

    return user;
}

export const renewUserSession = async (req: ExpressRequest, res: ExpressResponse) => {

    // check if there is a refresh token sent in the request 
    const refreshToken = getCookie(req, "refreshToken")?.value;
    if (!refreshToken)
        return respondBadRequest(req, res);

    // check sent refresh token if invalid by signature or expired
    const tokenMeta = validateToken(refreshToken, globalConfig.security.jwtSignSecret);
    if (!tokenMeta)
        return respondForbidden(req, res);

    // check if this refresh token is associated to the user
    const refreshTokenFromDb = await getRefreshTokenByUserId(tokenMeta.userId);
    if (!refreshTokenFromDb)
        return respondForbidden(req, res);

    // get user 
    const user = await getUserById(tokenMeta.userId);
    if (!user)
        return respondInternalServerError(req, res, "User not found by id " + tokenMeta.userId);

    // checks passed OK!
    setAuthCookies(res, user);
    respondOk(req, res);
}

export const logInUser = async (req: ExpressRequest, res: ExpressResponse) => {

    // check request 
    if (!req.body)
        respondBadRequest(req, res);

    // get credentials from request
    const { email, password } = req.body;

    // further validate request 
    if (!email || !password)
        respondBadRequest(req, res);

    // authenticate
    const user = await getUserByCredentials(email, password)
    if (!user)
        return respondForbidden(req, res);

    setAuthCookies(res, user as User);
    respondOk(req, res);
}

export const logOutUser = async (req: ExpressRequest, res: ExpressResponse) => {

    const tokenMeta = getRequestAccessTokenMeta(req);
    if (!tokenMeta)
        return respondForbidden(req, res);

    // remove refresh token, basically makes it invalid from now on
    await removeRefreshToken(tokenMeta.userId);

    // remove browser cookies
    res.clearCookie(accessTokenCookieName);
    res.clearCookie(refreshTokenCookieName);

    respondOk(req, res);
}