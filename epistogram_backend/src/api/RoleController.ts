import { RoleService } from '../services/RoleService';
import { RoleCreateDTO } from '../shared/dtos/role/RoleCreateDTO';
import { RoleEditDTO } from '../shared/dtos/role/RoleEditDTO';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class RoleController {

    private _roleService: RoleService;

    constructor(roleService: RoleService) {

        this._roleService = roleService;
    }

    @XControllerAction(apiRoutes.roles.getRoles)
    getRolesListAction = (params: ActionParams) => {

        return this._roleService
            .getRolesListAdminAsync(params.principalId);
    };

    @XControllerAction(apiRoutes.roles.createRole, { isPost: true })
    createRoleAction = (params: ActionParams) => {

        return this._roleService
            .createRoleAsync(params.principalId, params
                .getBody<RoleCreateDTO>(['name', 'companyId', 'permissionIds'])
                .data);
    };

    @XControllerAction(apiRoutes.roles.getRoleEditData)
    getRoleEditDataAction = (params: ActionParams) => {

        return this._roleService
            .getRoleEditDataAsync(params.principalId, params
                .getQuery()
                .getValue(x => x.roleId, 'int'));
    };

    @XControllerAction(apiRoutes.roles.deleteRole, { isPost: true })
    deleteRoleAction = (params: ActionParams) => {

        return this._roleService
            .deleteRoleAsync(params.principalId, params
                .getBody()
                .getValue(x => x.roleId, 'int'));
    };

    @XControllerAction(apiRoutes.roles.saveRole, { isPost: true })
    saveRoleAction = (params: ActionParams) => {

        return this._roleService
            .saveRoleAsync(params.principalId, params
                .getBody<RoleEditDTO>(['name', 'permissionIds'])
                .data);
    };

    @XControllerAction(apiRoutes.roles.getAssignableRoles)
    getAssignableRolesAction = (params: ActionParams) => {

        const query = params
            .getQuery();

        return this._roleService
            .getAssignableRolesAsync(
                params.principalId,
                query.getValue(x => x.userId, 'int'),
                query.getValue(x => x.companyId, 'int'));
    };

    @XControllerAction(apiRoutes.roles.getAssignablePermissions)
    getAssignablePermissionsAction = (params: ActionParams) => {

        const query = params
            .getQuery();

        return this._roleService
            .getAssignablePermissionsAsync(
                params.principalId,
                query.getValueOrNull(x => x.courseId, 'int'),
                query.getValueOrNull(x => x.companyId, 'int'));
    };

    @XControllerAction(apiRoutes.roles.getUserRoles)
    getUserRolesAction = (params: ActionParams) => {

        return this._roleService
            .getUserRolesAsync(params.principalId, params
                .getQuery()
                .getValue(x => x.userId, 'int'));
    };

    @XControllerAction(apiRoutes.roles.getUserPermissions)
    getUserPermissionsAsync = (params: ActionParams) => {

        return this._roleService
            .getUserPermissionsAsync(params.principalId, params
                .getQuery()
                .getValue(x => x.userId, 'int'));
    };
}