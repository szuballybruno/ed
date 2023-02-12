import { ErrorWithCode, Id } from '@episto/commontypes';
import { AuthDataDTO } from '@episto/communication';
import { PrincipalId } from '@thinkhub/x-core';
import { User } from '../models/tables/User';
import { HashService } from './HashService';
import { LoggerService } from './LoggerService';
import { GlobalConfigurationService } from './GlobalConfigurationService';
import { ORMConnectionService } from './ORMConnectionService';
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
        private _globalConfig: GlobalConfigurationService,
        private _loggerService: LoggerService) {
    }

    /**
     * Retrieve access token payload 
     */
    getRequestAccessTokenPayload(accessToken: string) {

        const tokenPayload = this._tokenService.verifyAccessToken(accessToken);
        if (!tokenPayload)
            throw new ErrorWithCode('Token is invalid.', 'bad request');

        return tokenPayload;
    }

    /**
     * Acquires a new access token by a refresh token
     */
    async establishAuthHandshakeAsync(refreshToken: string | null, companyId: Id<'Company'>) {

        try {

            this._loggerService
                .logScoped('GENERIC', 'Establishing auth handshake...');

            /**
         * Check and verify refresh token
         */
            if (!refreshToken)
                throw new ErrorWithCode('Refresh token not found!', 'unauthorized');

            const { userId } = this._tokenService
                .verifyRefreshToken(refreshToken);

            /**
             * Check user 
             */
            const currentUser = await this._userService
                .getUserDTOById(userId);

            if (!currentUser)
                throw new ErrorWithCode('User not found by id.', 'unauthorized');

            /**
             * Check user company
            */
            await this.authorizeUserByCompanyAsync(userId, companyId);

            /**
             * Save activity
            */
            await this._userSessionActivityService
                .saveUserSessionActivityAsync(currentUser.id, 'generic');

            /**
             * Get user's permissions 
            */
            const permissions = await this._permissionService
                .getPermissionMatrixAsync(userId, currentUser.companyId);

            /**
             * Get new tokens for user 
             */
            const tokens = await this
                ._renewUserSessionAsync(userId, refreshToken);

            const authData: AuthDataDTO = {
                currentUser,
                permissions
            };

            return {
                authData,
                newAccessToken: tokens.accessToken,
                newRefreshToken: tokens.refreshToken
            };
        }
        catch (e) {

            throw new ErrorWithCode('Handshake error.', 'unauthorized');
        }
    }

    /**
     * Acquires new tokens for the user
     * creates session activity 
     */
    async logInUserAsync(email: string, password: string, companyId: Id<'Company'>) {

        /**
         * Check if sent credentials are valid 
         */
        if (!email || !password)
            throw new ErrorWithCode('Email or password is null.', 'corrupt_credentials');

        /**
         * Check if user exists by email
         */
        const user = await this._userService
            .getUserByEmailAsync(email);

        if (!user)
            throw new ErrorWithCode('Invalid email.', 'corrupt_credentials');

        /**
         * Check company
         */
        await this.authorizeUserByCompanyAsync(user, companyId);

        /**
         * Check password 
         */
        const isPasswordCorrect = await this._hashService
            .comparePasswordAsync(password, user.password!);

        if (!isPasswordCorrect)
            throw new ErrorWithCode('Invalid password.', 'corrupt_credentials');

        /**
         * Login user 
         */
        const tokens = await this
            .loginUserInternallyAsync(user.id);

        return tokens;
    }

    /**
     * Logs out a user  
     */
    logOutUserAsync = async (principalId: PrincipalId) => {

        await this._userSessionActivityService
            .saveUserSessionActivityAsync(principalId.getId(), 'logout');

        // remove refresh token, basically makes it invalid from now on
        await this._userService
            .removeRefreshToken(principalId.getId());
    };

    /**
     * Checks if company id matches user's company,
     * otherwise throws error 
     */
    async authorizeUserByCompanyAsync(userIdOrUser: Id<'User'> | User, companyId: Id<'Company'>) {

        const user = typeof userIdOrUser === 'number'
            ? await this._ormService
                .getSingleById(User, userIdOrUser)
            : userIdOrUser as User;

        if (user.companyId !== companyId)
            throw new ErrorWithCode('User company differs from provided comapny id!', 'unauthorized');
    }

    async loginUserInternallyAsync(userId: Id<'User'>) {

        // get user 
        const user = await this._userService
            .getUserById(userId);

        if (!user)
            throw new ErrorWithCode('User not found by id ' + userId, 'internal server error');

        // Save session activity
        await this
            ._userSessionActivityService
            .saveUserSessionActivityAsync(userId, 'login');

        // get tokens
        const tokens = await this
            ._getUserLoginTokens(user);

        // save refresh token to DB
        await this
            ._userService
            .setUserActiveRefreshToken(user.id, tokens.refreshToken);

        return tokens;
    }

    /**
     * Creates user tokens
     */
    private async _getUserLoginTokens(user: User) {

        // get tokens
        const accessToken = this._tokenService.createAccessToken(user);
        const refreshToken = this._tokenService.createRefreshToken(user);

        return {
            accessToken,
            refreshToken
        };
    }

    private _renewUserSessionAsync = async (userId: Id<'User'>, prevRefreshToken: string) => {

        // BYPASS TOKEN IN DB CHECK IF LOCALHOST 
        if (!this._globalConfig.misc.bypassDBTokenCheck) {

            // check if this refresh token is associated to the user
            const refreshTokenFromDb = await this._userService
                .getUserRefreshTokenById(userId);

            if (!refreshTokenFromDb)
                throw new ErrorWithCode(`User has no active token, or it's not the same as the one in request! User id '${userId}', active token '${refreshTokenFromDb}'`, 'forbidden');
        }

        const tokens = await this
            .loginUserInternallyAsync(userId);

        return tokens;
    };
}