import { UserService } from '../services/UserService';
import { UserDTO } from '../shared/dtos/UserDTO';
import { UserEditDTO } from '../shared/dtos/UserEditDTO';
import { UserEditSimpleDTO } from '../shared/dtos/UserEditSimpleDTO';
import { ActionParams } from '../utilities/helpers';

export class UserController {

    private _userService: UserService;

    constructor(userService: UserService) {

        this._userService = userService;
    }

    saveUserDataAction = async (params: ActionParams) => {

        const dto = params
            .getBody<UserDTO>(['firstName', 'lastName', 'phoneNumber'])
            .data;

        return this._userService
            .saveUserDataAsync(params.currentUserId, dto);
    };

    deleteUserAction = async (params: ActionParams) => {

        const deleteUserId = params
            .getBody()
            .getValue(x => x.userId, 'int');

        return this._userService
            .deleteUserAsync(params.currentUserId, deleteUserId);
    };

    getEditUserDataAction = async (params: ActionParams) => {

        const editedUserId = params
            .getBody()
            .getValue(x => x.editedUserId, 'int');

        return await this._userService
            .getEditUserDataAsync(editedUserId);
    };

    saveUserSimpleAction = async (params: ActionParams) => {

        const dto = params
            .getBody<UserEditSimpleDTO>(['firstName', 'lastName', 'phoneNumber'])
            .data;

        await this._userService
            .saveUserSimpleAsync(params.currentUserId, dto);
    };

    saveUserAction = async (params: ActionParams) => {

        const dto = params
            .getBody<UserEditDTO>(['firstName', 'lastName', 'company', 'email', 'id', 'isTeacher', 'jobTitle'])
            .data;

        await this._userService
            .saveUserAsync(dto);
    };

    getUserAdministrationUserListAction = async (params: ActionParams) => {

        const searchText = params
            .getQuery<{ searchText?: string }>()
            .data
            .searchText ?? null;

        return await this._userService
            .getAdminPageUsersListAsync(searchText);
    };

    getBriefUserDataAction = async (params: ActionParams) => {

        const userId = params.getQuery()
            .getValue(x => x.userId, 'int');

        await this._userService
            .getBriefUserDataAsync(userId);
    };
}