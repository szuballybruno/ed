import { AnswerSession } from "../models/entity/AnswerSession";
import { AnswerResultDTO } from "../models/shared_models/AnswerResultDTO";
import { staticProvider } from "../staticProvider";
import { answerQuestionFn } from "./sqlServices/sqlFunctionsService";

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
    answerId: number,
    isPractiseAnswer?: boolean) => {

    const correctAnswerId = await answerQuestionFn(answerSessionId, questionId, answerId, !!isPractiseAnswer);

    return {
        correctAnswerId: correctAnswerId,
        givenAnswerId: answerId
    } as AnswerResultDTO;
}