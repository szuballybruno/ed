import { PermissionService } from '../services/PermissionService';
import { ActionParams } from '../utilities/helpers';

export class PermissionController {

    private _permissionService: PermissionService;

    constructor(permissionService: PermissionService) {

        this._permissionService = permissionService;
    }

    getPermissionsAction = (params: ActionParams) => {

        return this._permissionService
            .getPermissionsAsync();
    };
}