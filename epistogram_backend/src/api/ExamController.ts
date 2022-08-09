import { ExamService } from '../services/ExamService';
import { AnswerQuestionDTO } from '../shared/dtos/AnswerQuestionDTO';
import { apiRoutes } from '../shared/types/apiRoutes';
import { Id } from '../shared/types/versionId';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class ExamController implements XController<ExamController> {

    private _examService: ExamService;

    constructor(serviceProvider: ServiceProvider) {

        this._examService = serviceProvider.getService(ExamService);
    }

    @XControllerAction(apiRoutes.exam.answerExamQuestion, { isPost: true })
    answerExamQuestionAction(params: ActionParams) {

        const questionAnswerDTO = params
            .getBody<AnswerQuestionDTO>()
            .data;

        return this._examService
            .answerExamQuestionAsync(params.principalId, questionAnswerDTO);
    }

    @XControllerAction(apiRoutes.exam.startExam, { isPost: true })
    startExamAction(params: ActionParams) {

        const body = params.getBody<{ answerSessionId: number }>();
        const answerSessionId = Id
            .create<'AnswerSession'>(body.getValue(x => x.answerSessionId, 'int'));

        return this._examService
            .startExamAsync(params.principalId, answerSessionId);
    }

    @XControllerAction(apiRoutes.exam.completeExam, { isPost: true })
    completeExamAction(params: ActionParams) {

        const body = params
            .getBody<{ answerSessionId: number }>();

        const answerSessionId = Id
            .create<'AnswerSession'>(body
                .getValue(x => x.answerSessionId, 'int'));

        return this._examService
            .finishExamAsync(params.principalId, answerSessionId);
    }

    @XControllerAction(apiRoutes.exam.getExamResults)
    getExamResultsAction(params: ActionParams) {

        const answerSessionId = Id
            .create<'AnswerSession'>(params
                .getQuery()
                .getValue(x => x.answerSessionId, 'int'));

        return this._examService
            .getExamResultsAsync(params.principalId, answerSessionId);
    }
}