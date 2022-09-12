import { Question } from '../models/entity/question/Question';
import { QuestionData } from '../models/entity/question/QuestionData';
import { QuestionVersion } from '../models/entity/question/QuestionVersion';
import { QuestionDataView } from '../models/views/QuestionDataView';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { QuestionDTO } from '../shared/dtos/QuestionDTO';
import { QuestionEditDataDTO } from '../shared/dtos/QuestionEditDataDTO';
import { Id } from '../shared/types/versionId';
import { VersionMigrationContainer } from '../utilities/misc';
import { MapperService } from './MapperService';
import { XMutatorHelpers } from './misc/XMutatorHelpers';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { VersionSaveService } from './VersionSaveService';

type QuestionMutationType = Mutation<QuestionEditDataDTO, 'questionVersionId'>;

export class QuestionService {

    constructor(
        private _ormService: ORMConnectionService,
        private _versionSaveService: VersionSaveService,
        private _mapper: MapperService) {
    }

    /**
     * Saves course item questions based on mutations  
     */
    async saveQuestionsAsync(
        itemVersionIdMigrations: VersionMigrationContainer<'VideoVersion' | 'ExamVersion'>,
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
                getParentOldVersionId: isVideo
                    ? x => x.videoVersionId
                    : x => x.examVersionId,
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
                    examVersionId: isVideo ? null : newParentVersionId as Id<'ExamVersion'>,
                    videoVersionId: !isVideo ? null : newParentVersionId as Id<'VideoVersion'>,
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
                },
                getDataDisplayNameArg: x => x.questionText
            });

        return result;
    }

    /**
     * Returns question data by id 
     */
    async getQuestionDataByVersionId(questionVersionId: Id<'QuestionVersion'>) {

        const question = await this
            ._ormService
            .query(QuestionDataView, { questionVersionId })
            .where('questionVersionId', '=', 'questionVersionId')
            .getMany();

        return this
            ._mapper
            .mapTo(QuestionDTO, [question]);
    }
}