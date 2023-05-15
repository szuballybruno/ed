import { User } from '../models/tables/User';
import { UserEditSaveDTO } from '@episto/communication';
import { ErrorWithCode } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { getFullName } from '../utilities/helpers';
import { PrincipalId } from '@episto/x-core';
import { EmailService } from './EmailService';
import { LoggerService } from './LoggerService';
import { ORMConnectionService } from './ORMConnectionService';
import { RoleService } from './RoleService';
import { TokenService } from './TokenService';
import { UserService } from './UserService';
import { normalizeToEnglishLowercase } from '@episto/commonlogic';

export class UserInvitationService {

    constructor(
        private _emailService: EmailService,
        private _userService: UserService,
        private _tokenService: TokenService,
        private _ormService: ORMConnectionService,
        private _loggerService: LoggerService,
        private _roleService: RoleService) {
    }

    /**
     * Invite user from admin
     */
    async inviteUserAsync(principalId: PrincipalId, dto: UserEditSaveDTO) {

        const {
            companyId,
            departmentId,
            email,
            firstName,
            lastName,
            isTeacher,
            assignedRoleIds
        } = dto;

        if (!companyId)
            throw new ErrorWithCode(`A jelenlegi felhasználó nem adminisztrátor, 
            ugyanakkor van jogosultsága felhasználót hozzáadni. 
            A hiba oka, hogy a felhasználó nem rendelkezik céggel 
            ahova felhasználót adhatna hozzá`, 'bad request');

        // create user 
        const { invitationToken, createdUser } = await this
            .createInvitedUserAsync({
                email,
                departmentId,
                firstName,
                lastName,
                companyId,
                noEmailNotification: true
            });

        const { id: userId } = createdUser;

        // save teacher info
        await this
            ._userService
            .saveTeacherInfoAsync(userId, isTeacher);

        // roles
        await this
            ._roleService
            .saveUserRolesAsync(principalId, userId, assignedRoleIds);

        // send email
        await this.sendUserInvitationMailAsync(invitationToken, createdUser);
    }

    /**
     * This function creates a new invited user,
     * generates an invitation token,
     * and sends it as a mail to the given email address.
     */
    async createInvitedUserAsync({
        email,
        companyId,
        firstName,
        departmentId,
        lastName,
        noEmailNotification
    }: {
        email: string;
        firstName: string;
        lastName: string;
        companyId: Id<'Company'>;
        departmentId: Id<'Department'>;
        noEmailNotification?: boolean;
    }) {

        // create invitation token
        const invitationToken = this._tokenService
            .createInvitationToken(email);

        // create user
        const createdUser = await this._userService
            .createUserSimpleAsync({
                email,
                firstName,
                lastName,
                companyId,
                departmentId,
                registrationType: 'Invitation',
                invitationToken,
                registrationState: 'invited',
                unhashedPassword: 'guest',
                username: normalizeToEnglishLowercase(`${lastName}${firstName}`)
            });

        // send email
        if (!noEmailNotification)
            await this.sendUserInvitationMailAsync(invitationToken, createdUser);

        return { invitationToken, createdUser };
    }

    async sendUserInvitationMailAsync(
        invitationToken: string,
        createdUser: User) {

        const { email, companyId } = createdUser;

        this._loggerService
            .logScoped('REGISTRATION', 'Sending mail... to: ' + email);

        await this._emailService
            .sendInvitaitionMailAsync(invitationToken, email, getFullName(createdUser), companyId);
    }
}
