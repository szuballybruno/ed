import bcrypt from "bcryptjs";
import dayjs from "dayjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenMeta } from "../models/DTOs/TokenMeta";
import { UserDTO } from "../models/shared_models/UserDTO";
import { globalConfig } from "../server";
import { ExpressRequest, ExpressResponse, getCookie, respondBadRequest, respondForbidden, respondInternalServerError, respondOk } from "../utilities/helpers";
import { removeRefreshToken, setUserActiveRefreshToken } from "./authenticationPersistance";
import { log, logError } from "./logger";
import { convertToUserDTO, getUserActiveTokenById as getActiveTokenByUserId, getUserByEmail, getUserDTOById } from "./userService";

// CONSTS
export const accessTokenCookieName = "accessToken";
export const refreshTokenCookieName = "refreshToken";
const accessTokenLifespanInS = 30;
const refreshTokenLifespanInS = 604800; // one week

// PUBLICS
export const getRequestAccessTokenMeta = (req: Request) => {

    const accessToken = getCookie(req, accessTokenCookieName)?.value;
    if (!accessToken)
        return null;

    const tokenMeta = validateToken(accessToken, globalConfig.security.jwtSignSecret);
    if (!tokenMeta)
        return null;

    return tokenMeta;
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
    const refreshTokenFromDb = await getActiveTokenByUserId(tokenMeta.userId);
    if (!refreshTokenFromDb)
        return respondForbidden(req, res);

    // get user 
    const user = await getUserDTOById(tokenMeta.userId);
    if (!user)
        return respondInternalServerError(req, res, "User not found by id " + tokenMeta.userId);

    // checks passed OK!
    setAuthCookies(res, user);
    respondOk(req, res);
}

export const logInUser = async (req: ExpressRequest, res: ExpressResponse) => {

    // check request 
    if (!req.body)
        return respondBadRequest(req, res);

    // get credentials from request
    const { email, password } = req.body;

    // further validate request 
    if (!email || !password)
        return respondBadRequest(req, res);

    // authenticate
    const user = await getUserByCredentials(email, password)
    if (!user)
        return respondForbidden(req, res);

    await setAuthCookies(res, convertToUserDTO(user));

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

// PRIVATES
const getPlainObjectUserInfoDTO = (user: UserDTO) => {

    return {
        userId: user.userId,
        organizationId: user.organizationId
    }
}

const getAccessToken = (user: UserDTO) => {

    const secret = globalConfig.security.jwtSignSecret;
    const token = jwt
        .sign(getPlainObjectUserInfoDTO(user), secret, { expiresIn: `${accessTokenLifespanInS}s` });

    return token;
}

const getRefreshToken = async (user: UserDTO) => {

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

const validateToken = (token: string, secret: string) => {

    try {
        jwt.verify(token, secret);
    }
    catch (e) {

        logError(e);
        return null;
    }

    return jwt.decode(token) as TokenMeta;
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

const setAuthCookies = async (res: Response, user: UserDTO) => {

    const accessToken = getAccessToken(user);
    setAccessTokenCookie(res, accessToken);

    const refreshToken = await getRefreshToken(user);
    setRefreshTokenCookie(res, refreshToken);
}