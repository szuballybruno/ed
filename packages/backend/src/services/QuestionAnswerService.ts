import { AnswerData } from '../models/entity/answer/AnswerData';
import { AnswerVersion } from '../models/entity/answer/AnswerVersion';
import { AnswerGivenAnswerBridge } from '../models/entity/misc/AnswerGivenAnswerBridge';
import { AnswerSession } from '../models/entity/misc/AnswerSession';
import { GivenAnswer } from '../models/entity/misc/GivenAnswer';
import { GivenAnswerStreak } from '../models/entity/misc/GivenAnswerStreak';
import { GivenAnswerView } from '../models/views/GivenAnswerView';
import { AnswerEditDTO } from '../shared/dtos/AnswerEditDTO';
import { AnswerResultDTO } from '../shared/dtos/AnswerResultDTO';
import { CoinAcquireResultDTO } from '../shared/dtos/CoinAcquireResultDTO';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { GivenAnswerDTO } from '../shared/dtos/questionAnswer/GivenAnswerDTO';
import { instantiate } from '../shared/logic/sharedLogic';
import { GivenAnswerStateType } from '../shared/types/sharedTypes';
import { Id } from '../shared/types/versionId';
import { InsertEntity } from '../utilities/misc';
import { CoinAcquireService } from './CoinAcquireService';
import { LoggerService } from './LoggerService';
import { GlobalConfiguration } from './misc/GlobalConfiguration';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export type AnswerMutationsType = Mutation<AnswerEditDTO, 'answerVersionId'>[];
export type AnswerVersionWithAnswerDataType = AnswerVersion & AnswerData;

type QuestionCorrectData = {
    questionVersionId: Id<'QuestionVersion'>;
    givenAnswerId: null | Id<'GivenAnswer'>;
    isCorrect: boolean;
    isExamQuestion: boolean;
};

type AnswerScoreDTO = {
    score: number,
    answerVersionId: Id<'AnswerVersion'>
}

type QuestionData = {
    answerCount: number,
    correctAnswerCount: number,
    incorrectAnswerCount: number,
    correctInclusive: number,
    incorrectInclusive: number,
    correctUserAnswerCount: number,
    incorrectUserAnswerCount: number,
    answers: GivenAnswerView[],
    questionVersionId: Id<'QuestionVersion'>
};

type QuestionDataWithScores = {
    questionData: QuestionData;
    questionScore: number;
};

export class QuestionAnswerService {

    constructor(
        private _ormService: ORMConnectionService,
        private _coinAcquireService: CoinAcquireService,
        private _loggerService: LoggerService,
        private _config: GlobalConfiguration) {
    }

