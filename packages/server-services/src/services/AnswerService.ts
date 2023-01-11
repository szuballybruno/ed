import { Answer } from '../models/tables/Answer';
import { AnswerData } from '../models/tables/AnswerData';
import { AnswerVersion } from '../models/tables/AnswerVersion';
import { AnswerEditDTO } from '@episto/communication';
import { Mutation } from '@episto/communication';
import { VersionMigrationContainer } from '../utilities/misc';
import { LoggerService } from './LoggerService';
import { XMutatorHelpers } from './misc/XMutatorHelpers';
import { VersionSaveService } from './VersionSaveService';

export type AnswerMutationsType = Mutation<AnswerEditDTO, 'answerVersionId'>[];
export type AnswerVersionWithAnswerDataType = AnswerVersion & AnswerData;

export class AnswerService {

    constructor(
        private _versionSaveService: VersionSaveService,
        private _loggerService: LoggerService) {
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
                getNewVersion: ({entityId, newDataId, newParentVersionId}) => ({
                    answerDataId: newDataId,
                    answerId: entityId,
                    questionVersionId: newParentVersionId
                }),
                overrideDataProps: (data, mutation) => {

                    const {isCorrect, text} = XMutatorHelpers
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
}
