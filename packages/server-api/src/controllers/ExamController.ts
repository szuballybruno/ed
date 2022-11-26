import { ExamService } from '@episto/server-services';
import { AnswerQuestionsDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { IXGatewayServiceProvider } from '@episto/x-gateway';
import { ActionParams } from '../ActionParams';
import { XControllerAction } from '@episto/x-gateway';
import { Controller } from '../Controller';

export class ExamController implements Controller<ExamController> {

    private _examService: ExamService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

        this._examService = serviceProvider.getService(ExamService);
    }

    @XControllerAction(apiRoutes.exam.answerExamQuestion, { isPost: true })
    answerExamQuestionAction(params: ActionParams) {

        const questionAnswerDTO = params
            .getBody<AnswerQuestionsDTO>()
            .data;

        return this._examService
            .answerExamQuestionsAsync(params.principalId, questionAnswerDTO);
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

        const answerSessionId = params
            .getFromParameterized(apiRoutes.exam.getExamResults)
            .query
            .data
            .answerSessionId;

        return this._examService
            .getExamResultsAsync(params.principalId, answerSessionId);
    }

    @XControllerAction(apiRoutes.exam.getLatestExamResults)
    getLatestExamResultsAction(params: ActionParams) {

        const { answerSessionId } = params
            .getFromParameterized(apiRoutes.exam.getLatestExamResults)
            .query
            .data;

        return this._examService
            .getLatestExamResultsAsync(params.principalId, answerSessionId);
    }
}