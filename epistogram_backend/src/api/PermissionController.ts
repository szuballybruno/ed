import { PermissionService } from '../services/PermissionService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class PermissionController {

    private _permissionService: PermissionService;

    constructor(serviceProvider: ServiceProvider) {

        this._permissionService = serviceProvider.getService(PermissionService);
    }

    @XControllerAction(apiRoutes.permissions.getPermissions)
    getPermissionsAction = (params: ActionParams) => {

        return this._permissionService
            .getPermissionsAsync();
    };
}