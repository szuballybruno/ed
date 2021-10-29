import { Request } from "express";
import { Answer } from "../models/entity/Answer";
import { Question } from "../models/entity/Question";
import { AnswerQuestionDTO } from "../models/shared_models/AnswerQuestionDTO";
import { QuestionEditDataDTO } from "../models/shared_models/QuestionEditDataDTO";
import { toAnswerDTO, toAnswerEditDTO } from "../services/mappings";
import { answerVideoQuestionAsync } from "../services/videoService";
import { staticProvider } from "../staticProvider";
import { ActionParamsType, getAsyncActionHandler, withValueOrBadRequest } from "../utilities/helpers";

export const answerVideoQuestionAction = getAsyncActionHandler(async (req: Request) => {

    const dto = withValueOrBadRequest<AnswerQuestionDTO>(req.body);
    const answerId = withValueOrBadRequest<number>(dto.answerId, "number");
    const questionId = withValueOrBadRequest<number>(dto.questionId, "number");
    const answerSessionId = withValueOrBadRequest<number>(dto.answerSessionId, "number");

    return answerVideoQuestionAsync(answerSessionId, questionId, answerId);
});

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

    // save quesiton data
    await staticProvider
        .ormConnection
        .getRepository(Question)
        .save({
            id: dto.questionId,
            questionText: dto.questionText,
            typeId: dto.typeId
        });

    // delete answers 
    const questionAnswers = await staticProvider
        .ormConnection
        .getRepository(Answer)
        .find({
            where: {
                questionId
            }
        });

    const deletedAnswerIds = questionAnswers
        .filter(x => !dto.answers.some(dtoAnswer => dtoAnswer.id === x.id))
        .map(x => x.id);

    if (deletedAnswerIds.length > 0)
        await staticProvider
            .ormConnection
            .getRepository(Answer)
            .delete(deletedAnswerIds);

    // update answers
    const updateAnswers = dto
        .answers
        .filter(x => x.id >= 0)
        .map(x => ({
            id: x.id,
            text: x.text,
            isCorrect: x.isCorrect,
        } as Answer));

    if (updateAnswers.length > 0)
        await staticProvider
            .ormConnection
            .getRepository(Answer)
            .save(updateAnswers);

    // insert questions 
    const insertAnswers = dto
        .answers
        .filter(x => x.id < 0)
        .map(x => ({
            id: x.id,
            text: x.text,
            isCorrect: x.isCorrect,
            questionId
        } as Answer));

    if (insertAnswers.length > 0)
        await staticProvider
            .ormConnection
            .getRepository(Answer)
            .insert(insertAnswers);
}