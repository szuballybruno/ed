import { PrequizService } from '../services/PrequizService';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { ServiceProvider } from '../startup/serviceDependencyContainer';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class PrequizController implements XController<PrequizController> {

    private _prequizService: PrequizService;

    constructor(serviceProvider: ServiceProvider) {

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