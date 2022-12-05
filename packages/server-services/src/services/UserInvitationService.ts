import { User } from '../models/entity/misc/User';
import { UserEditSaveDTO } from '@episto/communication';
import { ErrorWithCode } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { getFullName } from '../utilities/helpers';
import { PrincipalId } from '@episto/x-core';
import { EmailService } from './EmailService';
import { LoggerService } from './LoggerService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
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
            isSurveyRequired,
            isTeacher,
            assignedRoleIds
        } = dto;

        if (!companyId)
            throw new ErrorWithCode(`Current user is not an administrator, 
                but has rights to add users, but has no company,  
                in which he/she could add users.`, 'bad request');

        // create user 
        const { invitationToken, createdUser } = await this
            .createInvitedUserAsync({
                email,
                departmentId,
                firstName,
                lastName,
                companyId,
                isSurveyRequired,
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
        isSurveyRequired,
        noEmailNotification
    }: {
        email: string;
        firstName: string;
        lastName: string;
        companyId: Id<'Company'>;
        departmentId: Id<'Department'>;
        isSurveyRequired: boolean;
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
                isSurveyRequired,
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
