import generatePassword from 'password-generator';
import { PermissionAssignmentBridge } from '../models/entity/authorization/PermissionAssignmentBridge';
import { CreateInvitedUserDTO } from '../shared/dtos/CreateInvitedUserDTO';
import { validatePassowrd } from '../shared/logic/sharedLogic';
import { JobTitleIdEnum, RoleIdEnum } from '../shared/types/sharedTypes';
import { VerboseError } from '../shared/types/VerboseError';
import { PrincipalId } from '../utilities/ActionParams';
import { getFullName, throwNotImplemented } from '../utilities/helpers';
import { ActivationCodeService } from './ActivationCodeService';
import { AuthenticationService } from './AuthenticationService';
import { AuthorizationService } from './AuthorizationService';
import { EmailService } from './EmailService';
import { MapperService } from './MapperService';
import { log } from './misc/logger';
import { ServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { RoleService } from './RoleService';
import { TokenService } from './TokenService';
import { UserService } from './UserService';

export class RegistrationService extends ServiceBase {

    private _activationCodeService: ActivationCodeService;
    private _emailService: EmailService;
    private _userService: UserService;
    private _authenticationService: AuthenticationService;
    private _authorizationService: AuthorizationService;
    private _tokenService: TokenService;
    private _roleService: RoleService;

    constructor(
        acs: ActivationCodeService,
        emailService: EmailService,
        userService: UserService,
        authenticationService: AuthenticationService,
        authorizationService: AuthorizationService,
        tokenService: TokenService,
        ormService: ORMConnectionService,
        roleService: RoleService,
        mapperService: MapperService) {

        super(mapperService, ormService);

        this._userService = userService;
        this._authenticationService = authenticationService;
        this._authorizationService = authorizationService
        this._activationCodeService = acs;
        this._emailService = emailService;
        this._tokenService = tokenService;
        this._ormService = ormService;
        this._roleService = roleService;
    }

    inviteUserAsync = async (principalId: PrincipalId, dto: CreateInvitedUserDTO) => {

        const userId = principalId.toSQLValue();

        if (!dto.companyId)
            return

        const companyId = dto.companyId

        // const hasSetUserCompanyPermission = this._roleService
        //     .findPermissionAsync(userId,  'canSetInvitedUserCompany');

        // // if user is admin require companyId to be provided
        // // otherwise use the current user's company
        // const companyId = currentUser.roleId === RoleIdEnum.administrator
        //     ? dto.data.companyId
        //     : currentUser.companyId;

        // TODO

        if (!companyId)
            throw new VerboseError(
                `Current user is not an administrator, 
                        but has rights to add users, but has no company,  
                        in which he/she could add users.`, 'bad request');

        // create user
        await this
            .createInvitedUserAsync({
                email: dto.email,
                jobTitleId: dto.jobTitleId,
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
        activationCode: string,
        email: string,
        firstName: string,
        lastName: string) {

        // check code 
        const activationCodeEntity = await this._activationCodeService
            .isValidCodeAsync(activationCode);

        if (!activationCodeEntity)
            throw new VerboseError(`Activation code ${activationCode} not found in DB, or already used.`, 'activation_code_issue');

        // create user 
        await this.createInvitedUserAsync({
            email,
            firstName,
            lastName,
            companyId: activationCodeEntity.companyId,
            jobTitleId: JobTitleIdEnum.genericUser
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
        lastName: string) => {

        return throwNotImplemented();
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
    registerInvitedUserAsync = async (
        invitationToken: string,
        password: string,
        passwordControl: string) => {

        // verify token 
        const { userEmail } = this._tokenService.verifyInvitaionToken(invitationToken);

        // check if user exists  
        const user = await this._userService
            .getUserByEmailAsync(userEmail);

        if (!user)
            throw new VerboseError('No such user!', 'bad request');

        const userId = user.id;

        // check passwords 
        if (validatePassowrd(password, passwordControl))
            throw new VerboseError('Password is invalid.', 'bad request');

        // update user 
        await this._userService
            .setUserInivitationDataAsync(userId, password);

        // Assign ACCESS_APPLICATION permission to user
        await this
            ._ormService
            .getRepository(PermissionAssignmentBridge)
            .insert({
                permissionId: 35,
                assigneeUserId: userId
            })

        // get auth tokens 
        const tokens = await this._authenticationService
            .getUserLoginTokens(user);

        // set user current refresh token 
        await this._userService
            .setUserActiveRefreshToken(userId, tokens.refreshToken);

        return tokens;
    };

    /**
     * This function creates a new invited user, 
     * generates an invitation token, 
     * and sends it as a mail to the given email address. 
     */
    async createInvitedUserAsync(
        options: {
            email: string;
            firstName: string;
            lastName: string;
            companyId: number;
            jobTitleId: number;
            isGod?: boolean;
        },
        noEmailNotification?: boolean) {

        throwNotImplemented();
        // const email = options.email;

        // // create invitation token
        // const invitationToken = this._tokenService
        //     .createInvitationToken(email);

        // // create user 
        // const createdUser = await this._userService
        //     .createUserAsync({
        //         email,
        //         firstName: options.firstName,
        //         lastName: options.lastName,
        //         companyId: options.companyId,
        //         roleId: options.roleId,
        //         jobTitleId: options.jobTitleId,
        //         registrationType: 'Invitation',
        //         password: 'guest',
        //         invitationToken,
        //         isGod: options.isGod
        //     });

        // // send email
        // if (!noEmailNotification) {

        //     log('Sending mail... to: ' + email);

        //     await this._emailService
        //         .sendInvitaitionMailAsync(invitationToken, email, getFullName(createdUser));
        // }

        // return { invitationToken, createdUser };
    }

    /**
     * Get a default password that can be sent to users, 
     * and they can change it later to something stronger.
     */
    private getDefaultPassword = () => {

        return generatePassword(10);
    };
}