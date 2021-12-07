
import { ChangePasswordDTO } from "../models/shared_models/SetNewPasswordDTO";
import { changePasswordAsync, getUserIdFromRequest, logInUser, logOutUserAsync, renewUserSessionAsync } from "../services/authenticationService";
import { getCurrentUser } from "../services/userService";
import { staticProvider } from "../staticProvider";
import { setAuthCookies } from "../utilities/cookieHelpers";
import { ActionParams, TypedError, withValueOrBadRequest } from "../utilities/helpers";

export const renewUserSessionAction = async (params: ActionParams) => {

    return renewUserSessionAsync(params.req, params.res);
};

export const logInUserAction = async (params: ActionParams) => {

    // check request 
    if (!params.req.body)
        throw new TypedError("Body is null.", "bad request");

    // get credentials from request
    const { email, password } = params.req.body;

    const { accessToken, refreshToken } = await logInUser(email, password);

    setAuthCookies(params.res, accessToken, refreshToken);
}

export const changePasswordAction = async (params: ActionParams) => {

    const userId = getUserIdFromRequest(params.req);
    const dto = withValueOrBadRequest<ChangePasswordDTO>(params.req.body);
    const password = withValueOrBadRequest<string>(dto.password);
    const passwordCompare = withValueOrBadRequest<string>(dto.passwordCompare);
    const passwordResetToken = withValueOrBadRequest<string>(dto.passwordResetToken);

    return changePasswordAsync(userId, password, passwordCompare, passwordResetToken);
};

export const getCurrentUserAction = async (params: ActionParams) => {

    const currentUser = await getCurrentUser(params.req);

    await staticProvider
        .services
        .userSessionActivityService
        .saveUserSessionActivityAsync(currentUser.id, "generic");

    return currentUser;
};

export const logOutUserAction = async (params: ActionParams) => {

    const userId = getUserIdFromRequest(params.req);

    await logOutUserAsync(userId);

    // remove browser cookies
    params.res.clearCookie(staticProvider.globalConfig.misc.accessTokenCookieName);
    params.res.clearCookie(staticProvider.globalConfig.misc.refreshTokenCookieName);
};