import { ChangePasswordDTO } from '../shared/dtos/SetNewPasswordDTO';
import { PasswordChangeService } from '../services/PasswordChangeService';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ServiceProvider } from '../startup/serviceDependencyContainer';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

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