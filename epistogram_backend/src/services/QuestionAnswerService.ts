import { Answer } from '../models/entity/answer/Answer';
import { AnswerData } from '../models/entity/answer/AnswerData';
import { AnswerVersion } from '../models/entity/answer/AnswerVersion';
import { AnswerSession } from '../models/entity/misc/AnswerSession';
import { AnswerEditDTO } from '../shared/dtos/AnswerEditDTO';
import { AnswerResultDTO } from '../shared/dtos/AnswerResultDTO';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { instantiate } from '../shared/logic/sharedLogic';
import { Id } from '../shared/types/versionId';
import { VersionMigrationContainer } from '../utilities/misc';
import { CoinAcquireService } from './CoinAcquireService';
import { LoggerService } from './LoggerService';
import { XMutatorHelpers } from './misc/XMutatorHelpers';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { SQLFunctionsService } from './sqlServices/FunctionsService';
import { VersionSaveService } from './VersionSaveService';
import { GivenAnswerStreak } from '../models/entity/misc/GivenAnswerStreak';
import { GivenAnswer } from '../models/entity/misc/GivenAnswer';
import { AnswerGivenAnswerBridge } from '../models/entity/misc/AnswerGivenAnswerBridge';
import { QuestionVersion } from '../models/entity/question/QuestionVersion';

export type AnswerMutationsType = Mutation<AnswerEditDTO, 'answerVersionId'>[];
export type AnswerVersionWithAnswerDataType = AnswerVersion & AnswerData;

type GivenAnswerDTO = {
    questionVersionId: Id<'QuestionVersion'>,
    answerVersionIds: Id<'AnswerVersion'>[],
    elapsedSeconds: number,
};

export class QuestionAnswerService {

    constructor(
        private _ormService: ORMConnectionService,
        private _sqlFunctionsService: SQLFunctionsService,
        private _coinAcquireService: CoinAcquireService,
        private _versionSaveService: VersionSaveService,
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

        const givenAnswerStreakId = await this
            .handleAnswerStreakAsync(userId, isGivenAnswersFullyCorrect, isAnsweredCorrectlyBefore);

        const streakLength = await this
            .getStreakLengthAsync(givenAnswerStreakId);

        return this
            .saveGivenAnswerAsync(
                isPractiseAnswer,
                questionVersionId,
                answerSessionId,
                !!x.isCorrect,
                givenAnswerStreakId,
                elapsedSeconds,
                x.id);

        const canAcquireCoin = isGivenAnswersFullyCorrect && !isExamQuestion;

        const coinAcquires = {
            normal: canAcquireCoin
                ? await this
                    ._coinAcquireService
                    .acquireQuestionAnswerCoinsAsync(userId, savedGivenAnswers
                        .first().givenAnswerId)
                : null,
            bonus: canAcquireCoin
                ? await this
                    ._coinAcquireService
                    .handleGivenAnswerStreakCoinsAsync(userId, givenAnswerStreakId!, streakLength)
                : null
        };

        await Promise
            .all(savedGivenAnswers
                .map(async x => {
                    this._loggerService.logScoped('GIVEN ANSWER', 'userId: ' + userId);
                    this._loggerService.logScoped('GIVEN ANSWER', 'answerSessionId: ' + answerSessionId);
                    this._loggerService.logScoped('GIVEN ANSWER', 'questionVersionId: ' + questionVersionId);
                    this._loggerService.logScoped('GIVEN ANSWER', 'answerVersionIds: ' + x.answerVersionId);
                    this._loggerService.logScoped('GIVEN ANSWER', 'isExamQuestion: ' + isExamQuestion);
                    this._loggerService.logScoped('GIVEN ANSWER', 'elapsedSeconds: ' + elapsedSeconds);
                    this._loggerService.logScoped('GIVEN ANSWER', 'isPractiseAnswer: ' + isPractiseAnswer);

                    const canAcquireCoin = x.isCorrect && !isExamQuestion;

                    const coinAcquires = {
                        normal: canAcquireCoin
                            ? await this
                                ._coinAcquireService
                                .acquireQuestionAnswerCoinsAsync(userId, x.givenAnswerId)
                            : null,
                        bonus: canAcquireCoin
                            ? await this
                                ._coinAcquireService
                                .handleGivenAnswerStreakCoinsAsync(userId, givenAnswerStreakId!, streakLength)
                            : null
                    };
                }));

        const correctAnswerVersionIds = savedGivenAnswers
            .filter(x => x.isCorrect)
            .map(x => x.answerVersionId);

        return instantiate<AnswerResultDTO>({
            correctAnswerVersionIds,
            givenAnswerVersionIds: answerVersionIds,
            isCorrect: isGivenAnswersFullyCorrect,
            coinAcquires
        });
    }

