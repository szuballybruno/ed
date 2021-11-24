import { AnswerSession } from "../models/entity/AnswerSession";
import { AnswerResultDTO } from "../models/shared_models/AnswerResultDTO";
import { staticProvider } from "../staticProvider";

export const createAnswerSessionAsync = async (
    userId: number,
    examId?: number | null,
    videoId?: number | null) => {

    const session = {
        examId: examId,
        videoId: videoId,
        userId: userId
    } as AnswerSession;

    await staticProvider
        .ormConnection
        .getRepository(AnswerSession)
        .insert(session);

    return session.id;
}

export const answerQuestionAsync = async (
    answerSessionId: number,
    questionId: number,
    answerIds: number[],
    isPractiseAnswer?: boolean) => {

    const correctAnswerIds = await staticProvider
        .services
        .sqlFunctionService
        .answerQuestionFn(answerSessionId, questionId, answerIds, !!isPractiseAnswer);
    const isCorrect = correctAnswerIds.sort().join(',') === answerIds.sort().join(',');

    return {
        correctAnswerIds: correctAnswerIds,
        givenAnswerIds: answerIds,
        isCorrect: isCorrect
    } as AnswerResultDTO;
}