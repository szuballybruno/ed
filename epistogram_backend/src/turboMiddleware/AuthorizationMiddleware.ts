import { AuthorizationService } from '../services/AuthorizationService';
import { ActionParams } from '../utilities/ActionParams';
import { ITurboMiddleware, MiddlewareParams } from '../utilities/XTurboExpress/TurboExpress';

export class AuthorizationMiddleware implements ITurboMiddleware<ActionParams, ActionParams> {

    constructor(private _authorizationService: AuthorizationService) {

    }

    async runMiddlewareAsync(params: MiddlewareParams<ActionParams>): Promise<ActionParams> {

        if (params.options.isPublic)
            return params.inParams;

        if (params.options.isUnauthorized)
            return params.inParams;

        await this._authorizationService
            .checkPermissionAsync(params.inParams.principalId, 'ACCESS_APPLICATION');

        return params.inParams;
    }
}