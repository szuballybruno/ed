import { Company } from '../models/entity/misc/Company';
import { CreateInvitedUserDTO } from '../shared/dtos/CreateInvitedUserDTO';
import { ErrorWithCode } from '../shared/types/ErrorWithCode';
import { Id } from '../shared/types/versionId';
import { getFullName } from '../utilities/helpers';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { EmailService } from './EmailService';
import { LoggerService } from './LoggerService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { TokenService } from './TokenService';
import { UserService } from './UserService';

export class UserInvitationService {

    constructor(
        private _emailService: EmailService,
        private _userService: UserService,
        private _tokenService: TokenService,
        private _ormService: ORMConnectionService,
        private _loggerService: LoggerService) {
    }

    /**
     * Invite user from admin? TODO
     */
    async inviteUserAsync(principalId: PrincipalId, dto: CreateInvitedUserDTO) {

        const {
            companyId,
            departmentId,
            email,
            firstName,
            lastName,
        } = dto;

        if (!companyId)
            throw new ErrorWithCode(`Current user is not an administrator, 
                but has rights to add users, but has no company,  
                in which he/she could add users.`, 'bad request');

        const { isSurveyRequired } = await this
            ._ormService
            .getSingleById(Company, companyId);

        await this
            .createInvitedUserAsync({
                email,
                departmentId,
                firstName,
                lastName,
                companyId,
                isSurveyRequired
            });
    }

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
            companyId: Id<'Company'>;
            departmentId: Id<'Department'>;
            isSurveyRequired: boolean;
        },
        noEmailNotification?: boolean) {

        const { email, companyId, firstName, departmentId, lastName, isSurveyRequired } = options;

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
                username: '',
                isSurveyRequired
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
}
