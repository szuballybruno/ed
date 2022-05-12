import { PrequizService } from '../services/PrequizService';
import { ActionParams } from "../utilities/ActionParams";

export class PrequizController {

    private _prequizService: PrequizService;

    constructor(prequizService: PrequizService) {

        this._prequizService = prequizService;
    }

    getQuestionsAction = async (params: ActionParams) => {

        const courseId = params
            .getQuery<any>()
            .getValue(x => x.courseId, 'int');

        return await this._prequizService
            .getQuestionsAsync(params.currentUserId, courseId);
    };

    getUserAnswerAction = async (params: ActionParams) => {

        const query = params
            .getQuery<{ questionId: number, courseId: number }>();

        const questionId = query
            .getValue(x => x.questionId, 'int');

        const courseId = query
            .getValue(x => x.courseId, 'int');

        return await this._prequizService
            .getUserAnswerAsync(params.currentUserId, courseId, questionId);
    };

    answerPrequizQuestionAction = async (params: ActionParams) => {

        const bod = params
            .getBody<{
                questionId: number,
                value: number | null,
                answerId: number | null,
                courseId: number
            }>();

        const questionId = bod
            .getValue(x => x.questionId, 'int');

        const courseId = bod
            .getValue(x => x.courseId, 'int');

        const value = bod
            .getValueOrNull(x => x.value, 'int');

        const answerId = bod
            .getValueOrNull(x => x.answerId, 'int');

        return await this._prequizService
            .answerPrequizQuestionAsync(params.currentUserId, questionId, courseId, answerId, value);
    };
}