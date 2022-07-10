import { Answer } from '../models/entity/answer/Answer';
import { AnswerData } from '../models/entity/answer/AnswerData';
import { AnswerVersion } from '../models/entity/answer/AnswerVersion';
import { AnswerSession } from '../models/entity/AnswerSession';
import { ExamVersion } from '../models/entity/exam/ExamVersion';
import { QuestionVersion } from '../models/entity/question/QuestionVersion';
import { User } from '../models/entity/User';
import { VideoVersion } from '../models/entity/video/VideoVersion';
import { AnswerEditDTO } from '../shared/dtos/AnswerEditDTO';
import { AnswerResultDTO } from '../shared/dtos/AnswerResultDTO';
import { CoinAcquireResultDTO } from '../shared/dtos/CoinAcquireResultDTO';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { Id } from '../shared/types/versionId';
import { InsertEntity, VersionMigrationHelpers, VersionMigrationResult } from '../utilities/misc';
import { CoinAcquireService } from './CoinAcquireService';
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
        private _versionSaveService: VersionSaveService) {
    }

    /**
     * Creates a new answer session  
     */
    async createAnswerSessionAsync(
        userId: Id<User>,
        examVersionId: Id<ExamVersion> | null,
        videoVideoId: Id<VideoVersion> | null) {

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
        userId: Id<User>,
        answerSessionId: Id<AnswerSession>,
        questionVersionId: Id<QuestionVersion>,
        answerIds: Id<Answer>[],
        isExamQuestion: boolean,
        elapsedSeconds: number,
        isPractiseAnswer?: boolean) {

        console.log('userId: ' + userId)
        console.log('answerSessionId: ' + answerSessionId)
        console.log('questionVersionId: ' + questionVersionId)
        console.log('answerIds: ' + answerIds)
        console.log('isExamQuestion: ' + isExamQuestion)
        console.log('elapsedSeconds: ' + elapsedSeconds)
        console.log('isPractiseAnswer: ' + isPractiseAnswer)

        const {
            correctAnswerIds,
            givenAnswerId,
            isCorrect,
            streakLength,
            streakId
        } = await this._sqlFunctionsService
            .answerQuestionFn(userId, answerSessionId, questionVersionId, answerIds, elapsedSeconds, !!isPractiseAnswer);

        console.log('correctAnswerIds: ' + correctAnswerIds)
        console.log('givenAnswerId: ' + givenAnswerId)
        console.log('isCorrect: ' + isCorrect)
        console.log('streakLength: ' + streakLength)
        console.log('streakId: ' + streakId)

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
    async saveAnswersAsync(
        mutations: AnswerMutationsType,
        questionVersionIdMigrations: VersionMigrationResult[]) {

        return await this._versionSaveService
            .saveAsync({
                dtoSignature: AnswerEditDTO,
                versionSignature: AnswerVersion,
                dataSignature: AnswerData,
                entitySignature: Answer,
                parentVersionIdField: 'questionVersionId',
                parentVersionIdFieldInDTO: 'questionVersionId',
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