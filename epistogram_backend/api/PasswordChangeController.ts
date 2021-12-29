import { ChangePasswordDTO } from "../models/shared_models/SetNewPasswordDTO";
import { PasswordChangeService } from "../services/PasswordChangeService";
import { ActionParams } from "../utilities/helpers";

export class PasswordChangeController {

    private _passwordChangeService: PasswordChangeService;

    constructor(passwordChangeService: PasswordChangeService) {

        this._passwordChangeService = passwordChangeService;
    }

    setNewPasswordAction = async (params: ActionParams) => {

        const dto = params.getBody<ChangePasswordDTO>();
        const password = dto.getValue<string>(x => x.password);
        const passwordCompare = dto.getValue<string>(x => x.passwordCompare);
        const passwordResetToken = dto.getValue<string>(x => x.passwordResetToken);

        return this._passwordChangeService
            .setNewPasswordAsync(password, passwordCompare, passwordResetToken);
    };

    requestPasswordChangeAuthenticatedAction = async (params: ActionParams) => {

        const oldPassword = params
            .getBody<any>()
            .getValue(x => x.oldPassword);

        return await this._passwordChangeService
            .requestPasswordChangeAuthenticatedAsync(params.currentUserId, oldPassword);
    };

    requestPasswordChangeAction = async (params: ActionParams) => {

        const email = params
            .getBody<{ email: string }>()
            .getValue(x => x.email);

        await this._passwordChangeService
            .requestPasswordChangeAsync(email);
    };
}