import { QuestionData } from '../models/entity/question/QuestionData';
import { toAnswerEditDTO } from '../services/misc/mappings';
import { ORMConnectionService } from '../services/ORMConnectionService/ORMConnectionService';
import { PractiseQuestionService } from '../services/PractiseQuestionService';
import { QuestionService } from '../services/QuestionService';
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

        const question = await this._ormService
            .getRepository(QuestionData)
            .createQueryBuilder('q')
            .leftJoinAndSelect('q.answers', 'qa')
            .where('q.id = :questionId', { questionId })
            .getOneOrFail();

        return {
            videoId: question.videoId,
            examId: question.examId,
            questionId: question.id,
            questionText: question.questionText,
            questionShowUpTimeSeconds: question.showUpTimeSeconds,
            typeId: question.typeId,
            answers: (question.answers ?? []).map(x => toAnswerEditDTO(x))
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