import { Answer } from '../models/entity/answer/Answer';
import { AnswerData } from '../models/entity/answer/AnswerData';
import { AnswerVersion } from '../models/entity/answer/AnswerVersion';
import { AnswerSession } from '../models/entity/AnswerSession';
import { AnswerEditDTO } from '../shared/dtos/AnswerEditDTO';
import { AnswerResultDTO } from '../shared/dtos/AnswerResultDTO';
import { CoinAcquireResultDTO } from '../shared/dtos/CoinAcquireResultDTO';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { instantiate } from '../shared/logic/sharedLogic';
import { Id } from '../shared/types/versionId';
import { VersionMigrationResult } from '../utilities/misc';
import { CoinAcquireService } from './CoinAcquireService';
import { LoggerService } from './LoggerService';
import { XMutatorHelpers } from './misc/XMutatorHelpers_a';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { SQLFunctionsService } from './sqlServices/FunctionsService';
import { VersionSaveService } from './VersionSaveService';

export type AnswerMutationsType = Mutation<AnswerEditDTO, 'answerVersionId'>[];

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
    async saveGivenAnswerAsync(
        userId: Id<'User'>,
        answerSessionId: Id<'AnswerSession'>,
        questionVersionId: Id<'QuestionVersion'>,
        answerIds: Id<'Answer'>[],
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

        this._loggerService.logScoped('GIVEN ANSWER', 'userId: ' + userId);
        this._loggerService.logScoped('GIVEN ANSWER', 'answerSessionId: ' + answerSessionId);
        this._loggerService.logScoped('GIVEN ANSWER', 'questionVersionId: ' + questionVersionId);
        this._loggerService.logScoped('GIVEN ANSWER', 'answerIds: ' + answerIds);
        this._loggerService.logScoped('GIVEN ANSWER', 'isExamQuestion: ' + isExamQuestion);
        this._loggerService.logScoped('GIVEN ANSWER', 'elapsedSeconds: ' + elapsedSeconds);
        this._loggerService.logScoped('GIVEN ANSWER', 'isPractiseAnswer: ' + isPractiseAnswer);

        let coinAcquires = {
            normal: null as CoinAcquireResultDTO | null,
            bonus: null as CoinAcquireResultDTO | null
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

        return instantiate<AnswerResultDTO>({
            correctAnswerIds: correctAnswerIds,
            givenAnswerIds: answerIds,
            isCorrect: isCorrect,
            coinAcquires
        });
    }

    /**
     * Saves quesiton answers 
     */
    async saveAnswersAsync(
        mutations: AnswerMutationsType,
        questionVersionIdMigrations: VersionMigrationResult<'QuestionVersion'>[]) {

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
                parentVersionIdMigrations: questionVersionIdMigrations
            });
    }
}