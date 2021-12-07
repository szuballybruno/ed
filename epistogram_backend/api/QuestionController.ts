import { Question } from "../models/entity/Question";
import { QuestionEditDataDTO } from "../models/shared_models/QuestionEditDataDTO";
import { toAnswerEditDTO } from "../services/mappings";
import { saveQuestionAsync } from "../services/questionService";
import { staticProvider } from "../staticProvider";
import { ActionParams, withValueOrBadRequest } from "../utilities/helpers";

export class QuestionController {

    constructor() {


    }

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

        await saveQuestionAsync(questionId, dto);
    }
}