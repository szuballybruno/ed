import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import { RegistrationService } from '../services/RegistrationService';
import { CreateInvitedUserDTO } from '../shared/dtos/CreateInvitedUserDTO';
import { RegisterUserViaActivationCodeDTO } from '../shared/dtos/RegisterUserViaActivationCodeDTO';
import { RegisterUserViaInvitationTokenDTO } from '../shared/dtos/RegisterUserViaInvitationTokenDTO';
import { RegisterUserViaPublicTokenDTO } from '../shared/dtos/RegisterUserViaPublicTokenDTO';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ActionParams } from '../utilities/ActionParams';
import { setAuthCookies } from '../utilities/cookieHelpers';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class RegistrationController {

    private _registrationService: RegistrationService;
    private _config: GlobalConfiguration;

    constructor(
        res: RegistrationService,
        config: GlobalConfiguration) {

        this._registrationService = res;
        this._config = config;
    }

    @XControllerAction(apiRoutes.registration.registerUserViaPublicToken, { isPublic: true, isPost: true })
    registerUserViaPublicTokenAction = async (params: ActionParams) => {

        const body = params.getBody<RegisterUserViaPublicTokenDTO>();

        const { accessToken, refreshToken } = await this._registrationService
            .registerUserViaPublicTokenAsync(
                body.getValue(x => x.emailAddress, 'string'),
                body.getValue(x => x.firstName, 'string'),
                body.getValue(x => x.lastName, 'string'),
                body.getValue(x => x.registrationToken, 'string'));

        setAuthCookies(this._config, params.res, accessToken, refreshToken);
    };

    @XControllerAction(apiRoutes.registration.registerUserViaInvitationToken, { isPublic: true, isPost: true })
    registerUserViaInvitationTokenAction = async (params: ActionParams) => {

        const body = params.getBody<RegisterUserViaInvitationTokenDTO>();

        const { accessToken, refreshToken } = await this._registrationService
            .registerInvitedUserAsync(
                body.getValue(x => x.invitationToken, 'string'),
                body.getValue(x => x.password, 'string'),
                body.getValue(x => x.passwordCompare, 'string'));

        setAuthCookies(this._config, params.res, accessToken, refreshToken);
    };

    @XControllerAction(apiRoutes.registration.registerUserViaActivationCode, { isPublic: true, isPost: true })
    registerUserViaActivationCodeAction = async (params: ActionParams) => {

        const body = params.getBody<RegisterUserViaActivationCodeDTO>();

        await this._registrationService
            .registerUserViaActivationCodeAsync(
                body.getValue(x => x.activationCode, 'string'),
                body.getValue(x => x.emailAddress, 'string'),
                body.getValue(x => x.firstName, 'string'),
                body.getValue(x => x.lastName, 'string'));
    };

    @XControllerAction(apiRoutes.registration.inviteUser, { isPost: true })
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
            .inviteUserAsync(params.principalId, dto);
    };
}