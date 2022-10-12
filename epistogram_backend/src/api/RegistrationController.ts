import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import { UserRegistrationService } from '../services/UserRegistrationService';
import { RegisterUserViaActivationCodeDTO } from '../shared/dtos/RegisterUserViaActivationCodeDTO';
import { RegisterUserViaInvitationTokenDTO } from '../shared/dtos/RegisterUserViaInvitationTokenDTO';
import { RegisterUserViaPublicTokenDTO } from '../shared/dtos/RegisterUserViaPublicTokenDTO';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ServiceProvider } from '../startup/servicesDI';
import { setAuthCookies } from '../utilities/cookieHelpers';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class RegistrationController implements XController<RegistrationController> {

    private _userRegistrationService: UserRegistrationService;
    private _config: GlobalConfiguration;

    constructor(serviceProvider: ServiceProvider) {

        this._userRegistrationService = serviceProvider.getService(UserRegistrationService);
        this._config = serviceProvider.getService(GlobalConfiguration);
    }

    @XControllerAction(apiRoutes.registration.registerViaPublicToken, { isPublic: true, isPost: true })
    async registerUserViaPublicTokenAction(params: ActionParams) {

        const body = params.getBody<RegisterUserViaPublicTokenDTO>();

        const { accessToken, refreshToken } = await this._userRegistrationService
            .selfRegisterViaPublicTokenAsync(
                body.getValue(x => x.emailAddress, 'string'),
                body.getValue(x => x.firstName, 'string'),
                body.getValue(x => x.lastName, 'string'),
                body.getValue(x => x.registrationToken, 'string'));

        setAuthCookies(this._config, params.res, accessToken, refreshToken, this._config.cookieOptions);

    }

    @XControllerAction(apiRoutes.registration.registerViaInvitationToken, { isPublic: true, isPost: true })
    async registerUserViaInvitationTokenAction(params: ActionParams) {

        const body = params.getBody<RegisterUserViaInvitationTokenDTO>();

        const { accessToken, refreshToken } = await this._userRegistrationService
            .selfRegisterWithInvitationTokenAsync(
                body.getValue(x => x.invitationToken, 'string'),
                body.getValue(x => x.password, 'string'),
                body.getValue(x => x.passwordCompare, 'string'));

        setAuthCookies(this._config, params.res, accessToken, refreshToken, this._config.cookieOptions);
    }

    @XControllerAction(apiRoutes.registration.registerViaActivationCode, { isPublic: true, isPost: true })
    async registerUserViaActivationCodeAction(params: ActionParams) {

        const body = params
            .getBody<RegisterUserViaActivationCodeDTO>(['activationCode', 'emailAddress', 'firstName', 'lastName']);

        await this._userRegistrationService
            .selfRegisterWithActivationCodeAsync(
                body.getValue(x => x.activationCode, 'string'),
                body.getValue(x => x.emailAddress, 'string'),
                body.getValue(x => x.firstName, 'string'),
                body.getValue(x => x.lastName, 'string'));
    }
}
