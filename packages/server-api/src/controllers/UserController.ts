import { UserService } from '@episto/server-services';
import { UserEditSaveDTO } from '@episto/communication';
import { UserEditSimpleDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { IXGatewayServiceProvider } from '@thinkhub/x-gateway';
import { ActionParams } from '../helpers/ActionParams';
import { XControllerAction } from '@thinkhub/x-gateway';
import { IController } from '../interfaces/IController';

export class UserController implements IController<UserController> {

    private _userService: UserService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

        this._userService = serviceProvider.getService(UserService);
    }

    @XControllerAction(apiRoutes.user.deleteUser, { isPost: true })
    async deleteUserAction(params: ActionParams) {

        const deleteUserId = Id
            .create<'User'>(params
                .getBody()
                .getValue(x => x.userId, 'int'));

        return this._userService
            .deleteUserAsync(params.principalId, deleteUserId);
    }

    @XControllerAction(apiRoutes.user.getEditUserData)
    async getEditUserDataAction(params: ActionParams) {

        const editedUserId = Id
            .create<'User'>(params
                .getQuery()
                .getValue(x => x.editedUserId, 'int'));

        return this._userService
            .getEditUserDataAsync(params.principalId, editedUserId);
    }

    @XControllerAction(apiRoutes.user.saveUserSimple, { isPost: true })
    saveUserSimpleAction(params: ActionParams) {

        const dto = params
            .getBody<UserEditSimpleDTO>(['firstName', 'lastName', 'phoneNumber'])
            .data;

        return this._userService
            .saveUserSimpleAsync(params.principalId, dto);
    }

    @XControllerAction(apiRoutes.user.getUserControlDropdownData)
    userControlDropdownDataAction(params: ActionParams) {

        return this._userService
            .getUserControlDropdownDataAsync(params.principalId);
    }

    @XControllerAction(apiRoutes.user.saveUser, { isPost: true })
    saveUserAction(params: ActionParams) {

        const dto = params
            .getBody<UserEditSaveDTO>(['firstName', 'lastName', 'companyId', 'email', 'userId', 'isTeacher', 'isSurveyRequired'])
            .data;

        return this._userService
            .saveUserAsync(params.principalId, dto);
    }

    @XControllerAction(apiRoutes.user.getBriefUserData)
    async getBriefUserDataAction(params: ActionParams) {

        const userId = Id
            .create<'User'>(params
                .getQuery()
                .getValue(x => x.userId, 'int'));

        return this._userService
            .getBriefUserDataAsync(params.principalId, userId);
    }
}
