
import { NextFunction, Request, Response } from "express";
import { logInUser, logOutUser, renewUserSession } from "../services/authentication";
import { getCurrentUser } from "../services/userService";
import { handleAsyncAction, respondInternalServerError, respondOk } from "../utilities/helpers";

export const renewUserSessionAction = (req: Request, res: Response) => {

    handleAsyncAction(req, res, (req) => renewUserSession(req, res));
}

export const logInUserAction = (req: Request, res: Response, next: NextFunction) => {

    handleAsyncAction(req, res, (req) => logInUser(req, res));
}

export const getCurrentUserAction = (req: Request, res: Response, next: NextFunction) => {

    handleAsyncAction(req, res, getCurrentUser);
}

export const logOutUserAction = (req: Request, res: Response, next: NextFunction) => {

    handleAsyncAction(req, res, (req) => logOutUser(req, res));
}