    /**
     * Saves quesiton answers
     */
    async saveAnswersAsync(
        mutations: AnswerMutationsType,
        questionVersionIdMigrations: VersionMigrationContainer<'QuestionVersion'>) {

        return await this._versionSaveService
            .saveAsync({
                dtoSignature: AnswerEditDTO,
                versionSignature: AnswerVersion,
                dataSignature: AnswerData,
                entitySignature: Answer,
                parentVersionIdField: 'questionVersionId',
                getParentOldVersionId: x => x.questionVersionId,
                getDataId: x => x.answerDataId,
                getEntityId: x => x.answerId,
                getVersionId: x => x.key,
                getDefaultData: (mut) => ({
                    isCorrect: false,
                    text: ''
                }),
                getNewEntity: () => ({}),
                getNewVersion: ({ entityId, newDataId, newParentVersionId }) => ({
                    answerDataId: newDataId,
                    answerId: entityId,
                    questionVersionId: newParentVersionId
                }),
                overrideDataProps: (data, mutation) => {

                    const { isCorrect, text } = XMutatorHelpers
                        .mapMutationToPartialObject(mutation);

                    if (isCorrect === false || isCorrect === true)
                        data.isCorrect = isCorrect;

                    if (text)
                        data.text = text;

                    return data;
                },
                muts: mutations,
                parentVersionIdMigrations: questionVersionIdMigrations,
                getDataDisplayNameArg: x => x.text
            });
    }

    /**
     * It saves one given answer, for one question, in one answer session
     */
    async saveGivenAnswerAsync(
        isPractiseAnswer: boolean,
        questionVersionId: Id<'QuestionVersion'>,
        answerSessionId: Id<'AnswerSession'>,
        isCorrect: boolean,
        givenAnswerStreakId: Id<'GivenAnswerStreak'> | null,
        elapsedSeconds: number,
        answerVersionId: Id<'AnswerVersion'>
    ) {

        // Creates new GivenAnswer
        const createdGivenAnswer = await this._ormService
            .createAsync(GivenAnswer, {
                creationDate: new Date(Date.now()),
                deletionDate: null,
                isPractiseAnswer: isPractiseAnswer,
                questionVersionId: questionVersionId,
                answerSessionId: answerSessionId,
                isCorrect: isCorrect,
                givenAnswerStreakId: givenAnswerStreakId,
                elapsedSeconds: elapsedSeconds
            });

        // Creates new AnswerGivenAnswerBridge3
        await this._ormService
            .createAsync(AnswerGivenAnswerBridge, {
                givenAnswerId: createdGivenAnswer,
                answerVersionId: answerVersionId,
                deletionDate: null
            });

        return {
            isPractiseAnswer,
            questionVersionId,
            answerSessionId,
            isCorrect,
            givenAnswerStreakId,
            elapsedSeconds,
            answerVersionId,
            givenAnswerId: createdGivenAnswer
        };
    }

    /**
     * Gets isCorrect flag for all answerVersions
     * @param answerVersionIds
     * @private
     */
    private async getAnswerVersionsWithAnswerDataAsync(answerVersionIds: Id<'AnswerVersion'>[]) {

        return Promise.all(answerVersionIds
            .map(answerVersionId => {
                return this._ormService
                    .withResType<AnswerVersionWithAnswerDataType>()
                    .query(AnswerVersion, { answerVersionId })
                    .selectFrom(x => x
                        .columns(AnswerVersion, '*')
                        .columns(AnswerData, {
                            isCorrect: 'isCorrect'
                        }))
                    .leftJoin(AnswerData, x => x
                        .on('id', '=', 'answerDataId', AnswerVersion))
                    .where('id', '=', 'answerVersionId')
                    .getSingle();
            }));
    }

    /**
     * It removes one given answer, for one question, in one answer session
     */
    private async deleteGivenAnswersFromAnswerSessionAsync(
        answerSessionId: Id<'AnswerSession'>,
        questionVersionId: Id<'QuestionVersion'>
    ) {

        const givenAnswers = await this._ormService
            .withResType<{
                givenAnswerId: Id<'GivenAnswer'>,
                answerGivenAnswerBridgeId: Id<'AnswerGivenAnswerId'>
            }>()
            .query(GivenAnswer, { questionVersionId, answerSessionId })
            .selectFrom(x => x
                .columns(GivenAnswer, {
                    givenAnswerId: 'id'
                })
                .columns(AnswerGivenAnswerBridge, {
                    answerGivenAnswerBridgeId: 'id'
                }))
            .leftJoin(AnswerGivenAnswerBridge, x => x
                .on('givenAnswerId', '=', 'id', GivenAnswer))
            .leftJoin(AnswerVersion, x => x
                .on('id', '=', 'answerVersionId', AnswerGivenAnswerBridge))
            .innerJoin(QuestionVersion, x => x
                .on('id', '=', 'questionVersionId')
                .and('id', '=', 'questionVersionId', AnswerVersion))
            .innerJoin(AnswerSession, x => x
                .on('id', '=', 'answerSessionId')
                .and('id', '=', 'answerSessionId', GivenAnswer))
            .getMany();

        this._loggerService.logScoped('GENERIC', 'Removing given answer: ' + givenAnswers);

        // Removes the AnswerGivenAnswerBridge
        await this._ormService
            .hardDelete(AnswerGivenAnswerBridge, givenAnswers.map(x => x.answerGivenAnswerBridgeId));

        // Removes the GivenAnswer
        return this._ormService
            .hardDelete(GivenAnswer, givenAnswers.map(x => x.givenAnswerId));

    }

