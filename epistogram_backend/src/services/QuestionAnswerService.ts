import { AnswerVersion } from '../models/entity/answer/AnswerVersion';
import { AnswerSession } from '../models/entity/AnswerSession';
import { AnswerResultDTO } from '../shared/dtos/AnswerResultDTO';
import { CoinAcquireResultDTO } from '../shared/dtos/CoinAcquireResultDTO';
import { InsertEntity, VersionMigrationHelpers, VersionMigrationResult } from '../utilities/misc';
import { CoinAcquireService } from './CoinAcquireService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { SQLFunctionsService } from './sqlServices/FunctionsService';

export class QuestionAnswerService {

    constructor(
        private _ormService: ORMConnectionService,
        private _sqlFunctionsService: SQLFunctionsService,
        private _coinAcquireService: CoinAcquireService) {
    }

    /**
     * Creates a new answer session  
     */
    async createAnswerSessionAsync(
        userId: number,
        examVersionId: number | null,
        videoVideoId: number | null) {

        const answerSessionId = await this._ormService
            .createAsync(AnswerSession, {
                examVersionId: examVersionId,
                videoVersionId: videoVideoId,
                userId: userId,
                isPractise: false,
                isCompleted: false,
                endDate: null,
                startDate: null
            });

        return answerSessionId;
    };

    /**
     * Answer question  
     */
    async answerQuestionAsync(
        userId: number,
        answerSessionId: number,
        questionVersionId: number,
        answerIds: number[],
        isExamQuestion: boolean,
        elapsedSeconds: number,
        isPractiseAnswer?: boolean) {

        const {
            correctAnswerIds,
            givenAnswerId,
            isCorrect,
            streakLength,
            streakId
        } = await this._sqlFunctionsService
            .answerQuestionFn(userId, answerSessionId, questionVersionId, answerIds, elapsedSeconds, !!isPractiseAnswer);

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
    };

    /**
     * Saves quesiton answers 
     */
    async saveQuestionAnswers(questionVersionMigrations: VersionMigrationResult[]) {


    }

    /**
     * Increment answer version 
     */
    async incrementAnswerVersions(questionVersionMigrations: VersionMigrationResult[]) {
        
        const oldQuestionIds = questionVersionMigrations
            .map(x => x.oldVersionId);

        const oldAnswerVersions = await this._ormService
            .query(AnswerVersion, { oldQuestionIds })
            .where('questionVersionId', '=', 'oldQuestionIds')
            .getMany();

        const newAnswerVersions = oldAnswerVersions
            .map((oldVersion) => {

                const newVersion: InsertEntity<AnswerVersion> = {
                    answerDataId: oldVersion.answerDataId,
                    answerId: oldVersion.answerId,
                    questionVersionId: VersionMigrationHelpers
                        .getNewVersionId(questionVersionMigrations, oldVersion.questionVersionId)
                };

                return newVersion;
            });

        await this._ormService
            .createManyAsync(AnswerVersion, newAnswerVersions);
    }
}