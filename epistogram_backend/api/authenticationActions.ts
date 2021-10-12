
import { NextFunction, Request, Response } from "express";
import { ChangePasswordDTO } from "../models/shared_models/SetNewPasswordDTO";
import { getUserIdFromRequest, logInUser, logOutUser, renewUserSession, setAuthCookies, changePasswordAsync } from "../services/authenticationService";
import { getCurrentUser } from "../services/userService";
import { getAsyncActionHandler, handleAsyncAction, TypedError, withValueOrBadRequest } from "../utilities/helpers";

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

    setAuthCookies(res, accessToken, refreshToken);
}

export const changePasswordAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const dto = withValueOrBadRequest(req.body) as ChangePasswordDTO;
    const password = withValueOrBadRequest(dto.password);
    const passwordCompare = withValueOrBadRequest(dto.passwordCompare);
    const passwordResetToken = withValueOrBadRequest(dto.passwordResetToken);

    return changePasswordAsync(userId, password, passwordCompare, passwordResetToken);
});

export const getCurrentUserAction = (req: Request, res: Response, next: NextFunction) => {

    handleAsyncAction(req, res, getCurrentUser);
}

export const logOutUserAction = (req: Request, res: Response, next: NextFunction) => {

    handleAsyncAction(req, res, (req) => logOutUser(req, res));
}