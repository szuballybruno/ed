
import { NextFunction, Request, Response } from "express";
import { logInUser, logOutUser, renewUserSession, setAuthCookies } from "../services/authentication";
import { getCurrentUser } from "../services/userService";
import { handleAsyncAction, TypedError } from "../utilities/helpers";

export const renewUserSessionAction = (req: Request, res: Response) => {

    handleAsyncAction(req, res, (req) => renewUserSession(req, res));
}

export const logInUserAction = async (req: Request, res: Response) => {

    // check request 
    if (!req.body)
        throw new TypedError("Body is null.", "bad request");

    // get credentials from request
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await logInUser(email, password);
    
    await setAuthCookies(res, accessToken, refreshToken);
}

export const getCurrentUserAction = (req: Request, res: Response, next: NextFunction) => {

    handleAsyncAction(req, res, getCurrentUser);
}

export const logOutUserAction = (req: Request, res: Response, next: NextFunction) => {

    handleAsyncAction(req, res, (req) => logOutUser(req, res));
}