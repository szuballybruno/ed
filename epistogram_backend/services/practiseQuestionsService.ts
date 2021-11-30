import { AnswerSession } from "../models/entity/AnswerSession";
import { AnswerQuestionDTO } from "../models/shared_models/AnswerQuestionDTO";
import { PractiseQuestionDTO } from "../models/shared_models/PractiseQuestionDTO";
import { PractiseQuestionView } from "../models/views/PractiseQuestionView";
import { staticProvider } from "../staticProvider";
import { answerQuestionAsync } from "./questionAnswerService";

export const getPractiseQuestionAsync = async (userId: number) => {

    const questionViews = await staticProvider
        .ormConnection
        .getRepository(PractiseQuestionView)
        .createQueryBuilder("pq")
        .where("pq.userId = :userId", { userId })
        .getMany();

    if (!questionViews.any())
        return null;

    const questionGroup = questionViews
        .groupBy(x => x.questionId)
        .first();

    const viewAsQuesiton = questionGroup.items.first();

    const questionDTO = {
        questionId: viewAsQuesiton.questionId,
        questionText: viewAsQuesiton.questionText,
        typeId: viewAsQuesiton.questionTypeId,
        answers: questionGroup
            .items
            .map(x => ({
                answerId: x.answerId,
                answerText: x.answerText
            }))
    } as PractiseQuestionDTO;

    return questionDTO;
}

export const answerPractiseQuestionAsync = async (userId: number, qu: AnswerQuestionDTO) => {

    const practiseAnswerSession = await getUserPractiseAnswerSession(userId);

    return await answerQuestionAsync(userId, practiseAnswerSession.id, qu.questionId, qu.answerIds, false, true);
}

export const getUserPractiseAnswerSession = async (userId: number) => {

    const userPractiseAnswerSession = await staticProvider
        .ormConnection
        .getRepository(AnswerSession)
        .createQueryBuilder("as")
        .where("as.isPractiseAnswerSession = true")
        .andWhere("as.userId = :userId", { userId })
        .getOneOrFail();

    return userPractiseAnswerSession;
}