    /**
     * Update streaks by multiple conditions
     *
     * * If current answer is not correct OR answered correctly before, do nothing.
     * * If there is a non finalized previous streak AND the current answer is not
     *   fully correct, finalize it.
     * * If there is no previous streak AND the current answer is fully correct,
     *   create a new streak.
     */
    private async handleAnswerStreakAsync(
        userId: Id<'User'>,
        currentAnswerIsFullyCorrect: boolean,
        currentQuestionIsAnsweredCorrectlyBefore: boolean
    ) {

        if (!currentAnswerIsFullyCorrect || currentQuestionIsAnsweredCorrectlyBefore) {
            return null;
        }

        const previousStreak = await this._ormService
            .query(GivenAnswerStreak, { userId, isFinalized: false })
            .where('userId', '=', 'userId')
            .and('isFinalized', '=', 'isFinalized')
            .getOneOrNull();

        if (!previousStreak && currentAnswerIsFullyCorrect) {

            const newStreak = await this._ormService
                .createAsync(
                    GivenAnswerStreak,
                    {
                        userId: userId,
                        isFinalized: false
                    });

            return newStreak;
        }

        if (previousStreak && !currentAnswerIsFullyCorrect) {

            await this._ormService
                .save(GivenAnswerStreak, {
                    id: previousStreak.id,
                    isFinalized: true
                });

            return previousStreak.id;
        }

        return null;

    }

    /**
     * Gets all the correct answerVersionIds-s of a question
     * @param questionVersionId
     * @private
     */
    private async getCorrectAnswerVersionsAsync(questionVersionId: Id<'QuestionVersion'>) {

        const correctAnswerVersions = await this._ormService
            .query(AnswerVersion, { questionVersionId, isCorrect: true })
            .innerJoin(AnswerData, x => x
                .on('id', '=', 'answerDataId', AnswerVersion)
                .and('isCorrect', '=', 'isCorrect'))
            .where('questionVersionId', '=', 'questionVersionId')
            .getMany();

        return correctAnswerVersions;
    }

    /**
     * Just a simple function to compare givenAnswers with
     * correct answers.
     * @param correctAnswerVersionIds
     * @param givenAnswerVersionIds
     * @private
     */
    private checkIfGivenAnswersCorrect(
        correctAnswerVersionIds: Id<'AnswerVersion'>[],
        givenAnswerVersionIds: Id<'AnswerVersion'>[]
    ) {

        return correctAnswerVersionIds.length === givenAnswerVersionIds.length
            && correctAnswerVersionIds
                .every((ans) => correctAnswerVersionIds
                    .includes(ans));
    }

    /**
     * Checks by questionVersionId if the user has answered
     * the question corretly in the past.
     */
    private async getIsCorrectlyAnsweredBeforeAsync(
        questionVersionId: Id<'QuestionVersion'>,
        userId: Id<'User'>
    ) {

        // TODO: THIS COULD BE WRONG BECAUSE THE IS CORRECT FLAG IN GIVEN ANSWER
        //       IS NOT ALWAYS WORKS LIKE IT SHOULD
        const correctAnswersOnQuestion = await this._ormService
            .query(GivenAnswer, { questionVersionId, userId, isCorrect: true })
            .innerJoin(AnswerSession, x => x
                .on('userId', '=', 'userId'))
            .where('isCorrect', '=', 'isCorrect')
            .and('id', '=', 'questionVersionId')
            .getMany();

        return correctAnswersOnQuestion.length > 0;
    }

    /**
     * Checks by questionVersionId if the user has answered
     * the question in the past IN THE SAME ANSWER SESSION.
     */
    private async getIsAnsweredBeforeInTheAnswerSession(
        questionVersionId: Id<'QuestionVersion'>,
        answerSessionId: Id<'AnswerSession'>,
        userId: Id<'User'>
    ) {

        // TODO: THIS COULD BE WRONG BECAUSE THE IS CORRECT FLAG IN GIVEN ANSWER
        //       IS NOT ALWAYS WORKS LIKE IT SHOULD
        const givenAnswers = await this._ormService
            .query(GivenAnswer, { questionVersionId, userId, answerSessionId })
            .innerJoin(AnswerSession, x => x
                .on('userId', '=', 'userId')
                .and('id', '=', 'answerSessionId')
                .and('id', '=', 'answerSessionId', GivenAnswer))
            .where('questionVersionId', '=', 'questionVersionId')
            .getMany();

        return givenAnswers.length > 0;
    }

    /**
     * Gets the length of a givenAnswerStreak
     * @param givenAnswerStreakId
     * @private
     */
    private async getStreakLengthAsync(givenAnswerStreakId: Id<'GivenAnswerStreak'> | null) {

        const streaks = await this._ormService
            .query(GivenAnswer, { givenAnswerStreakId })
            .leftJoin(GivenAnswerStreak, x => x
                .on('id', '=', 'givenAnswerStreakId', GivenAnswer))
            .where('id', '=', 'givenAnswerStreakId')
            .getMany();

        return streaks.length;
    }
}
