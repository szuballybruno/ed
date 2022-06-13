import { QuestionEditDataView } from '../models/views/QuestionEditDataView';
import { ORMConnectionService } from '../services/ORMConnectionService/ORMConnectionService';
import { PractiseQuestionService } from '../services/PractiseQuestionService';
import { QuestionService } from '../services/QuestionService';
import { AnswerEditDTO } from '../shared/dtos/AnswerEditDTO';
import { AnswerQuestionDTO } from '../shared/dtos/AnswerQuestionDTO';
import { QuestionEditDataDTO } from '../shared/dtos/QuestionEditDataDTO';
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
            .getBody<AnswerQuestionDTO>(['answerIds', 'questionId'])
            .data;

        return this._practiseQuestionService
            .answerPractiseQuestionAsync(params.principalId, dto);
    };

    @XControllerAction(apiRoutes.questions.getQuestionEditData)
    getQuestionEditDataAction = async (params: ActionParams) => {

        const questionId = params
            .getQuery()
            .getValue(x => x.questionId, 'int');

        const questions = await this._ormService
            .query(QuestionEditDataView, { questionId })
            .where('questionId', '=', 'questionId')
            .getMany();

        const questionGroup = questions
            .groupBy(x => x.questionId)
            .single(x => true);

        return {
            videoId: questionGroup.first.videoId,
            examId: questionGroup.first.examId,
            questionId: questionGroup.first.questionId,
            questionText: questionGroup.first.questionText,
            questionShowUpTimeSeconds: questionGroup.first.showUpTimeSeconds,
            typeId: questionGroup.first.typeId,
            answers: questionGroup
                .items
                .map((a): AnswerEditDTO => ({
                    id: a.answerId,
                    isCorrect: a.answerIsCorrect,
                    text: a.answerText
                }))
        } as QuestionEditDataDTO;
    };

    @XControllerAction(apiRoutes.questions.saveQuestion, { isPost: true })
    saveQuestionAction = async (params: ActionParams) => {

        const dto = params
            .getBody<QuestionEditDataDTO>()
            .data;

        const questionId = dto.questionId;

        await this._questionService
            .saveQuestionAsync(questionId, dto);
    };
}