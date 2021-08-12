
import { globalConfig } from "../server";
import { accessTokenCookieName, authorizeRequest, getCookie, getRequestAccessTokenMeta, refreshTokenCookieName, respondValidationError, setAuthCookies, validateToken } from "../services/authentication";
import { getRefreshTokenByUserId, removeRefreshToken } from "../services/authenticationPersistance";
import { Request, Response, NextFunction } from "express";
import { respondBadRequest, respondForbidden, respondOk } from "../utilities/helpers";
import { Connection } from "../services/connectMongo";
import { responseReducer } from "../services/responseReducer";
import bcrypt from "bcryptjs";
import { getUserById } from "../services/userService";

export const renewUserSession = (req: Request, res: Response) => {
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
    getRefreshTokenByUserId(user?.email as string).then(refreshTokenFromDb => {
        refreshToken !== refreshTokenFromDb ? new Error("Refresh token is not associated to the user") : null
    });

    // all checks passed, return with OK
    setAuthCookies(res, user);
    respondOk(req, res);
}

export const registerUserAction = (req: Request, res: Response, next: NextFunction) => {

    // check request 
    if (!req.body)
        respondBadRequest(req, res);

    // get credentials from request
    const { email, password } = req.body;

    // further validate request 
    if (!email || !password)
        respondBadRequest(req, res);

    // authenticate
    authenticateUser().then(user => {
        setAuthCookies(res, { _id: user._id, organizationId: user.organizationId, email: user.email });
        res.sendStatus(200);
    })
}

export const logInUserAction = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.query

    if (!email)
        respondValidationError(res, "Email is not provided!");

    if (!password)
        respondValidationError(res, "Password is not provided!");

    const authenticateUser = async () => {
        let existingUser
        try {
            existingUser = await Connection.db.collection("users").findOne({ "userData.email": email });
        } catch (e) {
            throw new Error("Invalid credentials")
        }

        if (!existingUser) {
            throw new Error("Invalid credentials")
        }

        let isValidPassword = false;
        try {
            isValidPassword = await bcrypt.compare(password as string, existingUser.userData.password);
        } catch (err) {
            throw new Error("Invalid credentials")
        }

        if (!isValidPassword) {
            throw new Error("Invalid credentials")
        }

        return { _id: existingUser._id, organizationId: existingUser.userData.organizationId, email: existingUser.userData.email }
    }
    authenticateUser().then(user => {
        setAuthCookies(res, { _id: user._id, organizationId: user.organizationId, email: user.email });
        res.sendStatus(200);
    })
}

export const getCurrentUser = (req: Request, res: Response, next: NextFunction) => {

    const tokenMeta = getRequestAccessTokenMeta(req);

    getUserById(tokenMeta)
        .then(x => res.sendStatus(200).json(x))
        .catch(x => res.sendStatus(500).json(x));
}

export const logOutUserAction = (req: Request, res: Response, next: NextFunction) => {

    const tokenMeta = getRequestAccessTokenMeta(req);

    // remove refresh token, basically makes it invalid from now on
    removeRefreshToken(tokenMeta?.email as string)
        .then(() => {
            // remove browser cookies
            res.clearCookie(accessTokenCookieName);
            res.clearCookie(refreshTokenCookieName);

            respondOk(req, res);
        });
}