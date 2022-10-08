import { UserService } from '../services/UserService';
import { UserDTO } from '../shared/dtos/UserDTO';
import { UserEditSaveDTO } from '../shared/dtos/UserEditSaveDTO';
import { UserEditSimpleDTO } from '../shared/dtos/UserEditSimpleDTO';
import { apiRoutes } from '../shared/types/apiRoutes';
import { Id } from '../shared/types/versionId';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class UserController implements XController<UserController> {

    private _userService: UserService;

    constructor(serviceProvider: ServiceProvider) {

        this._userService = serviceProvider.getService(UserService);
    }

    async saveUserDataAction(params: ActionParams) {

        const dto = params
            .getBody<UserDTO>(['firstName', 'lastName', 'phoneNumber'])
            .data;

        return this._userService
            .saveUserDataAsync(params.principalId, dto);
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

    @XControllerAction(apiRoutes.user.saveUser, { isPost: true })
    saveUserAction(params: ActionParams) {

        const dto = params
            .getBody<UserEditSaveDTO>(['firstName', 'lastName', 'companyId', 'email', 'userId', 'isTeacher'])
            .data;

        return this._userService
            .saveUserAsync(params.principalId, dto);
    }

    @XControllerAction(apiRoutes.user.getUserListForAdministration)
    getUserAdministrationUserListAction(params: ActionParams) {

        const searchText = params
            .getQuery<{ searchText?: string }>()
            .data
            .searchText ?? null;

        const companyId = params
            .getQuery<{ companyId?: Id<'Company'> }>()
            .data
            .companyId ?? null;

        return this._userService
            .getAdminPageUsersListAsync(params.principalId, searchText, companyId);
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

    @XControllerAction(apiRoutes.user.saveUserCourses, { isPost: true })
    async saveUserCoursesAsync(params: ActionParams) {

        const data = params
            .getFromParameterized(apiRoutes.user.saveUserCourses);

        await this
            ._userService
            .saveUserCoursesAsync(data.body.getValue(x => x.userId, 'int'), data.body.getValue(x => x.mutations, 'any[]'));
    }
}
