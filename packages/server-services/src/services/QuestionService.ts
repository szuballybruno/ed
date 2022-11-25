import { Question } from '../models/entity/question/Question';
import { QuestionData } from '../models/entity/question/QuestionData';
import { QuestionVersion } from '../models/entity/question/QuestionVersion';
import { QuestionDataView } from '../models/views/QuestionDataView';
import { Mutation } from '@episto/communication';
import { QuestionDTO } from '@episto/communication';
import { QuestionEditDataReadDTO } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { VersionMigrationContainer } from '../utilities/misc';
import { MapperService } from './MapperService';
import { GlobalConfigurationService } from './GlobalConfigurationService';
import { XMutatorHelpers } from './misc/XMutatorHelpers';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { VersionSaveService } from './VersionSaveService';

type QuestionMutationType = Mutation<QuestionEditDataReadDTO, 'questionVersionId'>;

export class QuestionService {

    constructor(
        private _ormService: ORMConnectionService,
        private _versionSaveService: VersionSaveService,
        private _mapper: MapperService,
        private _config: GlobalConfigurationService) {
    }

    /**
     * Saves course item questions based on mutations  
     */
    async saveQuestionsAsync(
        itemVersionIdMigrations: VersionMigrationContainer<'VideoVersion' | 'ExamVersion'>,
        questionMutations: QuestionMutationType[],
        isVideo: boolean) {

        const questionVersionIdMigrations = await this
            ._versionSaveService
            .saveAsync({
                dtoSignature: QuestionEditDataReadDTO,
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
                    maxScore: this._config.questionAnswer.maxQuestionScore,
                    deletionDate: null,
                    imageUrl: null,
                    orderIndex: 0,
                    questionText: '',
                    showUpTimeSeconds: null,
                    typeId: 1,
                    moduleId: null as any
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

                    const { questionShowUpTimeSeconds, questionText, moduleId } = XMutatorHelpers
                        .mapMutationToPartialObject(mut);

                    if (questionShowUpTimeSeconds)
                        data.showUpTimeSeconds = questionShowUpTimeSeconds;

                    if (questionText)
                        data.questionText = questionText;

                    if (moduleId)
                        data.moduleId = moduleId;

                    return data;
                },
                getDataDisplayNameArg: x => x.questionText
            });

        return questionVersionIdMigrations;
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