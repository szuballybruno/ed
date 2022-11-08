import { PermissionService } from '../services/PermissionService';
import { apiRoutes } from '@episto/communication';
import { ServiceProvider } from '../startup/serviceDependencyContainer';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class PermissionController implements XController<PermissionController> {

    private _permissionService: PermissionService;

    constructor(serviceProvider: ServiceProvider) {

        this._permissionService = serviceProvider.getService(PermissionService);
    }

    @XControllerAction(apiRoutes.permissions.getPermissions)
    getPermissionsAction(params: ActionParams) {

        return this._permissionService
            .getPermissionsAsync(params.principalId);
    }
}