
import { globalConfig } from "../server";
import { accessTokenCookieName, authorizeRequest, getCookie, getRequestAccessTokenMeta, refreshTokenCookieName, respondValidationError, setAuthCookies, validateToken } from "../services/authentication";
import { getRefreshTokenByUserEmail, removeRefreshToken } from "../services/authenticationPersistance";
import { getUser, getUserByEmail, insertUser, User } from "../services/userPersistance";
import { ExpressNext, ExpressRequest, ExpressResponse, respondOk } from "../utilities/helpers";

export const renewUserSession = (req: ExpressRequest, res: ExpressResponse) => {

    // check if there is a refresh token sent in the request 
    const refreshToken = getCookie(req, "refreshToken")?.value;
    if (!refreshToken) {

        res.sendStatus(403);
        return;
    }

    // check sent refresh token if invalid by signature or expired
    const { isValid, tokenMeta: user } = validateToken(refreshToken, globalConfig.security.jwtSignSecret);
    if (!isValid && !user) {

        res.sendStatus(403);
        return;
    }

    // check if this refresh token is associated to the user
    const existingToken = getRefreshTokenByUserEmail(user?.email as string)?.token;
    if (refreshToken != existingToken) {

        res.sendStatus(403);
        return;
    }

    // all checks passed, return with OK
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
    insertUser(user);

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

    const user = getUser(email, password);
    if (!user)
        res.sendStatus(418);

    setAuthCookies(res, user);

    res.sendStatus(200);
}

export const getCurrentUser = (req: ExpressRequest, res: ExpressResponse, next: ExpressNext) => {

    const tokenMeta = getRequestAccessTokenMeta(req);
    res.status(200).json(getUserByEmail(tokenMeta?.email as string));
}

export const logOutUserAction = (req: ExpressRequest, res: ExpressResponse, next: ExpressNext) => {

    const tokenMeta = getRequestAccessTokenMeta(req);

    // remove refresh token, basically makes it invalid from now on
    removeRefreshToken(tokenMeta?.email as string);

    // remove browser cookies
    res.clearCookie(accessTokenCookieName);
    res.clearCookie(refreshTokenCookieName);

    respondOk(req, res);
}