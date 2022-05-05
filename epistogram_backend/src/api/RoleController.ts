import { RoleService } from '../services/RoleService';
import { RoleCreateDTO } from '../shared/dtos/role/RoleCreateDTO';
import { RoleEditDTO } from '../shared/dtos/role/RoleEditDTO';
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
                .getBody<RoleCreateDTO>(['name', 'ownerCompanyId', 'permissionIds'])
                .data);
    };

    getRoleEditDataAction = (params: ActionParams) => {

        return this._roleService
            .getRoleEditDataAsync(params.currentUserId, params
                .getQuery()
                .getValue(x => x.roleId, 'int'));
    };

    deleteRoleAction = (params: ActionParams) => {

        return this._roleService
            .deleteRoleAsync(params.currentUserId, params
                .getBody()
                .getValue(x => x.roleId, 'int'));
    };

    saveRoleAction = (params: ActionParams) => {

        return this._roleService
            .saveRoleAsync(params.currentUserId, params
                .getBody<RoleEditDTO>(['name', 'permissionIds'])
                .data);
    };
}