import { Company } from '../models/entity/misc/Company';
import { TokenPair } from '../models/TokenPair';
import { validatePassowrd } from '../shared/logic/sharedLogic';
import { ErrorWithCode } from '../shared/types/ErrorWithCode';
import { throwNotImplemented } from '../utilities/helpers';
import { ActivationCodeService } from './ActivationCodeService';
import { AuthenticationService } from './AuthenticationService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { PermissionService } from './PermissionService';
import { TokenService } from './TokenService';
import { UserInvitationService } from './UserInvitationService';
import { UserService } from './UserService';

export class UserRegistrationService {

    constructor(
        private _userInvitationService: UserInvitationService,
        private _activationCodeService: ActivationCodeService,
        private _userService: UserService,
        private _tokenService: TokenService,
        private _ormService: ORMConnectionService,
        private _authenticationService: AuthenticationService,
        private _permissionService: PermissionService) {
    }

    /**
     * This function registers a user using an activation code.
     * If said code is valid, it will be marked as used as there 
     * can not be another registration made with it.
     */
    async selfRegisterWithActivationCodeAsync(
        activationCode: string,
        email: string,
        firstName: string,
        lastName: string) {

        // check code
        const activationCodeEntity = await this._activationCodeService
            .isValidCodeAsync(activationCode);

        if (!activationCodeEntity)
            throw new ErrorWithCode(`Activation code ${activationCode} not found in DB, or already used.`, 'activation_code_issue');

        const { companyId } = activationCodeEntity;

        const { isSurveyRequired } = await this
            ._ormService
            .getSingleById(Company, companyId);

        // TODO
        // default depatment
        // const {} = await this
        //     ._ormService
        //     .query(User, { principalId })
        //     .select(Company)
        //     .leftJoin(Company, x => x
        //         .on('id', '=', 'companyId', User))
        //     .where('id', '=', 'principalId')
        //     .getSingle();

        // create user
        await this
            ._userInvitationService
            .createInvitedUserAsync({
                email,
                firstName,
                lastName,
                companyId,
                departmentId: 26 as any,
                isSurveyRequired
            });

        // invalidate activation code
        await this._activationCodeService
            .invalidateCodeAsync(activationCodeEntity.id);
    }

    /**
     * Accept user invitation
     */
    async selfRegisterWithInvitationTokenAsync(
        invitationToken: string,
        password: string,
        passwordControl: string) {

        // verify token
        const { userEmail } = this
            ._tokenService
            .verifyInvitaionToken(invitationToken);

        // check if user exists
        const user = await this._userService
            .getUserByEmailAsync(userEmail);

        if (!user)
            throw new ErrorWithCode('No such user!', 'bad request');

        const userId = user.id;

        // check passwords
        if (validatePassowrd(password, passwordControl))
            throw new ErrorWithCode('Password is invalid.', 'bad request');

        // update user
        await this._userService
            .setUserInivitationDataAsync(userId, password);

        // Assign ACCESS_APPLICATION permission to user
        await this._permissionService
            .assignPermission(userId, 'ACCESS_APPLICATION');

        // get auth tokens
        const tokens = await this._authenticationService
            .getUserLoginTokens(user);

        // set user current refresh token
        await this._userService
            .setUserActiveRefreshToken(userId, tokens.refreshToken);

        return tokens;
    }

    /**
     * This function registers a new user using a public access token.
     * Public access tokens come from public links, such as QR codes.
     */
    async selfRegisterViaPublicTokenAsync(
        publicRegToken: string,
        email: string,
        firstName: string,
        lastName: string): Promise<TokenPair> {

        throw throwNotImplemented();
        // // verify public reg token
        // this._tokenService.verifyPublicRegistrationToken(publicRegToken);

        // // get new password
        // const generatedPassword = this.getDefaultPassword();

        // // create user
        // const user = await this._userService
        //     .createUserAsync({
        //         email,
        //         firstName,
        //         lastName,
        //         registrationType: 'PublicRegistrationToken',
        //         password: generatedPassword
        //     });

        // const userId = user.id;

        // // send mail
        // await this._emailService
        //     .sendSuccessfulRegistrationEmailAsync(user, generatedPassword);

        // // get auth tokens
        // const tokens = await this._authenticationService
        //     .getUserLoginTokens(user);

        // // set user current refresh token
        // await this._userService
        //     .setUserActiveRefreshToken(userId, tokens.refreshToken);

        // return tokens;
    }
}
