import { ORMConnectionService } from '../services/ORMConnectionService/ORMConnectionService';
import { PractiseQuestionService } from '../services/PractiseQuestionService';
import { QuestionService } from '../services/QuestionService';
import { AnswerQuestionDTO } from '../shared/dtos/AnswerQuestionDTO';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class QuestionController {

    private _practiseQuestionService: PractiseQuestionService;
    private _questionService: QuestionService;
    private _ormService: ORMConnectionService;

    constructor(
        practiseQuestionService: PractiseQuestionService,
        questionService: QuestionService,
        ormService: ORMConnectionService) {

        this._practiseQuestionService = practiseQuestionService;
        this._questionService = questionService;
        this._ormService = ormService;
    }

    @XControllerAction(apiRoutes.questions.answerPractiseQuestion, { isPost: true })
    answerPractiseQuestionAction = async (params: ActionParams) => {

        const dto = params
            .getBody<AnswerQuestionDTO>(['answerIds', 'questionVersionId'])
            .data;

        return this._practiseQuestionService
            .answerPractiseQuestionAsync(params.principalId, dto);
    };
}