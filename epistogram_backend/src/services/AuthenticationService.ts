import { DiscountCode } from '../models/entity/DiscountCode';
import { User } from '../models/entity/User';
import { AuthDataDTO } from '../shared/dtos/AuthDataDTO';
import { VerboseError } from '../shared/types/VerboseError';
import { Id } from '../shared/types/versionId';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { HashService } from './HashService';
import { GlobalConfiguration } from './misc/GlobalConfiguration';
import { log } from './misc/logger';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { PermissionService } from './PermissionService';
import { TokenService } from './TokenService';
import { UserService } from './UserService';
import { UserSessionActivityService } from './UserSessionActivityService';

export class AuthenticationService {

    constructor(
        private _ormService: ORMConnectionService,
        private _userService: UserService,
        private _tokenService: TokenService,
        private _userSessionActivityService: UserSessionActivityService,
        private _hashService: HashService,
        private _permissionService: PermissionService,
        private _globalConfig: GlobalConfiguration) {
    }

    getRequestAccessTokenPayload = (accessToken: string) => {

        const tokenPayload = this._tokenService.verifyAccessToken(accessToken);
        if (!tokenPayload)
            throw new VerboseError('Token is invalid.', 'bad request');

        return tokenPayload;
    };

    async establishAuthHandshakeAsync(refreshToken: string | null) {

        log('Establishing auth handshake...');

        await this._ormService
            .save(DiscountCode, [
                {
                    id: Id.create<'DiscountCode'>(1),
                    code: 'upd1',
                    userId: null
                },
                {
                    id: Id.create<'DiscountCode'>(1),
                    code: 'upd2',
                    userId: null
                }
            ]);

        if (!refreshToken)
            throw new VerboseError('Refresh token not found!', 'forbidden');

        const { userId } = this._tokenService
            .verifyRefreshToken(refreshToken);

        // get user 
        const currentUser = await this._userService
            .getUserDTOById(userId);

        if (!currentUser)
            throw new Error('User not found by id.');

        // save session activity
        await this._userSessionActivityService
            .saveUserSessionActivityAsync(currentUser.id, 'generic');

        // get permissions 
        const permissions = await this._permissionService
            .getPermissionMatrixAsync(userId, currentUser.companyId);

        // get new tokens
        const {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        } = await this._renewUserSessionAsync(userId, refreshToken);

        const authData: AuthDataDTO = {
            currentUser,
            permissions
        };

        return {
            authData,
            newAccessToken,
            newRefreshToken
        };
    }

    logInUser = async (email: string, password: string) => {

        // further validate request 
        if (!email || !password)
            throw new VerboseError('Email or password is null.', 'bad request');

        // authenticate
        const user = await this._userService
            .getUserByEmailAsync(email);

        if (!user)
            throw new VerboseError('Invalid email.', 'forbidden');

        const isPasswordCorrect = await this._hashService
            .comparePasswordAsync(password, user.password);

        if (!isPasswordCorrect)
            throw new VerboseError('Invalid password.', 'forbidden');

        const userId = user.id;

        await this._userSessionActivityService
            .saveUserSessionActivityAsync(userId, 'login');

        // get auth tokens 
        const tokens = await this.getUserLoginTokens(user);

        // set user current refresh token 
        await this._userService
            .setUserActiveRefreshToken(userId, tokens.refreshToken);

        return tokens;
    };

    logOutUserAsync = async (userId: PrincipalId) => {

        await this._userSessionActivityService
            .saveUserSessionActivityAsync(Id.create<'User'>(userId.toSQLValue()), 'logout');

        // remove refresh token, basically makes it invalid from now on
        await this._userService
            .removeRefreshToken(Id.create<'User'>(userId.toSQLValue()));
    };

    getUserLoginTokens = async (user: User) => {

        // get tokens
        const accessToken = this._tokenService.createAccessToken(user);
        const refreshToken = this._tokenService.createRefreshToken(user);

        return {
            accessToken,
            refreshToken
        };
    };

    private _renewUserSessionAsync = async (userId: Id<'User'>, prevRefreshToken: string) => {

        // BYPASS TOKEN IN DB CHECK IF LOCALHOST 
        if (!this._globalConfig.misc.isLocalhost) {

            // check if this refresh token is associated to the user
            const refreshTokenFromDb = await this._userService
                .getUserRefreshTokenById(userId);

            if (!refreshTokenFromDb)
                throw new VerboseError(`User has no active token, or it's not the same as the one in request! User id '${userId}', active token '${refreshTokenFromDb}'`, 'forbidden');
        }

        // get user 
        const user = await this._userService
            .getUserById(userId);

        if (!user)
            throw new VerboseError('User not found by id ' + userId, 'internal server error');

        // get tokens
        const { accessToken, refreshToken } = await this.getUserLoginTokens(user);

        // save refresh token to DB
        await this._userService
            .setUserActiveRefreshToken(user.id, prevRefreshToken);

        return {
            accessToken,
            refreshToken
        };
    };
}