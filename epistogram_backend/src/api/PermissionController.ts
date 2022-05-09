import { PermissionService } from '../services/PermissionService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ActionParams } from '../utilities/helpers';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class PermissionController {

    private _permissionService: PermissionService;

    constructor(permissionService: PermissionService) {

        this._permissionService = permissionService;
    }

    @XControllerAction(apiRoutes.permissions.getPermissions)
    getPermissionsAction = (params: ActionParams) => {

        return this._permissionService
            .getPermissionsAsync();
    };
}