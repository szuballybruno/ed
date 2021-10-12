
import { NextFunction, Request, Response } from "express";
import { ChangePasswordDTO } from "../models/shared_models/SetNewPasswordDTO";
import { changePasswordAsync, getUserIdFromRequest, logInUser, logOutUser, renewUserSessionAsync, setAuthCookies } from "../services/authenticationService";
import { getCurrentUser } from "../services/userService";
import { getAsyncActionHandler, TypedError, withValueOrBadRequest } from "../utilities/helpers";

export const renewUserSessionAction = getAsyncActionHandler(async (req: Request, res: Response) => {

    return renewUserSessionAsync(req, res);
});

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

export const getCurrentUserAction = getAsyncActionHandler(async (req: Request) => {

    return getCurrentUser(req);
});

export const logOutUserAction = getAsyncActionHandler(async (req: Request, res: Response, next: NextFunction) => {

    return logOutUser(req, res);
});