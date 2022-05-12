import { RoleService } from '../services/RoleService';
import { RoleCreateDTO } from '../shared/dtos/role/RoleCreateDTO';
import { RoleEditDTO } from '../shared/dtos/role/RoleEditDTO';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ActionParams } from "../utilities/ActionParams";
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class RoleController {

    private _roleService: RoleService;

    constructor(roleService: RoleService) {

        this._roleService = roleService;
    }

    @XControllerAction(apiRoutes.roles.getRoles)
    getRolesListAction = (params: ActionParams) => {

        return this._roleService
            .getRolesListAdminAsync(params.currentUserId);
    };

    @XControllerAction(apiRoutes.roles.createRole, { isPost: true })
    createRoleAction = (params: ActionParams) => {

        return this._roleService
            .createRoleAsync(params.currentUserId, params
                .getBody<RoleCreateDTO>(['name', 'companyId', 'permissionIds'])
                .data);
    };

    @XControllerAction(apiRoutes.roles.getRoleEditData)
    getRoleEditDataAction = (params: ActionParams) => {

        return this._roleService
            .getRoleEditDataAsync(params.currentUserId, params
                .getQuery()
                .getValue(x => x.roleId, 'int'));
    };

    @XControllerAction(apiRoutes.roles.deleteRole, { isPost: true })
    deleteRoleAction = (params: ActionParams) => {

        return this._roleService
            .deleteRoleAsync(params.currentUserId, params
                .getBody()
                .getValue(x => x.roleId, 'int'));
    };

    @XControllerAction(apiRoutes.roles.saveRole, { isPost: true })
    saveRoleAction = (params: ActionParams) => {

        return this._roleService
            .saveRoleAsync(params.currentUserId, params
                .getBody<RoleEditDTO>(['name', 'permissionIds'])
                .data);
    };

    @XControllerAction(apiRoutes.roles.getAssignableRoles)
    getAssignableRolesAction = (params: ActionParams) => {

        return this._roleService
            .getAssignableRolesAsync(params.principalId, params
                .getQuery()
                .getValue(x => x.companyId, 'int'));
    };

    @XControllerAction(apiRoutes.roles.getAssignablePermissions)
    getAssignablePermissionsAction = (params: ActionParams) => {

        return this._roleService
            .getAssignablePermissionsAsync(params.principalId, params
                .getQuery()
                .getValue(x => x.companyId, 'int'));
    };

    @XControllerAction(apiRoutes.roles.getUserAssignedAuthItems)
    getUserAssignedAuthItemsAction = (params: ActionParams) => {

        return this._roleService
            .getUserAssignedAuthItemsAsync(params.principalId, params
                .getQuery()
                .getValue(x => x.userId, 'int'));
    };
}