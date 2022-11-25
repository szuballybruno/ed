import { PermissionService } from '@episto/server-services';
import { apiRoutes } from '@episto/communication';
import { ServiceProvider } from '../startup/ServiceProvider';
import { ActionParams } from '../XTurboExpress/ActionParams';
import { XControllerAction } from '../XTurboExpress/XTurboExpressDecorators';
import { XController } from '../XTurboExpress/XTurboExpressTypes';

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