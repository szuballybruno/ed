import { Exam } from '../models/entity/exam/Exam';
import { ExamData } from '../models/entity/exam/ExamData';
import { ExamVersion } from '../models/entity/exam/ExamVersion';
import { Video } from '../models/entity/video/Video';
import { VideoData } from '../models/entity/video/VideoData';
import { VideoVersion } from '../models/entity/video/VideoVersion';
import { CourseItemEditView } from '../models/views/CourseItemEditView';
import { CourseContentItemAdminDTO } from '../shared/dtos/admin/CourseContentItemAdminDTO';
import { CourseItemEditDTO } from '../shared/dtos/CourseItemEditDTO';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { VersionCode } from '../shared/types/versionCode';
import { Id } from '../shared/types/versionId';
import { VersionMigrationResult } from '../utilities/misc';
import { MapperService } from './MapperService';
import { XMutatorHelpers } from './misc/XMutatorHelpers_a';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { QuestionAnswerService } from './QuestionAnswerService';
import { QuestionService } from './QuestionService';
import { VersionSaveService } from './VersionSaveService';

type ItemMutationType = Mutation<CourseContentItemAdminDTO, 'versionCode'>;

export class CourseItemService {

    constructor(
        private _ormService: ORMConnectionService,
        private _mapperService: MapperService,
        private _questionsService: QuestionService,
        private _versionSaveService: VersionSaveService,
        private _answerService: QuestionAnswerService) {
    }

    /**
     * Returns the edit data for a course item (video / exam),
     * contains questions, answers as well,
     * this is not meat to be used to edit the title,
     * subtitle etc fields of the item,
     * just the questions & answers  
     */
    async getCourseItemEditDataAsync(videoVersionId: Id<VideoVersion> | null, examVersionId: Id<ExamVersion> | null) {

        const views = await this._ormService
            .query(CourseItemEditView, { videoVersionId, examVersionId })
            .where('examVersionId', '=', 'examVersionId')
            .and('videoVersionId', '=', 'videoVersionId')
            .getMany();

        return this._mapperService
            .mapTo(CourseItemEditDTO, [views]);
    }

    /**
     * Save
     */
    async saveAsync(
        moduleMigrations: VersionMigrationResult[],
        videoMutations: ItemMutationType[],
        examMutations: ItemMutationType[]) {

        await this._saveVideosAsync(moduleMigrations, videoMutations);
        await this._saveExamsAsync(moduleMigrations, examMutations);
    }

    /**
     * Inserts new course items
     * attached to a CourseVersion
     */
    private async _saveExamsAsync(
        moduleMigrations: VersionMigrationResult[],
        examMutations: ItemMutationType[]) {

        // SAVE EXAMS
        const examVersionIdMigrations = await this
            ._versionSaveService
            .saveAsync({
                dtoSignature: CourseContentItemAdminDTO,
                versionSignature: ExamVersion,
                dataSignature: ExamData,
                entitySignature: Exam,
                parentVersionIdField: 'moduleVersionId',
                getParentOldVersionId: x => x.moduleVersionId,
                getDataId: x => x.examDataId,
                getEntityId: x => x.examId,
                getVersionId: x => VersionCode.read(x.key).versionId,
                getDefaultData: mutation => ({
                    description: '',
                    isFinal: false,
                    orderIndex: XMutatorHelpers.getFieldValueOrFail(mutation)('itemOrderIndex'),
                    retakeLimit: 3,
                    subtitle: '',
                    thumbnailUrl: null,
                    acceptanceThreshold: null,
                    title: ''
                }),
                overrideDataProps: (data, mutation) => {

                    const { itemOrderIndex, itemTitle, itemSubtitle } = XMutatorHelpers
                        .mapMutationToPartialObject(mutation);

                    if (itemOrderIndex)
                        data.orderIndex = itemOrderIndex;

                    if (itemSubtitle)
                        data.subtitle = itemSubtitle;

                    if (itemTitle)
                        data.title = itemTitle;

                    return data;
                },
                getNewEntity: () => ({
                    isPretest: false,
                    isSignup: false
                }),
                getNewVersion: ({ entityId, newDataId, newParentVersionId }) => ({
                    moduleVersionId: newParentVersionId,
                    examDataId: newDataId,
                    examId: entityId
                }),
                muts: examMutations,
                parentVersionIdMigrations: moduleMigrations
            });

        // SAVE QUESTIONS 
        await this._saveQuestionsAsync(examMutations, examVersionIdMigrations, false);
    }

    /**
     * Saves videos 
     */
    private async _saveVideosAsync(
        moduleMigrations: VersionMigrationResult[],
        videoMutations: ItemMutationType[]) {

        // SAVE VIDEOS
        const videoVersionIdMigrations = await this
            ._versionSaveService
            .saveAsync({
                dtoSignature: CourseContentItemAdminDTO,
                versionSignature: VideoVersion,
                dataSignature: VideoData,
                entitySignature: Video,
                parentVersionIdField: 'moduleVersionId',
                getParentOldVersionId: x => x.moduleVersionId,
                getDataId: x => x.videoDataId,
                getEntityId: x => x.videoId,
                getVersionId: x => VersionCode.read(x.key).versionId,
                getDefaultData: mutation => ({
                    title: '',
                    subtitle: '',
                    orderIndex: XMutatorHelpers.getFieldValueOrFail(mutation)('itemOrderIndex'),
                    description: '',
                    thumbnailFileId: null,
                    videoFileId: null
                }),
                overrideDataProps: (data, mutation) => {

                    const { itemOrderIndex, itemTitle, itemSubtitle } = XMutatorHelpers
                        .mapMutationToPartialObject(mutation);

                    if (itemOrderIndex)
                        data.orderIndex = itemOrderIndex;

                    if (itemSubtitle)
                        data.subtitle = itemSubtitle;

                    if (itemTitle)
                        data.title = itemTitle;

                    return data;
                },
                getNewEntity: () => ({}),
                getNewVersion: ({ entityId, newDataId, newParentVersionId }) => ({
                    moduleVersionId: newParentVersionId,
                    videoDataId: newDataId,
                    videoId: entityId
                }),
                muts: videoMutations,
                parentVersionIdMigrations: moduleMigrations
            });

        // SAVE QUESTIONS
        await this._saveQuestionsAsync(videoMutations, videoVersionIdMigrations, true);
    }

    /**
     * Save questions 
     */
    private async _saveQuestionsAsync(
        mutations: ItemMutationType[],
        itemVersionIdMigrations: VersionMigrationResult[],
        isVideo: boolean) {

        // SAVE ANSWERS 
        const questionMutations = mutations
            .flatMap(x => XMutatorHelpers.getFieldValue(x)('questionMutations')!)
            .filter(x => !!x);

        const questionVersionMigrations = await this._questionsService
            .saveQuestionsAsync(itemVersionIdMigrations, questionMutations, isVideo);

        // SAVE ANSWERS 
        const answerMutations = mutations
            .map(x => XMutatorHelpers.getFieldValue(x)('answerMutations')!)
            .filter(x => !!x)
            .flatMap(x => x);

        await this._answerService
            .saveAnswersAsync(answerMutations, questionVersionMigrations)
    }
}