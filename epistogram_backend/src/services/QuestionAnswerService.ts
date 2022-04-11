import { AnswerSession } from '../models/entity/AnswerSession';
import { AnswerResultDTO } from '../shared/dtos/AnswerResultDTO';
import { CoinAcquireResultDTO } from '../shared/dtos/CoinAcquireResultDTO';
import { CoinAcquireService } from './CoinAcquireService';
import { SQLFunctionsService } from './sqlServices/FunctionsService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class QuestionAnswerService {

    private _ormService: ORMConnectionService;
    private _sqlFunctionsService: SQLFunctionsService;
    private _coinAcquireService: CoinAcquireService;

    constructor(
        ormService: ORMConnectionService,
        sqlFunctionsService: SQLFunctionsService,
        coinAcquireService: CoinAcquireService) {

        this._coinAcquireService = coinAcquireService;
        this._ormService = ormService;
        this._sqlFunctionsService = sqlFunctionsService;
    }

    createAnswerSessionAsync = async (
        userId: number,
        examId?: number | null,
        videoId?: number | null) => {

        const session = {
            examId: examId,
            videoId: videoId,
            userId: userId
        } as AnswerSession;

        await this._ormService
            .getRepository(AnswerSession)
            .insert(session);

        return session.id;
    }

    answerQuestionAsync = async (
        userId: number,
        answerSessionId: number,
        questionId: number,
        answerIds: number[],
        isExamQuestion: boolean,
        elapsedSeconds: number,
        isPractiseAnswer?: boolean) => {

        const {
            correctAnswerIds,
            givenAnswerId,
            isCorrect,
            streakLength,
            streakId
        } = await this._sqlFunctionsService
            .answerQuestionFn(userId, answerSessionId, questionId, answerIds, elapsedSeconds, !!isPractiseAnswer);

        let coinAcquires = null as null | {
            normal: CoinAcquireResultDTO | null,
            bonus: CoinAcquireResultDTO | null
        };

        // if answer is correct give coin rewards 
        if (isCorrect && !isExamQuestion) {

            const acquire = await this._coinAcquireService
                .acquireQuestionAnswerCoinsAsync(userId, givenAnswerId);

            const streakAcquire = await this._coinAcquireService
                .handleGivenAnswerStreakCoinsAsync(userId, streakId, streakLength);

            coinAcquires = {
                normal: acquire,
                bonus: streakAcquire
            };
        }

        return {
            correctAnswerIds: correctAnswerIds,
            givenAnswerIds: answerIds,
            isCorrect: isCorrect,
            coinAcquires
        } as AnswerResultDTO;
    }
}