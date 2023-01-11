import { PrequizService } from '@episto/server-services';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { IXGatewayServiceProvider } from '@thinkhub/x-gateway';
import { ActionParams } from '../helpers/ActionParams';
import { XControllerAction } from '@thinkhub/x-gateway';
import { IController } from '../interfaces/IController';

export class PrequizController implements IController<PrequizController> {

    private _prequizService: PrequizService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

        this._prequizService = serviceProvider.getService(PrequizService);
    }

    @XControllerAction(apiRoutes.prequiz.getQuestions)
    getQuestionsAction(params: ActionParams) {

        const courseId = Id
            .create<'Course'>(params
                .getQuery<any>()
                .getValue(x => x.courseId, 'int'));

        return this._prequizService
            .getPrequizQuestionsAsync(params.principalId, courseId);
    }

    @XControllerAction(apiRoutes.prequiz.getUserAnswer)
    getUserAnswerAction(params: ActionParams) {

        const query = params
            .getQuery<{ questionId: number, courseId: number }>();

        const questionId = Id
            .create<'Question'>(query
                .getValue(x => x.questionId, 'int'));

        const courseId = Id
            .create<'Course'>(query
                .getValue(x => x.courseId, 'int'));

        return this._prequizService
            .getUserAnswerAsync(params.principalId, courseId, questionId);
    }

    @XControllerAction(apiRoutes.prequiz.answerPrequizQuestion, { isPost: true })
    answerPrequizQuestionAction(params: ActionParams) {

        const bod = params
            .getBody<{
                questionId: number,
                value: number | null,
                answerId: number | null,
                courseId: number
            }>();

        const questionId = Id
            .create<'PrequizQuestion'>(bod
                .getValue(x => x.questionId, 'int'));

        const courseId = Id
            .create<'Course'>(bod
                .getValue(x => x.courseId, 'int'));

        const value = bod
            .getValueOrNull(x => x.value, 'int');

        const answerId = bod
            .getValueOrNull(x => x.answerId, 'int');

        const answerIdAsIdType = answerId
            ? Id.create<'PrequizAnswer'>(answerId)
            : null;

        return this._prequizService
            .answerPrequizQuestionAsync(params.principalId, questionId, courseId, answerIdAsIdType, value);
    }

    @XControllerAction(apiRoutes.prequiz.finishPrequiz, { isPost: true })
    finishPrequizAction(params: ActionParams) {

        const body = params
            .getFromParameterized(apiRoutes.prequiz.finishPrequiz)
            .body;

        const courseId = body
            .getValue(x => x.courseId, 'int');

        return this._prequizService
            .finishPrequizAsync(params.principalId, courseId);
    }
}