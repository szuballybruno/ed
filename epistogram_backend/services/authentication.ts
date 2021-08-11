import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import { globalConfig } from "../server";
import { getRefreshTokenByUserEmail, setRefreshToken } from "../services/authenticationPersistance";
import { log, logError } from "../services/logger";
import { User } from "../services/userPersistance";
import { ExpressRequest, ExpressResponse } from "../utilities/helpers";

export const accessTokenCookieName = "accessToken";
export const refreshTokenCookieName = "refreshToken";
const accessTokenLifespanInS = 30;
const refreshTokenLifespanInS = 604800; // one week

export const getAccessToken = (user: User) => jwt.sign(
    { email: user.email },
    globalConfig.security.jwtSignSecret,
    { expiresIn: `${accessTokenLifespanInS}s` });

export const getRefreshToken = (user: User) => {

    const existingToken = getRefreshTokenByUserEmail(user.email)?.token;
    const { isValid } = validateToken(existingToken, globalConfig.security.jwtSignSecret);

    if (isValid)
        return existingToken;

    const refreshToken = jwt.sign({ email: user.email }, globalConfig.security.jwtSignSecret);
    setRefreshToken(user.email, refreshToken);

    return refreshToken;
}

export const validateToken = (token: string, secret: string) => {

    const returnValue = { isValid: false, tokenMeta: null as User | null };

    try {

        jwt.verify(token, secret);
        returnValue.isValid = true;
    }
    catch (e) {

        logError(e);
    }

    if (returnValue.isValid) {

        returnValue.tokenMeta = jwt.decode(token) as User;
    }

    return returnValue;
}

export const getRequestAccessTokenMeta = (req: ExpressRequest) => {

    const accessToken = getCookie(req, accessTokenCookieName)?.value;
    if (!accessToken)
        throw new Error("Access token not present in request!");

    const { isValid, tokenMeta } = validateToken(accessToken, globalConfig.security.jwtSignSecret);
    if (!isValid)
        throw new Error("Access token invalid or expired!");

    return tokenMeta;
}

export const setAccessTokenCookie = (res: ExpressResponse, accessToken: string) => {
    res.cookie(accessTokenCookieName, accessToken, {
        secure: true,
        httpOnly: true,
        expires: dayjs().add(accessTokenLifespanInS, "seconds").toDate()
    });
}

export const setRefreshTokenCookie = (res: ExpressResponse, refreshToken: string) => {
    res.cookie(refreshTokenCookieName, refreshToken, {
        secure: true,
        httpOnly: true,
        expires: dayjs().add(refreshTokenLifespanInS, "seconds").toDate()
    });
}

export const getCookies = (req: ExpressRequest) => {

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

export const getCookie = (req: ExpressRequest, key: string) => getCookies(req).filter(x => x.key == key)[0];

export const respondValidationError = (res: ExpressResponse, error: string) =>
    res.status(400).json({ error: error });

export const setAuthCookies = (res: ExpressResponse, user: User) => {

    const accessToken = getAccessToken(user);
    setAccessTokenCookie(res, accessToken);

    const refreshToken = getRefreshToken(user);
    setRefreshTokenCookie(res, refreshToken);
}

export const authorizeRequest = (req: ExpressRequest, onAuthorized: (user: User) => void, onError: () => void) => {

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

    onAuthorized(user as User);
}