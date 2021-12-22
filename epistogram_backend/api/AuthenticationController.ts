
import { ChangePasswordDTO } from "../models/shared_models/SetNewPasswordDTO";
import { AuthenticationService } from "../services/AuthenticationService";
import { UserService } from "../services/UserService";
import { staticProvider } from "../staticProvider";
import { setAuthCookies } from "../utilities/cookieHelpers";
import { ActionParams, TypedError } from "../utilities/helpers";

export class AuthenticationController {

    private _userService: UserService;
    private _authenticationService: AuthenticationService;

    constructor(authenticationService: AuthenticationService, userService: UserService) {

        this._userService = userService;
        this._authenticationService = authenticationService;
    }

    renewUserSessionAction = async (params: ActionParams) => {

        return this._authenticationService
            .renewUserSessionAsync(params.req, params.res);
    };

    logInUserAction = async (params: ActionParams) => {

        // check request 
        if (!params.req.body)
            throw new TypedError("Body is null.", "bad request");

        // get credentials from request
        const { email, password } = params.req.body;

        const { accessToken, refreshToken } = await this._authenticationService
            .logInUser(email, password);

        setAuthCookies(params.res, accessToken, refreshToken);
    }

    changePasswordAction = async (params: ActionParams) => {

        const dto = params.getBody<ChangePasswordDTO>();
        const password = dto.getValue<string>(x => x.password);
        const passwordCompare = dto.getValue<string>(x => x.passwordCompare);
        const passwordResetToken = dto.getValue<string>(x => x.passwordResetToken);

        return this._authenticationService
            .changePasswordAsync(params.userId, password, passwordCompare, passwordResetToken);
    };

    getCurrentUserAction = async (params: ActionParams) => {

        const currentUser = await this._userService
            .getUserDTOById(params.userId);

        if (!currentUser)
            throw new Error("User not found by id.");

        await staticProvider
            .services
            .userSessionActivityService
            .saveUserSessionActivityAsync(currentUser.id, "generic");

        return currentUser;
    };

    logOutUserAction = async (params: ActionParams) => {

        await this._authenticationService
            .logOutUserAsync(params.userId);

        // remove browser cookies
        params.res.clearCookie(staticProvider.globalConfig.misc.accessTokenCookieName);
        params.res.clearCookie(staticProvider.globalConfig.misc.refreshTokenCookieName);
    };
}