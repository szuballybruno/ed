import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import { RegistrationService } from '../services/RegistrationService';
import { CreateInvitedUserDTO } from '../shared/dtos/CreateInvitedUserDTO';
import { RegisterUserViaActivationCodeDTO } from '../shared/dtos/RegisterUserViaActivationCodeDTO';
import { RegisterUserViaInvitationTokenDTO } from '../shared/dtos/RegisterUserViaInvitationTokenDTO';
import { RegisterUserViaPublicTokenDTO } from '../shared/dtos/RegisterUserViaPublicTokenDTO';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { setAuthCookies } from '../utilities/cookieHelpers';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { AuthorizationService } from '../services/AuthorizationService';
import { AuthorizationResult, XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class RegistrationController implements XController<RegistrationController> {

    private _registrationService: RegistrationService;
    private _config: GlobalConfiguration;
    private _authorizationService: AuthorizationService;

    constructor(serviceProvider: ServiceProvider) {

        this._registrationService = serviceProvider.getService(RegistrationService);
        this._config = serviceProvider.getService(GlobalConfiguration);
        this._authorizationService = serviceProvider.getService(AuthorizationService);
    }

    @XControllerAction(apiRoutes.registration.registerUserViaPublicToken, { isPublic: true, isPost: true })
    async registerUserViaPublicTokenAction(params: ActionParams) {

        const body = params.getBody<RegisterUserViaPublicTokenDTO>();

        const { accessToken, refreshToken } = await this._registrationService
            .registerUserViaPublicTokenAsync(
                body.getValue(x => x.emailAddress, 'string'),
                body.getValue(x => x.firstName, 'string'),
                body.getValue(x => x.lastName, 'string'),
                body.getValue(x => x.registrationToken, 'string'));

        setAuthCookies(this._config, params.res, accessToken, refreshToken, this._config.cookieOptions);

    }

    @XControllerAction(apiRoutes.registration.registerUserViaInvitationToken, { isPublic: true, isPost: true })
    async registerUserViaInvitationTokenAction(params: ActionParams) {

        const body = params.getBody<RegisterUserViaInvitationTokenDTO>();

        const { accessToken, refreshToken } = await this._registrationService
            .registerInvitedUserAsync(
                body.getValue(x => x.invitationToken, 'string'),
                body.getValue(x => x.password, 'string'),
                body.getValue(x => x.passwordCompare, 'string'));

        setAuthCookies(this._config, params.res, accessToken, refreshToken, this._config.cookieOptions);
    }

    @XControllerAction(apiRoutes.registration.registerUserViaActivationCode, { isPublic: true, isPost: true })
    async registerUserViaActivationCodeAction(params: ActionParams) {
        const body = params.getBody<RegisterUserViaActivationCodeDTO>();

        await this._registrationService
            .registerUserViaActivationCodeAsync(
                params.principalId,
                body.getValue(x => x.activationCode, 'string'),
                body.getValue(x => x.emailAddress, 'string'),
                body.getValue(x => x.firstName, 'string'),
                body.getValue(x => x.lastName, 'string'));
    }

    @XControllerAction(apiRoutes.registration.inviteUser, { isPost: true })
    async inviteUserAction(params: ActionParams) {

        const dto = params
            .getBody<CreateInvitedUserDTO>([
                'companyId',
                'email',
                'firstName',
                'lastName',
                'departmentId'
            ]).data;

        return await this._registrationService
            .inviteUserAsync(params.principalId, dto);

    }
}
