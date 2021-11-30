import { Question } from "../models/entity/Question";
import { AnswerQuestionDTO } from "../models/shared_models/AnswerQuestionDTO";
import { QuestionEditDataDTO } from "../models/shared_models/QuestionEditDataDTO";
import { toAnswerEditDTO } from "../services/mappings";
import { saveQuestionAsync } from "../services/questionService";
import { answerVideoQuestionAsync } from "../services/videoService";
import { staticProvider } from "../staticProvider";
import { ActionParamsType, withValueOrBadRequest } from "../utilities/helpers";

export const answerVideoQuestionAction = async (params: ActionParamsType) => {

    const dto = withValueOrBadRequest<AnswerQuestionDTO>(params.req.body);
    const answerIds = withValueOrBadRequest<number[]>(dto.answerIds);
    const questionId = withValueOrBadRequest<number>(dto.questionId, "number");
    const answerSessionId = withValueOrBadRequest<number>(dto.answerSessionId, "number");

    return answerVideoQuestionAsync(params.userId, answerSessionId, questionId, answerIds);
};

export const getQuestionEditDataAction = async (params: ActionParamsType) => {

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

export const saveQuestionAction = async (params: ActionParamsType) => {

    const dto = withValueOrBadRequest<QuestionEditDataDTO>(params.req.body);
    const questionId = dto.questionId;

    await saveQuestionAsync(questionId, dto);
}