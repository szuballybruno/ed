import { PermissionService } from '@episto/server-services';
import { apiRoutes } from '@episto/communication';
import { IXGatewayServiceProvider } from '@thinkhub/x-gateway';
import { ActionParams } from '../helpers/ActionParams';
import { XControllerAction } from '@thinkhub/x-gateway';
import { IController } from '../interfaces/IController';

export class PermissionController implements IController<PermissionController> {

    private _permissionService: PermissionService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

        this._permissionService = serviceProvider.getService(PermissionService);
    }

    @XControllerAction(apiRoutes.permissions.getPermissions)
    getPermissionsAction(params: ActionParams) {

        return this._permissionService
            .getPermissionsAsync(params.principalId);
    }
}