import { ActionParams } from '../utilities/ActionParams';
import { ITurboMiddleware, MiddlewareParams } from '../utilities/XTurboExpress/TurboExpress';

export class AuthorizationMiddleware implements ITurboMiddleware<ActionParams, ActionParams> {

    async runMiddlewareAsync(params: MiddlewareParams<ActionParams>): Promise<ActionParams> {

        console.log(params.inParams.principalId);
        return params.inParams;
    }
}