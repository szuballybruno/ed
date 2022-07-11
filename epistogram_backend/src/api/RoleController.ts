import { Role } from '../models/entity/authorization/Role';
import { Company } from '../models/entity/Company';
import { User } from '../models/entity/User';
import { RoleService } from '../services/RoleService';
import { RoleCreateDTO } from '../shared/dtos/role/RoleCreateDTO';
import { RoleEditDTO } from '../shared/dtos/role/RoleEditDTO';
import { apiRoutes } from '../shared/types/apiRoutes';
import { Id } from '../shared/types/versionId';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class RoleController {

    private _roleService: RoleService;

    constructor(serviceProvider: ServiceProvider) {

        this._roleService = serviceProvider.getService(RoleService);
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

        const roleId = Id
            .create<'Role'>(params
                .getQuery()
                .getValue(x => x.roleId, 'int'))

        return this._roleService
            .getRoleEditDataAsync(params.principalId, roleId);
    };

    @XControllerAction(apiRoutes.roles.deleteRole, { isPost: true })
    deleteRoleAction = (params: ActionParams) => {

        const roleId = Id
            .create<'Role'>(params
                .getBody()
                .getValue(x => x.roleId, 'int'))

        return this._roleService
            .deleteRoleAsync(params.principalId, roleId);
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

        const userId = Id
            .create<'User'>(query
                .getValue(x => x.userId, 'int'))

        const companyId = Id
            .create<'Company'>(query
                .getValue(x => x.companyId, 'int'))

        return this._roleService
            .getAssignableRolesAsync(
                params.principalId,
                userId,
                companyId
            );
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

        const userId = Id
            .create<'User'>(params
                .getQuery()
                .getValue(x => x.userId, 'int'))

        return this._roleService
            .getUserRolesAsync(params.principalId, userId);
    };

    @XControllerAction(apiRoutes.roles.getUserPermissions)
    getUserPermissionsAsync = (params: ActionParams) => {

        const userId = Id
            .create<'User'>(params
                .getQuery()
                .getValue(x => x.userId, 'int'))

        return this._roleService
            .getUserPermissionsAsync(params.principalId, userId);
    };
}