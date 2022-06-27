import { AuthorizationService } from '../services/AuthorizationService';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/ActionParams';
import { ITurboMiddlewareInstance, MiddlewareParams } from '../utilities/XTurboExpress/TurboExpress';

export class AuthorizationMiddleware implements ITurboMiddlewareInstance<ActionParams, ActionParams> {

    private _authorizationService: AuthorizationService;

    constructor(serviceProvider: ServiceProvider) {

        this._authorizationService = serviceProvider.getService(AuthorizationService);
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