    /**
     * Creates a new answer session
     */
    async createAnswerSessionAsync(
        userId: Id<'User'>,
        examVersionId: Id<'ExamVersion'> | null,
        videoVideoId: Id<'VideoVersion'> | null) {

        const { id: answerSessionId } = await this._ormService
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
    async saveGivenAnswerAsync({ givenAnswer, isPractiseAnswers, ...opts }: {
        userId: Id<'User'>,
        answerSessionId: Id<'AnswerSession'>,
        isPractiseAnswers: boolean,
        givenAnswer: GivenAnswerDTO
    }) {

        const {
            insertedAnswerGivenAnswerBridges,
            insertedGivenAnswers,
            coinResults
        } = await this
            .saveMultipleGivenAnswersAsync({
                ...opts,
                answerType: isPractiseAnswers ? 'practise' : 'video',
                givenAnswerDTOs: [givenAnswer],
                questionVersionIds: [givenAnswer.questionVersionId]
            });

        return this
            ._getAnswerResultAsync(insertedGivenAnswers.single(), insertedAnswerGivenAnswerBridges, coinResults);
    }

    /**
     * Answer question
     */
    async saveMultipleGivenAnswersAsync(
        {
            answerSessionId,
            questionVersionIds,
            answerType,
            userId,
            givenAnswerDTOs
        }: {
            userId: Id<'User'>,
            answerSessionId: Id<'AnswerSession'>,
            questionVersionIds: Id<'QuestionVersion'>[],
            answerType: 'practise' | 'video' | 'exam',
            givenAnswerDTOs: GivenAnswerDTO[]
        }) {

        const givenAnswerVersionIdsFlat = givenAnswerDTOs
            .flatMap(x => x.answerVersionIds);

        /**
         * Get given answer views 
         */
        const givenAnswerViews = (await this
            ._ormService
            .query(GivenAnswerView, { questionVersionIds })
            .where('questionVersionId', '=', 'questionVersionIds')
            .getMany())
            .orderBy(x => givenAnswerDTOs
                .firstOrNullIndex(i => i.questionVersionId === x.questionVersionId) ?? 999);

        /**
         * Get question data with scores 
         */
        const questioDatasWithScores = this
            ._getQuestionDataWithScores(givenAnswerVersionIdsFlat, givenAnswerViews);

        /**
         * Get given answers 
         */
        const givenAnswers = this
            ._getGivenAnswers(givenAnswerDTOs, questioDatasWithScores, answerType === 'practise', answerSessionId);

        /**
         * Insert given answers 
         */
        const insertedGivenAnswers = await this._ormService
            .createManyAsync(GivenAnswer, givenAnswers);

        /**
         * Get given answr - answer bridges
         */
        const answerGivenAnswerBridges = this
            ._getAnswerGivenAnswerBridges(insertedGivenAnswers, givenAnswerDTOs);

        /**
         * Insert given answr - answer bridges
         */
        const insertedAnswerGivenAnswerBridges = await this._ormService
            .createManyAsync(AnswerGivenAnswerBridge, answerGivenAnswerBridges);

        /**
         * Get all questions 
         */
        const questionCorrectData = this
            ._getQuestionCorrectData(insertedGivenAnswers, givenAnswerViews);

        /**
         * Handle given answer steak 
         */
        const streakId = await this
            ._handleAnswerStreakAsync(userId, questionCorrectData);

        /**
         * Handle coins
         */
        const coinResults = await this
            ._handleCoinsAsync(userId, streakId, insertedGivenAnswers, answerType !== 'exam');

        return {
            insertedGivenAnswers,
            insertedAnswerGivenAnswerBridges,
            coinResults
        };
    }

    /**
     * Get answer result async 
     */
    private async _getAnswerResultAsync(
        givenAnswer: GivenAnswer,
        answerGivenAnswerBridges: AnswerGivenAnswerBridge[],
        coinResults: CoinAcquireResultDTO[]) {

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

        // TODO use a better system of determining 
        // an answers correctnss
        const isCorrect = answerGivenAnswerBridges
            .all(x => correctAnswerVersionIds
                .some(c => c === x.answerVersionId));

        return instantiate<AnswerResultDTO>({
            correctAnswerVersionIds,
            givenAnswerVersionIds,
            coinAcquires: coinResults,
            isCorrect
        });
    }

    /**
     * Get question correct data
     */
    private _getQuestionCorrectData(
        givenAnswers: GivenAnswer[],
        givenAnswerViews: GivenAnswerView[]) {

        const correctAnswerData = givenAnswerViews
            .groupBy(x => x.questionVersionId)
            .map((group): QuestionCorrectData => {

                const givenAnswer = givenAnswers
                    .firstOrNull(givenAnswer => givenAnswer.questionVersionId === group.key);

                return ({
                    givenAnswerId: givenAnswer?.id ?? null,
                    isCorrect: givenAnswer?.state === 'CORRECT',
                    questionVersionId: group.key,
                    isExamQuestion: !!group.first.examVersionId
                });
            });

        return correctAnswerData;
    }

    /**
     * Insert given answers async 
     */
    private _getGivenAnswers(
        givenAnswers: GivenAnswerDTO[],
        questionDatasWithScores: QuestionDataWithScores[],
        isPractiseAnswers: boolean,
        answerSessionId: Id<'AnswerSession'>) {

        const { maxQuestionScore } = this._config.questionAnswer;

        const newGivenAnswers = givenAnswers
            .map(givenAnswerDTO => {

                const { questionVersionId, elapsedSeconds } = givenAnswerDTO;
                const { questionScore } = questionDatasWithScores
                    .single(x => x.questionData.questionVersionId === questionVersionId);

                const state: GivenAnswerStateType = maxQuestionScore === questionScore
                    ? 'CORRECT'
                    : questionScore > 0
                        ? 'MIXED'
                        : 'INCORRECT';

                return instantiate<InsertEntity<GivenAnswer>>({
                    isPractiseAnswer: isPractiseAnswers,
                    answerSessionId: answerSessionId,
                    creationDate: new Date(),
                    deletionDate: null,
                    questionVersionId,
                    elapsedSeconds,
                    givenAnswerStreakId: null,
                    score: questionScore,
                    state
                });
            });

        return newGivenAnswers;
    }

    /**
     * Insert given answer bridges 
     */
    private _getAnswerGivenAnswerBridges(
        givenAnswers: GivenAnswer[],
        givenAnswerDTOs: GivenAnswerDTO[]) {

        const givenAnswerAnswerBridges = givenAnswers
            .flatMap((givenAnswer, index) => {

                const givenAnswerDTO = givenAnswerDTOs[index];

                return givenAnswerDTO
                    .answerVersionIds
                    .map((answerVersionId): InsertEntity<AnswerGivenAnswerBridge> => ({
                        givenAnswerId: givenAnswer.id,
                        answerVersionId,
                        deletionDate: null
                    }));
            });

        return givenAnswerAnswerBridges;
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

            const { id: newGivenAnswerStreakId } = await this
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
    private _getQuestionDataWithScores(
        givenAnswerVersionIds: Id<'AnswerVersion'>[],
        givenAnswerViews: GivenAnswerView[]): QuestionDataWithScores[] {

        const { maxQuestionScore } = this
            ._config
            .questionAnswer;

        const { questionDatas } = this
            ._getQuestionDatas({
                givenAnswerVersionIds,
                givenAnswerViews
            });

        const questionDatasWithAnswerScores = questionDatas
            .map((questionData): QuestionDataWithScores => {

                const {
                    answerCount,
                    correctAnswerCount,
                    correctInclusive,
                    correctUserAnswerCount,
                    incorrectAnswerCount,
                    incorrectInclusive,
                    incorrectUserAnswerCount,
                } = questionData;

                const { questionScore } = this
                    ._getQuestionScore({
                        answerCount,
                        correctAnswerCount,
                        incorrectAnswerCount,
                        correctInclusive,
                        incorrectInclusive,
                        correctUserAnswerCount,
                        incorrectUserAnswerCount
                    });

                return {
                    questionData,
                    questionScore
                };
            });

        return questionDatasWithAnswerScores;
    }

    /**
     * Get question datas 
     */
    private _getQuestionDatas({
        givenAnswerViews,
        givenAnswerVersionIds
    }: {
        givenAnswerViews: GivenAnswerView[],
        givenAnswerVersionIds: Id<'AnswerVersion'>[]
    }): { questionDatas: QuestionData[] } {

        const questionDatas = givenAnswerViews
            .groupBy(view => view.questionVersionId)
            .map(group => {

                const answerCount = group
                    .items
                    .length;

                const correctAnswerCount = group
                    .items
                    .count(x => x.isCorrect);

                const incorrectAnswerCount = answerCount - correctAnswerCount;

                const correctInclusive = group
                    .items
                    .filter(x => x.isCorrect === givenAnswerVersionIds.includes(x.answerVersionId))
                    .length;

                const incorrectInclusive = answerCount - correctInclusive;

                const correctUserAnswerCount = group
                    .items
                    .filter(x => x.isCorrect && givenAnswerVersionIds.includes(x.answerVersionId))
                    .length;

                const incorrectUserAnswerCount = group
                    .items
                    .filter(x => !x.isCorrect && givenAnswerVersionIds.includes(x.answerVersionId))
                    .length;

                const qd: QuestionData = {
                    answerCount,
                    correctAnswerCount,
                    incorrectAnswerCount,
                    correctInclusive,
                    incorrectInclusive,
                    correctUserAnswerCount,
                    incorrectUserAnswerCount,
                    answers: group.items,
                    questionVersionId: group.key
                };

                return qd;
            });

        return { questionDatas };
    }

    /**
     * Get question score
     */
    private _getQuestionScore({
        answerCount,
        correctAnswerCount,
        correctUserAnswerCount,
        incorrectUserAnswerCount,
        correctInclusive,
        incorrectInclusive
    }: {
        answerCount: number,
        correctAnswerCount: number,
        incorrectAnswerCount: number,
        correctUserAnswerCount: number,
        incorrectUserAnswerCount: number,
        correctInclusive: number,
        incorrectInclusive: number
    }) {

        const noUserAnswer = Math.min(correctUserAnswerCount, 1);
        const score = correctInclusive * noUserAnswer;
        const whereToPunish = Math.min(1, Math.abs((correctUserAnswerCount + incorrectUserAnswerCount) - correctAnswerCount));
        const punishment = Math.min(score, incorrectInclusive * whereToPunish);
        const punishedScore = score - punishment;

        return {
            questionScore: punishedScore,
            punishment
        };
    }

    /**
     * Handle coins
     */
    private async _handleCoinsAsync(
        userId: Id<'User'>,
        streakId: Id<'GivenAnswerStreak'> | null,
        correctAnswerData: GivenAnswer[],
        canRewardAnswer: boolean): Promise<CoinAcquireResultDTO[]> {

        const correctGivenAnswers = canRewardAnswer
            ? correctAnswerData
                .filter(x => x.state === 'CORRECT')
            : [];

        /**
         * Reward answers 
         */
        const answerRewardTransactions = await this
            ._coinAcquireService
            .acquireGivenAnswerCoinsAsync(userId, correctGivenAnswers);

        const answerRewardResults = answerRewardTransactions
            .map(x => instantiate<CoinAcquireResultDTO>({
                amount: x.amount,
                reason: 'correct_answer'
            }));

        if (!streakId)
            return answerRewardResults;

        /**
         * Reward streak based on length
         */
        const streakLength = await this
            ._getStreakLengthAsync(streakId);

        const streakCoinReward = await this
            ._coinAcquireService
            .handleGivenAnswerStreakCoinsAsync(userId, streakId, streakLength);

        return answerRewardResults
            .concat(streakCoinReward ?? []);
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
