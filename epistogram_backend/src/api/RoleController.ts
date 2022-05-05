import { RoleService } from '../services/RoleService';
import { ActionParams } from '../utilities/helpers';

export class RoleController {

    private _roleService: RoleService;

    constructor(roleService: RoleService) {

        this._roleService = roleService;
    }

    getRolesListAction = (params: ActionParams) => {

        return this._roleService
            .getRolesListAdminAsync(params.currentUserId);
    };
}