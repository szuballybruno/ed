import { AuthorizationService } from '../services/AuthorizationService';
import { PractiseQuestionService } from '../services/PractiseQuestionService';
import { AnswerQuestionDTO } from '../shared/dtos/AnswerQuestionDTO';
import { AnswerResultDTO } from '../shared/dtos/AnswerResultDTO';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class QuestionController {

    private _practiseQuestionService: PractiseQuestionService;
    private _authorizationService: AuthorizationService;

    constructor(
        serviceProvider: ServiceProvider) {

        this._practiseQuestionService = serviceProvider.getService(PractiseQuestionService);
        this._authorizationService = serviceProvider.getService(AuthorizationService);
    }

    @XControllerAction(apiRoutes.questions.answerPractiseQuestion, { isPost: true })
    answerPractiseQuestionAction = async (params: ActionParams): Promise<AnswerResultDTO> => {

        const dto = params
            .getBody<AnswerQuestionDTO>(['answerSessionId', 'givenAnswer'])
            .data;

        return this._practiseQuestionService
            .answerPractiseQuestionAsync(params.principalId, dto);
    };

    @XControllerAction(apiRoutes.questions.getPractiseQuestions)
    async getPractiseQuestionAction(params: ActionParams) {

        return await this._practiseQuestionService
            .getPractiseQuestionAsync(params.principalId);
    }
}
