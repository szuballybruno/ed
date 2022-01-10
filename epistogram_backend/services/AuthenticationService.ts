import { User } from "../models/entity/User";
import { UserActivityFlatView } from "../models/views/UserActivityFlatView";
import { TypedError } from "../utilities/helpers";
import { EmailService } from "./EmailService";
import { HashService } from "./HashService";
import { GlobalConfiguration } from "./misc/GlobalConfiguration";
import { log } from "./misc/logger";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";
import { TokenService } from "./TokenService";
import { UserService } from "./UserService";
import { UserSessionActivityService } from "./UserSessionActivityService";

export class AuthenticationService {

    private _userService: UserService;
    private _tokenService: TokenService;
    private _userSessionActivityService: UserSessionActivityService;
    private _hashService: HashService;

    constructor(
        userService: UserService,
        tokenService: TokenService,
        userSessionActivityService: UserSessionActivityService,
        hashService: HashService) {

        this._userService = userService;
        this._tokenService = tokenService;
        this._userSessionActivityService = userSessionActivityService;
        this._hashService = hashService;
    }

    getRequestAccessTokenPayload = (accessToken: string) => {

        if (!accessToken)
            throw new TypedError("Token not sent.", "bad request");

        const tokenPayload = this._tokenService.verifyAccessToken(accessToken);
        if (!tokenPayload)
            throw new TypedError("Token is invalid.", "bad request");

        return tokenPayload;
    }

    async getCurrentUserAsync(userId: number) {

        const currentUser = await this._userService
            .getUserDTOById(userId);

        if (!currentUser)
            throw new Error("User not found by id.");

        await this._userSessionActivityService
            .saveUserSessionActivityAsync(currentUser.id, "generic");

        return currentUser;
    }

    renewUserSessionAsync = async (prevRefreshToken: string) => {

        log("Renewing user session...");

        // check if there is a refresh token sent in the request 
        if (!prevRefreshToken)
            throw new TypedError("Refresh token not sent.", "bad request");

        // check sent refresh token if invalid by signature or expired
        const tokenMeta = this._tokenService.verifyRefreshToken(prevRefreshToken);

        // check if this refresh token is associated to the user
        const refreshTokenFromDb = await this._userService
            .getUserActiveTokenById(tokenMeta.userId);

        if (!refreshTokenFromDb)
            throw new TypedError(`User has no active token, or it's not the same as the one in request! User id '${tokenMeta.userId}', active token '${refreshTokenFromDb}'`, "forbidden");

        // get user 
        const user = await this._userService
            .getUserById(tokenMeta.userId);

        if (!user)
            throw new TypedError("User not found by id " + tokenMeta.userId, "internal server error");

        // get tokens
        const { accessToken, refreshToken } = await this.getUserLoginTokens(user, user.userActivity);

        // save refresh token to DB
        await this._userService
            .setUserActiveRefreshToken(user.id, prevRefreshToken);

        return {
            accessToken,
            refreshToken
        }
    }

    logInUser = async (email: string, password: string) => {

        log(`Logging in user... ${email} - ${password}`);

        // further validate request 
        if (!email || !password)
            throw new TypedError("Email or password is null.", "bad request");

        // authenticate
        const user = await this._userService
            .getUserByEmailAsync(email);

        if (!user)
            throw new TypedError("Invalid email.", "forbidden");

        const isPasswordCorrect = await this._hashService
            .comparePasswordAsync(password, user.password);

        if (!isPasswordCorrect)
            throw new TypedError("Invalid password.", "forbidden");

        const userId = user.id;

        await this._userSessionActivityService
            .saveUserSessionActivityAsync(userId, "login");

        // get auth tokens 
        const tokens = await this.getUserLoginTokens(user, user.userActivity);

        // set user current refresh token 
        await this._userService
            .setUserActiveRefreshToken(userId, tokens.refreshToken);

        return tokens;
    }

    logOutUserAsync = async (userId: number) => {

        await this._userSessionActivityService
            .saveUserSessionActivityAsync(userId, "logout");

        // remove refresh token, basically makes it invalid from now on
        await this._userService
            .removeRefreshToken(userId);
    }

    getUserLoginTokens = async (user: User, activity: UserActivityFlatView) => {

        // get tokens
        const accessToken = this._tokenService.createAccessToken(user, activity);
        const refreshToken = this._tokenService.createRefreshToken(user);

        return {
            accessToken,
            refreshToken
        }
    }
}