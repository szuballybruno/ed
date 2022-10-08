import generatePassword from 'password-generator';
import { Permission } from '../models/entity/authorization/Permission';
import { PermissionAssignmentBridge } from '../models/entity/authorization/PermissionAssignmentBridge';
import { TokenPair } from '../models/TokenPair';
import { CreateInvitedUserDTO } from '../shared/dtos/CreateInvitedUserDTO';
import { validatePassowrd } from '../shared/logic/sharedLogic';
import { ErrorWithCode } from '../shared/types/ErrorWithCode';
import { permissionCodes } from '../shared/types/PermissionCodesType';
import { Id } from '../shared/types/versionId';
import { getFullName, throwNotImplemented } from '../utilities/helpers';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { ActivationCodeService } from './ActivationCodeService';
import { AuthenticationService } from './AuthenticationService';
import { AuthorizationService } from './AuthorizationService';
import { EmailService } from './EmailService';
import { LoggerService } from './LoggerService';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { RoleService } from './RoleService';
import { TokenService } from './TokenService';
import { UserService } from './UserService';

export class RegistrationService {

    constructor(
        private _activationCodeService: ActivationCodeService,
        private _emailService: EmailService,
        private _userService: UserService,
        private _authenticationService: AuthenticationService,
        private _authorizationService: AuthorizationService,
        private _tokenService: TokenService,
        private _ormService: ORMConnectionService,
        private _roleService: RoleService,
        private _mapperService: MapperService,
        private _loggerService: LoggerService) {
    }

    inviteUserAsync = async (principalId: PrincipalId, dto: CreateInvitedUserDTO) => {

        const { companyId } = dto;
        if (!companyId)
            throw new ErrorWithCode(
                `Current user is not an administrator, 
                        but has rights to add users, but has no company,  
                        in which he/she could add users.`, 'bad request');

        // create user
        await this
            .inviteNewUserAsync({
                email: dto.email,
                departmentId: dto.departmentId,
                firstName: dto.firstName,
                lastName: dto.lastName,
                companyId: companyId,
            });
    };

    /**
     * This function registers a user using an activation code.
     * If said code is valid, it will be marked as used as there can not be another registration made with it.
     */
    async registerUserViaActivationCodeAsync(
        principalId: PrincipalId,
        activationCode: string,
        email: string,
        firstName: string,
        lastName: string) {

        // check code
        const activationCodeEntity = await this._activationCodeService
            .isValidCodeAsync(activationCode);

        if (!activationCodeEntity)
            throw new ErrorWithCode(`Activation code ${activationCode} not found in DB, or already used.`, 'activation_code_issue');

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
        await this.inviteNewUserAsync({
            email,
            firstName,
            lastName,
            companyId: activationCodeEntity.companyId,
            departmentId: 1 as any
        });

        // invalidate activation code
        await this._activationCodeService
            .invalidateCodeAsync(activationCodeEntity.id);
    }

    /**
     * This function registers a new user using a public access token.
     * Public access tokens come from public links, such as QR codes.
     */
    registerUserViaPublicTokenAsync = async (
        publicRegToken: string,
        email: string,
        firstName: string,
        lastName: string): Promise<TokenPair> => {

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
    };

    /**
     */
    async registerInvitedUserAsync(
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

        const permissions = Object.values(permissionCodes) as any as Permission[];
        const accessAdminId = permissions.find(x => x.code === 'ACCESS_APPLICATION')?.id;

        if (!accessAdminId)
            throw new ErrorWithCode('Couldn\'t get access permission.', 'internal server error');


        // Assign ACCESS_APPLICATION permission to user
        await this
            ._ormService
            .createAsync(PermissionAssignmentBridge, {
                permissionId: accessAdminId,
                assigneeUserId: userId,
                assigneeCompanyId: null,
                assigneeGroupId: null,
                contextCompanyId: null,
                contextCourseId: null
            });

        // get auth tokens
        const tokens = await this._authenticationService
            .getUserLoginTokens(user);

        // set user current refresh token
        await this._userService
            .setUserActiveRefreshToken(userId, tokens.refreshToken);

        return tokens;
    }

    /**
     * This function creates a new invited user,
     * generates an invitation token,
     * and sends it as a mail to the given email address.
     */
    async inviteNewUserAsync(
        options: {
            email: string;
            firstName: string;
            lastName: string;
            companyId: Id<'Company'>;
            departmentId: Id<'Department'>;
        },
        noEmailNotification?: boolean) {

        const { email, companyId, firstName, departmentId, lastName } = options;

        // create invitation token
        const invitationToken = this._tokenService
            .createInvitationToken(email);

        // create user
        const createdUser = await this._userService
            .createUserAsync({
                email,
                firstName,
                lastName,
                creationDate: new Date(Date.now()),
                companyId,
                departmentId,
                registrationType: 'Invitation',
                password: 'guest',
                invitationToken,
                isGod: false,
                avatarFileId: null,
                deletionDate: null,
                isInvitationAccepted: false,
                isTrusted: true,
                linkedInUrl: null,
                phoneNumber: null,
                refreshToken: null,
                resetPasswordToken: null,
                userDescription: null,
                username: ''
            }, 'guest');

        // send email
        if (!noEmailNotification) {

            this._loggerService
                .logScoped('REGISTRATION', 'Sending mail... to: ' + email);

            await this._emailService
                .sendInvitaitionMailAsync(invitationToken, email, getFullName(createdUser), companyId);
        }

        return { invitationToken, createdUser };
    }

    /**
     * Get a default password that can be sent to users,
     * and they can change it later to something stronger.
     */
    private getDefaultPassword = () => {

        return generatePassword(10);
    };
}
