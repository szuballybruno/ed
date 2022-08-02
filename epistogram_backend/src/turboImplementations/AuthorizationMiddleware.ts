import { AuthorizationService } from '../services/AuthorizationService';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { ITurboMiddlewareInstance, ITurboRequest, ITurboResponse, MiddlewareParams } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class AuthorizationMiddleware implements ITurboMiddlewareInstance<ActionParams, ITurboRequest, ITurboResponse, ActionParams> {

    private _authorizationService: AuthorizationService;

    constructor(serviceProvider: ServiceProvider) {

        this._authorizationService = serviceProvider.getService(AuthorizationService);
    }

    async runMiddlewareAsync(params: MiddlewareParams<ActionParams, ITurboRequest, ITurboResponse>): Promise<ActionParams> {

        if (params.options.isPublic)
            return params.inParams;

        if (params.options.isUnauthorized)
            return params.inParams;

        await this._authorizationService
            .checkPermissionAsync(params.inParams.principalId, 'ACCESS_APPLICATION');

        return params.inParams;
    }
}