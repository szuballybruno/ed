import { UserEditDTO } from '../shared/dtos/UserEditDTO';
import { UserEditSimpleDTO } from '../shared/dtos/UserEditSimpleDTO';
import { UserService } from '../services/UserService';
import { ActionParams, withValueOrBadRequest } from '../utilities/helpers';

export class UserController {

    private _userService: UserService;

    constructor(userService: UserService) {

        this._userService = userService;
    }

    deleteUserAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<any>(params.req.body);
        const deleteUserId = withValueOrBadRequest<number>(dto.userId, 'number');

        return this._userService
            .deleteUserAsync(params.currentUserId, deleteUserId);
    };

    getEditUserDataAction = async (params: ActionParams) => {

        const editedUserId = withValueOrBadRequest<number>(params.req.query?.editedUserId, 'number');

        return await this._userService
            .getEditUserDataAsync(editedUserId);
    };

    saveUserSimpleAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<UserEditSimpleDTO>(params.req.body);

        await this._userService
            .saveUserSimpleAsync(params.currentUserId, dto);
    };

    saveUserAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<UserEditDTO>(params.req.body);

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
.getValue(x => x.userId);

        await this._userService
            .getBriefUserDataAsync(userId);
    };

    getUserLearningOverviewDataAction = async (params: ActionParams) => {
        const query = params
            .getQuery<any>();

        const userId = query
            .getValue(x => x.userId);

        return this._userService
            .getUserLearningOverviewDataAsync(userId);
    };
}