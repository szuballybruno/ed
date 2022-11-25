import { GlobalConfigurationService, UserRegistrationService } from '@episto/server-services';
import { RegisterUserViaActivationCodeDTO } from '@episto/communication';
import { RegisterUserViaInvitationTokenDTO } from '@episto/communication';
import { RegisterUserViaPublicTokenDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { ServiceProvider } from '../startup/ServiceProvider';
import { setAuthCookies } from '../cookieHelpers';
import { ActionParams } from '../XTurboExpress/ActionParams';
import { XControllerAction } from '../XTurboExpress/XTurboExpressDecorators';
import { XController } from '../XTurboExpress/XTurboExpressTypes';
import { CookieOptionProvider } from '../CookieOptionProvider';

export class RegistrationController implements XController<RegistrationController> {

    private _userRegistrationService: UserRegistrationService;
    private _config: GlobalConfigurationService;
    private _cookieOptionProvider: CookieOptionProvider;

    constructor(serviceProvider: ServiceProvider) {

        this._userRegistrationService = serviceProvider.getService(UserRegistrationService);
        this._config = serviceProvider.getService(GlobalConfigurationService);
        this._cookieOptionProvider = serviceProvider.getService(CookieOptionProvider);
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

        setAuthCookies(this._config, params.res, accessToken, refreshToken, this._cookieOptionProvider.cookieOptions);

    }

    @XControllerAction(apiRoutes.registration.registerViaInvitationToken, { isPublic: true, isPost: true })
    async registerUserViaInvitationTokenAction(params: ActionParams) {

        const body = params.getBody<RegisterUserViaInvitationTokenDTO>();

        const { accessToken, refreshToken } = await this._userRegistrationService
            .selfRegisterWithInvitationTokenAsync(
                body.getValue(x => x.invitationToken, 'string'),
                body.getValue(x => x.password, 'string'),
                body.getValue(x => x.passwordCompare, 'string'));

        setAuthCookies(this._config, params.res, accessToken, refreshToken, this._cookieOptionProvider.cookieOptions);
    }

    @XControllerAction(apiRoutes.registration.registerViaActivationCode, { isPublic: true, isPost: true })
    async registerUserViaActivationCodeAction(params: ActionParams) {

        const body = params
            .getBody<RegisterUserViaActivationCodeDTO>([
                'activationCode',
                'emailAddress',
                'firstName',
                'lastName',
                'password',
                'passwordCompare'
            ]);

        const { accessToken, refreshToken } = await this._userRegistrationService
            .selfRegisterWithActivationCodeAsync(
                body.getValue(x => x.activationCode, 'string'),
                body.getValue(x => x.emailAddress, 'string'),
                body.getValue(x => x.firstName, 'string'),
                body.getValue(x => x.lastName, 'string'),
                body.getValue(x => x.password, 'string'),
                body.getValue(x => x.passwordCompare, 'string'),
                body.getValue(x => x.username, 'string'));

        setAuthCookies(this._config, params.res, accessToken, refreshToken, this._cookieOptionProvider.cookieOptions);
    }
}
