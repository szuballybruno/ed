import { ExamService } from '../services/ExamService';
import { ORMConnectionService } from '../services/ORMConnectionService/ORMConnectionService';
import { AnswerQuestionDTO } from '../shared/dtos/AnswerQuestionDTO';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class ExamController {

    private _examService: ExamService;
    private _ormService: ORMConnectionService;

    constructor(examService: ExamService, ormService: ORMConnectionService) {

        this._examService = examService;
        this._ormService = ormService;
    }

    @XControllerAction(apiRoutes.exam.answerExamQuestion, { isPost: true })
    answerExamQuestionAction = async (params: ActionParams) => {

        const questionAnswerDTO = params
            .getBody<AnswerQuestionDTO>()
            .data;

        return this._examService
            .answerExamQuestionAsync(params.principalId, questionAnswerDTO);
    };

    @XControllerAction(apiRoutes.exam.startExam, { isPost: true })
    startExamAction = async (params: ActionParams) => {

        const body = params.getBody<{ answerSessionId: number }>();
        const answerSessionId = body.getValue(x => x.answerSessionId, 'int');

        await this._examService
            .startExamAsync(answerSessionId);
    };

    @XControllerAction(apiRoutes.exam.getExamResults, { isPost: true })
    getExamResultsAction = async (params: ActionParams) => {

        const answerSessionId = params
            .getQuery()
            .getValue(x => x.answerSessionId, 'int');

        return this._examService
            .getExamResultsAsync(params.principalId, answerSessionId);
    };
}