import { apiRoutes } from '@episto/communication';
import { AuthorizationService } from '@episto/server-services';
import { ServiceProvider } from '../startup/ServiceProvider';
import { ActionParams } from '../XTurboExpress/ActionParams';
import { ITurboMiddlewareInstance, ITurboRequest, ITurboResponse, MiddlewareParams } from '../XTurboExpress/XTurboExpressTypes';

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

        if (params.req.path === apiRoutes.survey.getSurveyData)
            return params.inParams;

        if (params.req.path === apiRoutes.survey.answerSurveyQuestion)
            return params.inParams;

        if (params.req.path === apiRoutes.survey.completeSignupSurvey)
            return params.inParams;

        const { companyId } = params.inParams;

        await this._authorizationService
            .checkPermissionAsync(params.inParams.principalId, 'BYPASS_SURVEY', { companyId });

        return params.inParams;
    }
}