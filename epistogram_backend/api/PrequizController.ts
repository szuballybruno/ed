import { PrequizService } from "../services/PrequizService";
import { ActionParams } from "../utilities/helpers";

export class PrequizController {

    private _prequizService: PrequizService;

    constructor(prequizService: PrequizService) {

        this._prequizService = prequizService;
    }

    getQuestionsAction = async (params: ActionParams) => {

        const courseId = params
            .getQuery<any>()
            .getValue(x => x.courseId, "int");

        return await this._prequizService
            .getQuestionsAsync(params.currentUserId, courseId);
    }

    getUserAnswerAction = async (params: ActionParams) => {

        const query = params
            .getQuery<{ questionId: number }>();

        const questionId = query
            .getValue(x => x.questionId, "int");

        return await this._prequizService
            .getUserAnswerAsync(questionId, params.currentUserId);
    }

    answerPrequizQuestionAction = async (params: ActionParams) => {

        const bod = params
            .getBody<{
                questionId: number,
                value: number | null,
                answerId: number | null
            }>();

        const questionId = bod
            .getValue(x => x.questionId, "int");

        const value = bod
            .getValueOrNull(x => x.value, "int");

        const answerId = bod
            .getValueOrNull(x => x.answerId, "int");

        return await this._prequizService
            .answerPrequizQuestionAsync(params.currentUserId, questionId, answerId, value);
    }
}