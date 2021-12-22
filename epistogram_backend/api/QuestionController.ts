import { Question } from "../models/entity/Question";
import { AnswerQuestionDTO } from "../models/shared_models/AnswerQuestionDTO";
import { QuestionEditDataDTO } from "../models/shared_models/QuestionEditDataDTO";
import { toAnswerEditDTO } from "../services/misc/mappings";
import { PractiseQuestionService } from "../services/PractiseQuestionService";
import { QuestionService } from "../services/QuestionService";
import { staticProvider } from "../staticProvider";
import { ActionParams, withValueOrBadRequest } from "../utilities/helpers";

export class QuestionController {

    private _practiseQuestionService: PractiseQuestionService;
    private _questionService: QuestionService;

    constructor(practiseQuestionService: PractiseQuestionService, questionService: QuestionService) {

        this._practiseQuestionService = practiseQuestionService;
        this._questionService = questionService;
    }

    answerPractiseQuestionAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<AnswerQuestionDTO>(params.req.body);

        return this._practiseQuestionService
            .answerPractiseQuestionAsync(params.userId, dto);
    };

    getQuestionEditDataAction = async (params: ActionParams) => {

        const questionId = withValueOrBadRequest<number>(params.req.query.questionId, "number");

        const question = await staticProvider
            .ormConnection
            .getRepository(Question)
            .createQueryBuilder("q")
            .leftJoinAndSelect("q.answers", "qa")
            .where("q.id = :questionId", { questionId })
            .getOneOrFail();

        return {
            questionId: question.id,
            questionText: question.questionText,
            typeId: question.typeId,
            answers: (question.answers ?? []).map(x => toAnswerEditDTO(x))
        } as QuestionEditDataDTO;
    }

    saveQuestionAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<QuestionEditDataDTO>(params.req.body);
        const questionId = dto.questionId;

        await this._questionService
            .saveQuestionAsync(questionId, dto);
    }
}