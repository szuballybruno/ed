import { PermissionService } from '../services/PermissionService';
import { ActionParams } from '../utilities/ActionParams';
import { ITurboMiddleware, MiddlewareParams } from '../utilities/XTurboExpress/TurboExpress';

export class AuthorizationMiddleware implements ITurboMiddleware<ActionParams, ActionParams> {

    private _permissionService: PermissionService;

    constructor(permissionService: PermissionService) {

        this._permissionService = permissionService;
    }

    async runMiddlewareAsync(params: MiddlewareParams<ActionParams>): Promise<ActionParams> {

        if (params.options.isPublic)
            return params.inParams;

        await this._permissionService
            .checkPermissionAsync(params.inParams.principalId, 'ACCESS_APPLICATION');

        return params.inParams;
    }
}