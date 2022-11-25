import { ChangePasswordDTO } from '@episto/communication';
import { PasswordChangeService } from '@episto/server-services';
import { ActionParams } from '../XTurboExpress/ActionParams';
import { XControllerAction } from '../XTurboExpress/XTurboExpressDecorators';
import { apiRoutes } from '@episto/communication';
import { ServiceProvider } from '../startup/ServiceProvider';
import { XController } from '../XTurboExpress/XTurboExpressTypes';

export class PasswordChangeController implements XController<PasswordChangeController> {

    private _passwordChangeService: PasswordChangeService;

    constructor(serviceProvider: ServiceProvider) {

        this._passwordChangeService = serviceProvider.getService(PasswordChangeService);
    }

    @XControllerAction(apiRoutes.passwordChange.setNewPassword, { isPost: true, isPublic: true })
    setNewPasswordAction(params: ActionParams) {

        const dto = params
            .getBody<ChangePasswordDTO>();

        const password = dto
            .getValue(x => x.password, 'string');

        const passwordCompare = dto
            .getValue(x => x.passwordCompare, 'string');

        const passwordResetToken = dto
            .getValue(x => x.passwordResetToken, 'string');

        return this._passwordChangeService
            .setNewPasswordAsync(password, passwordCompare, passwordResetToken);
    }

    @XControllerAction(apiRoutes.passwordChange.requestPasswordChangeAuthenticated, { isPost: true })
    requestPasswordChangeAuthenticatedAction(params: ActionParams) {

        const oldPassword = params
            .getBody<any>()
            .getValue(x => x.oldPassword, 'string');

        return this._passwordChangeService
            .requestPasswordChangeAuthenticatedAsync(params.principalId, oldPassword);
    }

    @XControllerAction(apiRoutes.passwordChange.requestPasswordChange, { isPost: true, isPublic: true })
    requestPasswordChangeAction(params: ActionParams) {

        const email = params
            .getBody()
            .getValue(x => x.email, 'string');

        return this._passwordChangeService
            .requestPasswordChangeAsync(email);
    }
}