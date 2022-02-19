import { Question } from "../models/entity/Question";
import { AnswerQuestionDTO } from "../sharedd/dtos/AnswerQuestionDTO";
import { QuestionEditDataDTO } from "../sharedd/dtos/QuestionEditDataDTO";
import { toAnswerEditDTO } from "../services/misc/mappings";
import { PractiseQuestionService } from "../services/PractiseQuestionService";
import { QuestionService } from "../services/QuestionService";
import { ORMConnectionService } from "../services/sqlServices/ORMConnectionService";
import { ActionParams, withValueOrBadRequest } from "../utilities/helpers";

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

    answerPractiseQuestionAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<AnswerQuestionDTO>(params.req.body);

        return this._practiseQuestionService
            .answerPractiseQuestionAsync(params.currentUserId, dto);
    };

    getQuestionEditDataAction = async (params: ActionParams) => {

        const questionId = withValueOrBadRequest<number>(params.req.query.questionId, "number");

        const question = await this._ormService
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