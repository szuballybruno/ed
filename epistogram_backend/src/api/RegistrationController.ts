import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import { RegistrationService } from '../services/RegistrationService';
import { RoleService } from '../services/RoleService';
import { UserService } from '../services/UserService';
import { CreateInvitedUserDTO } from '../shared/dtos/CreateInvitedUserDTO';
import { RegisterUserViaActivationCodeDTO } from '../shared/dtos/RegisterUserViaActivationCodeDTO';
import { RegisterUserViaInvitationTokenDTO } from '../shared/dtos/RegisterUserViaInvitationTokenDTO';
import { RegisterUserViaPublicTokenDTO } from '../shared/dtos/RegisterUserViaPublicTokenDTO';
import { RoleIdEnum } from '../shared/types/sharedTypes';
import { setAuthCookies } from '../utilities/cookieHelpers';
import { ActionParams, ErrorCode } from '../utilities/helpers';

export class RegistrationController {

    private _registrationService: RegistrationService;
    private _userService: UserService;
    private _config: GlobalConfiguration;

    constructor(
        res: RegistrationService,
        userService: UserService,
        config: GlobalConfiguration) {

        this._registrationService = res;
        this._userService = userService;
        this._config = config;
    }

    registerUserViaPublicTokenAction = async (params: ActionParams) => {

        const body = params.getBody<RegisterUserViaPublicTokenDTO>();

        const { accessToken, refreshToken } = await this._registrationService
            .registerUserViaPublicTokenAsync(
                body.getValue<string>(x => x.emailAddress),
                body.getValue<string>(x => x.firstName),
                body.getValue<string>(x => x.lastName),
                body.getValue<string>(x => x.registrationToken));

        setAuthCookies(this._config, params.res, accessToken, refreshToken);
    };

    registerUserViaInvitationTokenAction = async (params: ActionParams) => {

        const body = params.getBody<RegisterUserViaInvitationTokenDTO>();

        const { accessToken, refreshToken } = await this._registrationService
            .registerInvitedUserAsync(
                body.getValue<string>(x => x.invitationToken),
                body.getValue<string>(x => x.password),
                body.getValue<string>(x => x.passwordCompare));

        setAuthCookies(this._config, params.res, accessToken, refreshToken);
    };

    registerUserViaActivationCodeAction = async (params: ActionParams) => {

        const body = params.getBody<RegisterUserViaActivationCodeDTO>();

        await this._registrationService
            .registerUserViaActivationCodeAsync(
                body.getValue<string>(x => x.activationCode),
                body.getValue<string>(x => x.emailAddress),
                body.getValue<string>(x => x.firstName),
                body.getValue<string>(x => x.lastName));
    };

    inviteUserAction = async (params: ActionParams) => {

        const dto = params
            .getBody<CreateInvitedUserDTO>([
                'companyId',
                'email',
                'firstName',
                'lastName',
                'roleId',
                'jobTitleId'
            ]).data;

        return await this._registrationService
            .inviteUserAsync(params.currentUserId, dto);
    };
}