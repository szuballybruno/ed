import { ChangePasswordDTO } from '@episto/communication';
import { PasswordChangeService } from '@episto/server-services';
import { ActionParams } from '../ActionParams';
import { XControllerAction } from '@episto/x-gateway';
import { apiRoutes } from '@episto/communication';
import { IXGatewayServiceProvider } from '@episto/x-gateway';
import { Controller } from '../Controller';

export class PasswordChangeController implements Controller<PasswordChangeController> {

    private _passwordChangeService: PasswordChangeService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

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