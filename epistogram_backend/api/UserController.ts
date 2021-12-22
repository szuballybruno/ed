import { UserEditDTO } from "../models/shared_models/UserEditDTO";
import { UserService } from "../services/UserService";
import { ActionParams, withValueOrBadRequest } from "../utilities/helpers";

export class UserController {

    private _userService: UserService;

    constructor(userService: UserService) {

        this._userService = userService;
    }

    deleteUserAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<any>(params.req.body);
        const deleteUserId = withValueOrBadRequest<number>(dto.userId, "number");

        return this._userService
            .deleteUserAsync(params.userId, deleteUserId);
    };

    getEditUserDataAction = async (params: ActionParams) => {

        const editedUserId = withValueOrBadRequest<number>(params.req.query?.editedUserId, "number");

        return await this._userService
            .getEditUserDataAsync(editedUserId);
    }

    saveUserAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<UserEditDTO>(params.req.body);

        await this._userService
            .saveUserAsync(dto);
    }

    getUserAdministrationUserListAction = async () => {

        return await this._userService
            .getAdminPageUsersListAsync();
    };

    getBriefUserDataAction = async (params: ActionParams) => {

        const userId = withValueOrBadRequest(params.req?.query?.userId);

        await this._userService
            .getBriefUserDataAsync(userId);
    }
}