
import { NextFunction, Request, Response } from "express";
import { ChangePasswordDTO } from "../models/shared_models/SetNewPasswordDTO";
import { changePasswordAsync, getUserIdFromRequest, logInUser, logOutUserAsync, renewUserSessionAsync, setAuthCookies } from "../services/authenticationService";
import { getCurrentUser } from "../services/userService";
import { staticProvider } from "../staticProvider";
import { ActionParamsType, getAsyncActionHandler, TypedError, withValueOrBadRequest } from "../utilities/helpers";

export const renewUserSessionAction = async (params: ActionParamsType) => {

    return renewUserSessionAsync(params.req, params.res);
};

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
    const dto = withValueOrBadRequest<ChangePasswordDTO>(req.body);
    const password = withValueOrBadRequest<string>(dto.password);
    const passwordCompare = withValueOrBadRequest<string>(dto.passwordCompare);
    const passwordResetToken = withValueOrBadRequest<string>(dto.passwordResetToken);

    return changePasswordAsync(userId, password, passwordCompare, passwordResetToken);
});

export const getCurrentUserAction = async (params: ActionParamsType) => {

    return getCurrentUser(params.req);
};

export const logOutUserAction = getAsyncActionHandler(async (req: Request, res: Response, next: NextFunction) => {

    const userId = getUserIdFromRequest(req);

    await logOutUserAsync(userId);

    // remove browser cookies
    res.clearCookie(staticProvider.globalConfig.misc.accessTokenCookieName);
    res.clearCookie(staticProvider.globalConfig.misc.refreshTokenCookieName);
});