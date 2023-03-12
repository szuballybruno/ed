import { AuthorizationService } from '@episto/server-services';
import { PractiseQuestionService } from '@episto/server-services';
import { AnswerQuestionDTO } from '@episto/communication';
import { AnswerResultDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { IXGatewayServiceProvider } from '@episto/x-gateway';
import { ActionParams } from '../helpers/ActionParams';
import { XControllerAction } from '@episto/x-gateway';

export class QuestionController {

    private _practiseQuestionService: PractiseQuestionService;
    private _authorizationService: AuthorizationService;

    constructor(
        serviceProvider: IXGatewayServiceProvider) {

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
