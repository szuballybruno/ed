
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import { log, logError } from "../services/logger";
import { globalConfig } from "../server";
import { ExpressResponse, ExpressRequest, ExpressNext, respondOk } from "../utilities/helpers";

const accessTokenCookieName = "accessToken";
const refreshTokenCookieName = "refreshToken";

export class User {
    email: string;
    password: string;
    id: number;

    constructor(email: string, password: string, id: number) {
        this.email = email;
        this.password = password;
        this.id = id;
    }
}

const getAccessToken = (user: User) => jwt.sign(JSON.stringify(user), globalConfig.security.jwtSignSecret);
const getRefreshToken = (user: User) => jwt.sign(JSON.stringify(user), globalConfig.security.jwtSignSecret);

const validateToken = (token: string, secret: string) => {

    const returnValue = { isValid: false, user: null as User | null };

    log("Verifying token...");
    try {

        jwt.verify(token, secret);
        returnValue.isValid = true;
    }
    catch (e) {

        logError(e);
    }

    if (returnValue.isValid) {

        log("Token is valid, decoding...");
        returnValue.user = jwt.decode(token) as User;
        log("Token decoded, content: " + JSON.stringify(returnValue.user));
    }

    return returnValue;
}

const setAccessTokenCookie = (res: ExpressResponse, accessToken: string) => {
    res.cookie(accessTokenCookieName, accessToken, {
        secure: false,
        httpOnly: false,
        expires: dayjs().add(10, "seconds").toDate()
    });
}

const setRefreshTokenCookie = (res: ExpressResponse, refreshToken: string) => {
    res.cookie(refreshTokenCookieName, refreshToken, {
        secure: false,
        httpOnly: false,
        expires: dayjs().add(60, "seconds").toDate()
    });
}

const getCookies = (req: ExpressRequest) => {

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

const getCookie = (req: ExpressRequest, key: string) => getCookies(req).filter(x => x.key == key)[0];

const respondValidationError = (res: ExpressResponse, error: string) =>
    res.status(400).json({ error: error });

const users = [] as User[];

const setAuthCookies = (res: ExpressResponse, user: User) => {

    const accessToken = getAccessToken(user);
    setAccessTokenCookie(res, accessToken);

    const refreshToken = getRefreshToken(user);
    setRefreshTokenCookie(res, refreshToken);
}

export const renewUserSession = (req: ExpressRequest, res: ExpressResponse) => {

    const refreshToken = getCookie(req, "refreshToken")?.value;
    if (!refreshToken) {

        res.sendStatus(403);
        return;
    }

    const { isValid, user } = validateToken(refreshToken, globalConfig.security.jwtSignSecret);

    if (!isValid && !user) {

        res.sendStatus(403);
        return;
    }

    setAuthCookies(res, user as User);

    respondOk(req, res);
}

export const registerUserAction = (req: ExpressRequest, res: ExpressResponse, next: ExpressNext) => {

    const email = req.body?.email;
    const password = req.body?.password;

    if (!email) {

        respondValidationError(res, "Email is not provided!");
        return;
    }

    if (!password) {

        respondValidationError(res, "Password is not provided!");
        return;
    }

    // TODO: persist user in DB
    const user = new User(email, password, 1);
    users.push(user);

    setAuthCookies(res, user);

    res.sendStatus(200);
}


export const logInUserAction = (req: ExpressRequest, res: ExpressResponse, next: ExpressNext) => {

    const email = req.body.email;
    const password = req.body.password;

    if (!email)
        respondValidationError(res, "Email is not provided!");

    if (!password)
        respondValidationError(res, "Password is not provided!");

    // TODO: get user from DB
    const user = users.filter(x => x.email == email && x.password == password)[0];
    if (!user)
        res.sendStatus(418);

    setAuthCookies(res, user);

    res.sendStatus(200);
}

export const getCurrentUser = (req: ExpressRequest, res: ExpressResponse, next: ExpressNext) => {

    const accessToken = getCookie(req, "accessToken")?.value;
    if (!accessToken) {

        res.sendStatus(403);
        return;
    }

    const { isValid, user } = validateToken(accessToken, globalConfig.security.jwtSignSecret);

    if (!isValid) {

        res.sendStatus(403);
        return;
    }

    res.status(200).json(user);
}