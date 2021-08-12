import dayjs from "dayjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/entities/user";
import { globalConfig } from "../server";
import { IdType } from "../utilities/helpers";
import { getRefreshTokenByUserId, setUserActiveRefreshToken } from "./authenticationPersistance";
import { logError } from "./logger";
import { getUserById } from "./userService";

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
        organizationId: user.organizationId
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

    const returnValue = { isValid: false, tokenMeta: null as any | null };

    try {
        jwt.verify(token, secret);
        returnValue.isValid = true;
    }
    catch (e) {

        logError(e);
    }

    if (returnValue.isValid) {
        returnValue.tokenMeta = jwt.decode(token) as any;
    }

    return returnValue;
}

export const getRequestAccessTokenMeta = (req: Request) => {

    const accessToken = getCookie(req, accessTokenCookieName)?.value;
    if (!accessToken)
        throw new Error("Access token not present in request!");

    const { isValid, tokenMeta } = validateToken(accessToken, globalConfig.security.jwtSignSecret);
    if (!isValid)
        throw new Error("Access token invalid or expired!");

    return tokenMeta;
}

export const setAccessTokenCookie = (res: Response, accessToken: string) => {
    res.cookie(accessTokenCookieName, accessToken, {
        secure: false, //TODO: Write back to secure
        httpOnly: true,
        expires: dayjs().add(accessTokenLifespanInS, "seconds").toDate()
    });
}

export const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
    res.cookie(refreshTokenCookieName, refreshToken, {
        secure: false, //TODO: Write back to secure
        httpOnly: true,
        expires: dayjs().add(refreshTokenLifespanInS, "seconds").toDate()
    });
}

export const setUserIdCookie = (res: Response, userId: string) => {
    res.cookie("userId", userId, {
        secure: false, //TODO: Write back to secure
        httpOnly: false,
        //expires: dayjs().add(refreshTokenLifespanInS, "seconds").toDate()
    });
}
export const setOrganizationIdCookie = (res: Response, organizationId: string) => {
    res.cookie("organizationId", organizationId, {
        secure: false, //TODO: Write back to secure
        httpOnly: false,
        //expires: dayjs().add(refreshTokenLifespanInS, "seconds").toDate()
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

export const authorizeRequest = (req: Request, onAuthorized: (user: { _id: string, organizationId: string, email: string, refreshToken?: string }) => void, onError: () => void) => {

    const accessToken = getCookie(req, accessTokenCookieName)?.value;
    if (!accessToken) {
        onError();
        return;
    }

    const { isValid, tokenMeta: user } = validateToken(accessToken, globalConfig.security.jwtSignSecret);
    if (!isValid) {
        onError();
        return;
    }

    onAuthorized(user as any);
}

const authenticateUser = async (userId: IdType) => {

    const user = await getUserById(userId);
    if (!user)
        throw new Error("User not found!");

    await bcrypt.compare(password as string, user.userData.password);

    let isValidPassword = false;
    try {
        isValidPassword =
    } catch (err) {
        throw new Error("Invalid credentials")
    }

    if (!isValidPassword) {
        throw new Error("Invalid credentials")
    }

    return { _id: user._id, organizationId: user.userData.organizationId, email: user.userData.email }
}