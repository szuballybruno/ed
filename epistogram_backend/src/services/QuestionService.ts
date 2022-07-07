import { Question } from '../models/entity/question/Question';
import { QuestionData } from '../models/entity/question/QuestionData';
import { QuestionVersion } from '../models/entity/question/QuestionVersion';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { QuestionEditDataDTO } from '../shared/dtos/QuestionEditDataDTO';
import { VersionMigrationResult } from '../utilities/misc';
import { XMutatorHelpers } from './misc/XMutatorHelpers_a';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { VersionSaveService } from './VersionSaveService';

type QuestionMutationType = Mutation<QuestionEditDataDTO, 'questionVersionId'>;

export class QuestionService {

    constructor(
        private _ormService: ORMConnectionService,
        private _versionSaveService: VersionSaveService) {
    }

    /**
     * Saves course item questions based on mutations  
     */
    async saveQuestionsAsync(
        itemVersionIdMigrations: VersionMigrationResult[],
        questionMutations: QuestionMutationType[],
        isVideo: boolean) {

        const result = await this
            ._versionSaveService
            .saveAsync({
                dtoSignature: QuestionEditDataDTO,
                versionSignature: QuestionVersion,
                dataSignature: QuestionData,
                entitySignature: Question,
                parentVersionIdField: isVideo
                    ? 'videoVersionId'
                    : 'examVersionId',
                parentVersionIdFieldInDTO: isVideo
                    ? 'videoVersionId'
                    : 'examVersionId',
                getDataId: x => x.questionDataId,
                getEntityId: x => x.questionId,
                getVersionId: x => x.key,
                getDefaultData: x => ({
                    deletionDate: null,
                    imageUrl: null,
                    orderIndex: 0,
                    questionText: '',
                    showUpTimeSeconds: null,
                    typeId: 1
                }),
                getNewEntity: x => ({}),
                getNewVersion: ({ entityId, newDataId, newParentVersionId }) => ({
                    examVersionId: isVideo ? null : newParentVersionId,
                    videoVersionId: !isVideo ? null : newParentVersionId,
                    personalityTraitCategoryId: null,
                    questionDataId: newDataId,
                    questionId: entityId
                }),
                muts: questionMutations,
                parentVersionIdMigrations: itemVersionIdMigrations,
                overrideDataProps: (data, mut) => {

                    const { questionShowUpTimeSeconds, questionText } = XMutatorHelpers
                        .mapMutationToPartialObject(mut);

                    if (questionShowUpTimeSeconds)
                        data.showUpTimeSeconds = questionShowUpTimeSeconds;

                    if (questionText)
                        data.questionText = questionText;

                    return data;
                }
            });

        return result;
    }
}