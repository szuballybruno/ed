import {AuthorizationService} from '../services/AuthorizationService';
import {PractiseQuestionService} from '../services/PractiseQuestionService';
import {AnswerQuestionDTO} from '../shared/dtos/AnswerQuestionDTO';
import {apiRoutes} from '../shared/types/apiRoutes';
import {ServiceProvider} from '../startup/servicesDI';
import {ActionParams} from '../utilities/XTurboExpress/ActionParams';
import {XControllerAction} from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class QuestionController {

    private _practiseQuestionService: PractiseQuestionService;
    private _authorizationService: AuthorizationService;

    constructor(
        serviceProvider: ServiceProvider) {

        this._practiseQuestionService = serviceProvider.getService(PractiseQuestionService);
        this._authorizationService = serviceProvider.getService(AuthorizationService);
    }

    @XControllerAction(apiRoutes.questions.answerPractiseQuestion, {isPost: true})
    answerPractiseQuestionAction = async (params: ActionParams) => {

        const dto = params
            .getBody<AnswerQuestionDTO>(['answerVersionIds', 'questionVersionId'])
            .data;

        return this._practiseQuestionService
            .answerPractiseQuestionAsync(params.principalId, dto);
    };

    @XControllerAction(apiRoutes.questions.getPractiseQuestions)
    getPractiseQuestionAction(params: ActionParams) {

        return {
            action: async () => {
                return await this._practiseQuestionService
                    .getPractiseQuestionAsync(params.principalId);
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(params.principalId, 'ACCESS_APPLICATION');
            }
        };
    }
}
