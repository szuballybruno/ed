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
    userId: number,
    answerSessionId: number,
    questionId: number,
    answerIds: number[],
    isExamQuestion: boolean,
    isPractiseAnswer?: boolean) => {

    const { correctAnswerIds, givenAnswerId, isCorrect, streakLength, streakId } = await staticProvider
        .services
        .sqlFunctionService
        .answerQuestionFn(userId, answerSessionId, questionId, answerIds, !!isPractiseAnswer);

    // if answer is correct give coin rewards 
    if (isCorrect && !isExamQuestion) {

        await staticProvider
            .services
            .coinAcquireService
            .acquireQuestionAnswerCoinsAsync(userId, givenAnswerId);

        await staticProvider
            .services
            .coinAcquireService
            .handleGivenAnswerStreakCoinsAsync(userId, streakId, streakLength);
    }


    return {
        correctAnswerIds: correctAnswerIds,
        givenAnswerIds: answerIds,
        isCorrect: isCorrect
    } as AnswerResultDTO;
}