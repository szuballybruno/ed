import { AnswerData } from '../models/entity/answer/AnswerData';
import { AnswerVersion } from '../models/entity/answer/AnswerVersion';
import { AnswerGivenAnswerBridge } from '../models/entity/misc/AnswerGivenAnswerBridge';
import { AnswerSession } from '../models/entity/misc/AnswerSession';
import { GivenAnswer } from '../models/entity/misc/GivenAnswer';
import { GivenAnswerStreak } from '../models/entity/misc/GivenAnswerStreak';
import { AnswerEditDTO } from '../shared/dtos/AnswerEditDTO';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { GivenAnswerDTO } from '../shared/dtos/questionAnswer/GivenAnswerDTO';
import { instantiate } from '../shared/logic/sharedLogic';
import { Id } from '../shared/types/versionId';
import { InsertEntity } from '../utilities/misc';
import { CoinAcquireService } from './CoinAcquireService';
import { LoggerService } from './LoggerService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export type AnswerMutationsType = Mutation<AnswerEditDTO, 'answerVersionId'>[];
export type AnswerVersionWithAnswerDataType = AnswerVersion & AnswerData;

type CorrectAnswerData = {
    givenAnswerId: Id<'GivenAnswer'>,
    isCorrect: boolean
};

export class QuestionAnswerService {

    constructor(
        private _ormService: ORMConnectionService,
        private _coinAcquireService: CoinAcquireService,
        private _loggerService: LoggerService) {
    }

    /**
     * Creates a new answer session
     */
    async createAnswerSessionAsync(
        userId: Id<'User'>,
        examVersionId: Id<'ExamVersion'> | null,
        videoVideoId: Id<'VideoVersion'> | null) {

        const answerSessionId = await this._ormService
            .createAsync(AnswerSession, {
                examVersionId: examVersionId,
                videoVersionId: videoVideoId,
                userId: userId,
                isPractise: false,
                startDate: new Date()
            });

        return answerSessionId;
    }

    /**
     * Answer question
     */
    async saveGivenAnswersAsync(
        {
            answerSessionId,
            isPractiseAnswers,
            userId,
            givenAnswers
        }: {
            userId: Id<'User'>,
            answerSessionId: Id<'AnswerSession'>,
            isPractiseAnswers: boolean,
            givenAnswers: GivenAnswerDTO[]
        }) {

        /**
         * Insert given answers 
         */
        const newGivenAnswers = givenAnswers
            .map(x => instantiate<InsertEntity<GivenAnswer>>({
                isPractiseAnswer: isPractiseAnswers,
                answerSessionId: answerSessionId,
                creationDate: new Date(),
                deletionDate: null,
                questionVersionId: x.questionVersionId,
                isCorrect: true,
                elapsedSeconds: x.elapsedSeconds,
                givenAnswerStreakId: null
            }));

        const givenAnswerIds = await this._ormService
            .createManyAsync(GivenAnswer, newGivenAnswers);

        /**
         * Insert given answr - answer bridges
         */
        const givenAnswerAnswerBridges = givenAnswerIds
            .flatMap((givenAnswerId, index) => {

                const givenAnswer = givenAnswers[index];

                return givenAnswer
                    .answerVersionIds
                    .map((answerVersionId): InsertEntity<AnswerGivenAnswerBridge> => ({
                        givenAnswerId,
                        answerVersionId: answerVersionId,
                        deletionDate: null,
                    }));
            });

        await this._ormService
            .createManyAsync(AnswerGivenAnswerBridge, givenAnswerAnswerBridges);

        /**
         * Get correct answer data
         */
        const correctAnswerData = await this
            ._getCorrectAnswerData(givenAnswerIds);

        /**
         * Handle given answer steak 
         */
        const streakId = await this
            ._handleAnswerStreakAsync(userId, correctAnswerData);

        /**
         * Handle coins
         */
        await this
            ._handleCoinsAsync(userId, streakId, correctAnswerData);
    }

    /**
     * Update streaks
     * - If all correct create or append to streak
     * - If any incorrect finalize streak, or do nothing  
     */
    private async _handleAnswerStreakAsync(
        userId: Id<'User'>,
        correctAnswerData: CorrectAnswerData[]) {

        const currentGivenAnswerStreak = await this
            ._ormService
            .query(GivenAnswerStreak, { userId })
            .where('userId', '=', 'userId')
            .and('isFinalized', '=', 'false')
            .getOneOrNull();

        const isAllCorrect = correctAnswerData
            .all(x => x.isCorrect);

        const assignAllToAnswerStreakAsync = async (givenAnswerStreakId: Id<'GivenAnswerStreak'>) => {

            await this
                ._ormService
                .save(GivenAnswer, correctAnswerData
                    .map(x => x.givenAnswerId)
                    .map(givenAnswerId => ({
                        id: givenAnswerId,
                        givenAnswerStreakId
                    })));
        };

        /**
         * New streak
         */
        if (isAllCorrect && !currentGivenAnswerStreak) {

            const newGivenAnswerStreakId = await this
                ._ormService
                .createAsync(GivenAnswerStreak, {
                    isFinalized: false,
                    userId
                });

            await assignAllToAnswerStreakAsync(newGivenAnswerStreakId);

            // streak started event 

            return newGivenAnswerStreakId;
        }

        /**
         * Lost streak
         */
        if (!isAllCorrect && currentGivenAnswerStreak) {

            await this
                ._ormService
                .save(GivenAnswerStreak, {
                    id: currentGivenAnswerStreak.id,
                    isFinalized: true
                });

            // streak lost event 

            return null;
        }

        /**
         * Grew streak
         */
        if (isAllCorrect && currentGivenAnswerStreak) {

            await assignAllToAnswerStreakAsync(currentGivenAnswerStreak.id);

            // streak grew event

            return currentGivenAnswerStreak.id;
        }

        /**
         * No correct event, 
         * and no existing streak,
         * basically do nothing at all... 
         */
        return null;
    }

    /**
     * getCorrectAnswerData 
     */
    private _getCorrectAnswerData(givenAnswerIds: Id<'GivenAnswer'>[]): CorrectAnswerData[] {

        return givenAnswerIds
            .map(givenAnswerId => ({
                givenAnswerId,
                isCorrect: true
            }));
    }

    /**
     * Handle coins
     */
    private async _handleCoinsAsync(
        userId: Id<'User'>,
        streakId: Id<'GivenAnswerStreak'> | null,
        correctAnswerData: CorrectAnswerData[]) {

        /**
         * Reward streak based on length
         */
        if (streakId) {

            const streakLength = await this
                ._getStreakLengthAsync(streakId);
        }

        /**
         * Reward answers 
         */
        const isAllCorrect = correctAnswerData
            .all(x => x.isCorrect);

        // TODO coins
    }

    /**
     * Get GivenAnswerStreak length 
     */
    private async _getStreakLengthAsync(givenAnswerStreakId: Id<'GivenAnswerStreak'> | null) {

        const rows = await this._ormService
            .query(GivenAnswerStreak, { givenAnswerStreakId })
            .leftJoin(GivenAnswer, x => x
                .on('givenAnswerStreakId', '=', 'id', GivenAnswerStreak))
            .where('id', '=', 'givenAnswerStreakId')
            .getMany();

        return rows.length;
    }
}
