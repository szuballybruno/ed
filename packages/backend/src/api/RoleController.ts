import { RoleService } from '../services/RoleService';
import { RoleCreateDTO } from '@episto/communication';
import { RoleEditDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { ServiceProvider } from '../startup/serviceDependencyContainer';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class RoleController implements XController<RoleController> {

    private _roleService: RoleService;

    constructor(serviceProvider: ServiceProvider) {

        this._roleService = serviceProvider.getService(RoleService);
    }

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
                .getValue(x => x.roleId, 'int'));

        return this._roleService
            .getRoleEditDataAsync(params.principalId, roleId);
    };

    @XControllerAction(apiRoutes.roles.deleteRole, { isPost: true })
    deleteRoleAction = (params: ActionParams) => {

        const roleId = Id
            .create<'Role'>(params
                .getBody()
                .getValue(x => x.roleId, 'int'));

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
}