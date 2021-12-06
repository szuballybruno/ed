import { AnswerSession } from "../models/entity/AnswerSession";
import { AnswerResultDTO } from "../models/shared_models/AnswerResultDTO";
import { CoinAcquireResultDTO } from "../models/shared_models/CoinAcquireResultDTO";
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

    let coinAcquires = null as null | {
        normal: CoinAcquireResultDTO | null,
        bonus: CoinAcquireResultDTO | null
    }

    // if answer is correct give coin rewards 
    if (isCorrect && !isExamQuestion) {

        const acquire = await staticProvider
            .services
            .coinAcquireService
            .acquireQuestionAnswerCoinsAsync(userId, givenAnswerId);

        const streakAcquire = await staticProvider
            .services
            .coinAcquireService
            .handleGivenAnswerStreakCoinsAsync(userId, streakId, streakLength);

        coinAcquires = {
            normal: acquire,
            bonus: streakAcquire
        }
    }

    return {
        correctAnswerIds: correctAnswerIds,
        givenAnswerIds: answerIds,
        isCorrect: isCorrect,
        coinAcquires
    } as AnswerResultDTO;
}