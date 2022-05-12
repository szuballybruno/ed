import { ChangePasswordDTO } from '../shared/dtos/SetNewPasswordDTO';
import { PasswordChangeService } from '../services/PasswordChangeService';
import { ActionParams } from "../utilities/ActionParams";

export class PasswordChangeController {

    private _passwordChangeService: PasswordChangeService;

    constructor(passwordChangeService: PasswordChangeService) {

        this._passwordChangeService = passwordChangeService;
    }

    setNewPasswordAction = async (params: ActionParams) => {

        const dto = params.getBody<ChangePasswordDTO>();
        const password = dto.getValue(x => x.password, 'string');
        const passwordCompare = dto.getValue(x => x.passwordCompare, 'string');
        const passwordResetToken = dto.getValue(x => x.passwordResetToken, 'string');

        return this._passwordChangeService
            .setNewPasswordAsync(password, passwordCompare, passwordResetToken);
    };

    requestPasswordChangeAuthenticatedAction = async (params: ActionParams) => {

        const oldPassword = params
            .getBody<any>()
            .getValue(x => x.oldPassword, 'string');

        return await this._passwordChangeService
            .requestPasswordChangeAuthenticatedAsync(params.currentUserId, oldPassword);
    };

    requestPasswordChangeAction = async (params: ActionParams) => {

        const email = params
            .getBody()
            .getValue(x => x.email, 'string');

        await this._passwordChangeService
            .requestPasswordChangeAsync(email);
    };
}