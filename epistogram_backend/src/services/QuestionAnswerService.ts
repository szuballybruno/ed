import { AnswerData } from '../models/entity/answer/AnswerData';
import { AnswerVersion } from '../models/entity/answer/AnswerVersion';
import { AnswerGivenAnswerBridge } from '../models/entity/misc/AnswerGivenAnswerBridge';
import { AnswerSession } from '../models/entity/misc/AnswerSession';
import { GivenAnswer } from '../models/entity/misc/GivenAnswer';
import { GivenAnswerStreak } from '../models/entity/misc/GivenAnswerStreak';
import { GivenAnswerView } from '../models/views/GivenAnswerView';
import { AnswerEditDTO } from '../shared/dtos/AnswerEditDTO';
import { AnswerResultDTO } from '../shared/dtos/AnswerResultDTO';
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

type QuestionCorrectData = {
    questionVersionId: Id<'QuestionVersion'>;
    givenAnswerId: null | Id<'GivenAnswer'>;
    isCorrect: boolean;
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
     * Save a singular given answer 
     */
    async saveGivenAnswerAsync({ givenAnswer, ...opts }: {
        userId: Id<'User'>,
        answerSessionId: Id<'AnswerSession'>,
        isPractiseAnswers: boolean,
        givenAnswer: GivenAnswerDTO
    }) {

        const {
            insertedAnswerGivenAnswerBridges,
            insertedGivenAnswers
        } = await this
            .saveMultipleGivenAnswersAsync({ ...opts, givenAnswers: [givenAnswer] });

        return this
            ._getAnswerResultAsync(insertedGivenAnswers.single(), insertedAnswerGivenAnswerBridges);
    }

    /**
     * Answer question
     */
    async saveMultipleGivenAnswersAsync(
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
        const insertedGivenAnswers = await this
            ._insertGivenAnswersAsync(givenAnswers, isPractiseAnswers, answerSessionId);

        /**
         * Insert given answr - answer bridges
         */
        const insertedAnswerGivenAnswerBridges = await this
            ._insertAnswerGivenAnswerBridgesAsync(insertedGivenAnswers, givenAnswers);

        /**
         * Get all questions 
         */
        const correctAnswerData = await this
            ._getQuestionCorrectDataAsync(insertedGivenAnswers, insertedAnswerGivenAnswerBridges, answerSessionId);

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

        return {
            insertedGivenAnswers,
            insertedAnswerGivenAnswerBridges
        };
    }

    /**
     * Get answer result async 
     */
    private async _getAnswerResultAsync(givenAnswer: GivenAnswer, answerGivenAnswerBridges: AnswerGivenAnswerBridge[]) {

        const views = await this
            ._ormService
            .query(GivenAnswerView, { questionVersionId: givenAnswer.questionVersionId })
            .where('questionVersionId', '=', 'questionVersionId')
            .getMany();

        const givenAnswerVersionIds = answerGivenAnswerBridges
            .map(x => x.answerVersionId);

        const correctAnswerVersionIds = views
            .filter(x => x.isCorrect)
            .map(x => x.answerVersionId);

        return instantiate<AnswerResultDTO>({
            correctAnswerVersionIds,
            givenAnswerVersionIds,
            coinAcquires: {
                bonus: null,
                normal: null
            },
            isCorrect: false
        });
    }

    /**
     * Get question correct data
     */
    private async _getQuestionCorrectDataAsync(
        givenAnswers: GivenAnswer[],
        answerGivenAnswerBridges: AnswerGivenAnswerBridge[],
        answerSessionId: Id<'AnswerSession'>) {

        const questionVersions = await this
            ._ormService
            .query(GivenAnswerView, { answerSessionId })
            .where('answerSessionId', '=', 'answerSessionId')
            .getMany();

        const correctAnswerData = questionVersions
            .groupBy(x => x.questionVersionId)
            .map((group): QuestionCorrectData => ({
                givenAnswerId: givenAnswers
                    .firstOrNull(givenAnswer => givenAnswer.questionVersionId === group.key)?.id ?? null,
                isCorrect: group
                    .items
                    .filter(answerView => answerView.isCorrect)
                    .all(answerView => answerGivenAnswerBridges
                        .some(bridge => bridge.answerVersionId === answerView.answerVersionId)),
                questionVersionId: group.key
            }));

        return correctAnswerData;
    }

    /**
     * Insert given answers async 
     */
    private async _insertGivenAnswersAsync(
        givenAnswers: GivenAnswerDTO[],
        isPractiseAnswers: boolean,
        answerSessionId: Id<'AnswerSession'>) {

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

        const insertedGivenAnswers = await this._ormService
            .createManyAsync(GivenAnswer, newGivenAnswers);

        return insertedGivenAnswers;
    }

    /**
     * Insert given answer bridges 
     */
    private async _insertAnswerGivenAnswerBridgesAsync(givenAnswers: GivenAnswer[], givenAnswerDTOs: GivenAnswerDTO[]) {

        const answerVersionIds = givenAnswerDTOs
            .flatMap(x => x.answerVersionIds);

        const answerScores = await this
            ._getAnswerScoresAsync(givenAnswers, answerVersionIds);

        const givenAnswerAnswerBridges = givenAnswers
            .flatMap((givenAnswer, index) => {

                const givenAnswerDTO = givenAnswerDTOs[index];

                return givenAnswerDTO
                    .answerVersionIds
                    .map((answerVersionId): InsertEntity<AnswerGivenAnswerBridge> => ({
                        givenAnswerId: givenAnswer.id,
                        answerVersionId,
                        deletionDate: null,
                        score: answerScores
                            .single(x => x.answerVersionId === answerVersionId)
                            .score
                    }));
            });

        const insertedAnswerGivenAnswerBridges = await this._ormService
            .createManyAsync(AnswerGivenAnswerBridge, givenAnswerAnswerBridges);

        return insertedAnswerGivenAnswerBridges;
    }

    /**
     * Update streaks
     * - If all correct create or append to streak
     * - If any incorrect finalize streak, or do nothing  
     */
    private async _handleAnswerStreakAsync(
        userId: Id<'User'>,
        questionData: QuestionCorrectData[]) {

        const currentGivenAnswerStreak = await this
            ._ormService
            .query(GivenAnswerStreak, { userId })
            .where('userId', '=', 'userId')
            .and('isFinalized', '=', 'false')
            .getOneOrNull();

        const isAllCorrect = questionData
            .all(x => x.isCorrect);

        const assignAllToAnswerStreakAsync = async (givenAnswerStreakId: Id<'GivenAnswerStreak'>) => {

            await this
                ._ormService
                .save(GivenAnswer, questionData
                    .filter(x => !!x.givenAnswerId)
                    .map(x => x.givenAnswerId!)
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
    private async _getAnswerScoresAsync(givenAnswers: GivenAnswer[], answerVersionIds: Id<'AnswerVersion'>[]) {

        // constnts 
        const incorrectAnswerValueMultiplier = 0;

        const questionVersionIds = givenAnswers
            .map(x => x.questionVersionId);

        const allGaViews = await this
            ._ormService
            .query(GivenAnswerView, { questionVersionIds })
            .where('questionVersionId', '=', 'questionVersionIds')
            .getMany();

        return answerVersionIds
            .map(answerVersionId => {

                const answerView = allGaViews
                    .single(x => x.answerVersionId === answerVersionId);

                const score = answerView.isCorrect
                    ? 1
                    : 1 * incorrectAnswerValueMultiplier;

                return {
                    answerVersionId,
                    score
                };
            });
    }

    /**
     * Handle coins
     */
    private async _handleCoinsAsync(
        userId: Id<'User'>,
        streakId: Id<'GivenAnswerStreak'> | null,
        correctAnswerData: QuestionCorrectData[]) {

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
