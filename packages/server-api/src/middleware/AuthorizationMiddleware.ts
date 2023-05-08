import { apiRoutes } from '@episto/communication';
import { AuthorizationService } from '@episto/server-services';
import { IXGatewayMiddlewareInstance, IXGatewayServiceProvider, MiddlewareParams } from '@episto/x-gateway';
import { ActionParams } from '../helpers/ActionParams';

export class AuthorizationMiddleware implements IXGatewayMiddlewareInstance<ActionParams, ActionParams> {

    private _authorizationService: AuthorizationService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

        this._authorizationService = serviceProvider.getService(AuthorizationService);
    }

    async runMiddlewareAsync(params: MiddlewareParams<ActionParams>): Promise<ActionParams> {

        if (params.options.isPublic)
            return params.inParams;

        if (params.options.isUnauthorized)
            return params.inParams;

        if (params.req.path === apiRoutes.survey.getSurveyData)
            return params.inParams;

        if (params.req.path === apiRoutes.survey.answerSurveyQuestion)
            return params.inParams;

        if (params.req.path === apiRoutes.survey.completeSignupSurvey)
            return params.inParams;

        return params.inParams;
    }
}