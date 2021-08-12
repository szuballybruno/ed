
import { NextFunction, Request, Response } from "express";
import { logInUser, logOutUser, renewUserSession } from "../services/authentication";
import { getCurrentUser } from "../services/userService";
import { respondInternalServerError } from "../utilities/helpers";

export const renewUserSessionAction = (req: Request, res: Response) => {

    renewUserSession(req, res)
        .catch(error => respondInternalServerError(req, res, error));
}

export const logInUserAction = (req: Request, res: Response, next: NextFunction) => {

    logInUser(req, res)
        .catch(error => respondInternalServerError(req, res, error));
}

export const getCurrentUserAction = (req: Request, res: Response, next: NextFunction) => {

    getCurrentUser(req, res)
        .catch(error => respondInternalServerError(req, res, error));
}

export const logOutUserAction = (req: Request, res: Response, next: NextFunction) => {

    logOutUser(req, res)
        .catch(error => respondInternalServerError(req, res, error));
}