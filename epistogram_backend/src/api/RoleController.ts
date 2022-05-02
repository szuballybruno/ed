import { RoleService } from '../services/RoleService';
import { RoleCreateDTO } from '../shared/dtos/role/RoleCreateDTO';
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

    createRoleAction = (params: ActionParams) => {

        return this._roleService
            .createRoleAsync(params.currentUserId, params
                .getBody<RoleCreateDTO>(['name', 'contextCompanyId', 'permissionIds'])
                .data);
    };
}