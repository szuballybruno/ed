import { Exam } from '../models/entity/exam/Exam';
import { ExamData } from '../models/entity/exam/ExamData';
import { ExamVersion } from '../models/entity/exam/ExamVersion';
import { Video } from '../models/entity/video/Video';
import { VideoData } from '../models/entity/video/VideoData';
import { VideoVersion } from '../models/entity/video/VideoVersion';
import { CourseItemEditView } from '../models/views/CourseItemEditView';
import { CourseItemView } from '../models/views/CourseItemView';
import { CourseContentAdminDTO } from '../shared/dtos/admin/CourseContentAdminDTO';
import { CourseContentItemAdminDTO } from '../shared/dtos/admin/CourseContentItemAdminDTO';
import { CourseItemEditDTO } from '../shared/dtos/CourseItemEditDTO';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { CourseItemSimpleType } from '../shared/types/sharedTypes';
import { VersionCode } from '../shared/types/versionCode';
import { AnswerVersionsSeedDataType } from '../sql/seed/seed_answer_versions';
import { InsertEntity, VersionMigrationHelpers, VersionMigrationResult } from '../utilities/misc';
import { MapperService } from './MapperService';
import { ClassType } from './misc/advancedTypes/ClassType';
import { OldData } from './misc/types';
import { XMutatorHelpers } from './misc/XMutatorHelpers_a';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { QuestionService } from './QuestionService';
import { VersionSaveService } from './VersionSaveService';
import { EntityType } from './XORM/XORMTypes';

type ItemMutationType = Mutation<CourseContentItemAdminDTO, 'versionCode'>;
type ItemVersionEntityType = EntityType & { moduleVersionId: number };

type GetVersionDataPairsFnType<TVerion, TData, TEntity> = {
    getOldData: (mutation: ItemMutationType) => OldData<TVerion, TData, TEntity>,
    oldVersionIds: number[]
}

export class CourseItemService {

    constructor(
        private _ormService: ORMConnectionService,
        private _mapperService: MapperService,
        private _questionsService: QuestionService,
        private _versionSaveService: VersionSaveService) {
    }

    /**
     * Returns the edit data for a course item (video / exam),
     * contains questions, answers as well,
     * this is not meat to be used to edit the title,
     * subtitle etc fields of the item,
     * just the questions & answers  
     */
    async getCourseItemEditDataAsync(videoVersionId: number | null, examVersionId: number | null) {

        const views = await this._ormService
            .query(CourseItemEditView, { videoVersionId, examVersionId })
            .where('examVersionId', '=', 'examVersionId')
            .and('videoVersionId', '=', 'videoVersionId')
            .getMany();

        return this._mapperService
            .mapTo(CourseItemEditDTO, [views]);
    }

    /**
     * Increments all non-modified course item's version, 
     * but keeps old [xyx]Data reference, since data is not changed.
     * This is an optimalization, there's no unneccesary redundant data in the DB this way.
     * This has hierarchical side effects, it increments every dependant entities's version as well.
     */
    async incrementUnmodifiedCourseItemVersions(
        moduleMigrations: VersionMigrationResult[],
        mutations: ItemMutationType[]) {

        const oldModuleVersionIds = moduleMigrations
            .map(x => x.oldVersionId);

        const courseItemViews = await this._ormService
            .query(CourseItemView, { oldModuleVersionIds })
            .where('moduleVersionId', '=', 'oldModuleVersionIds')
            .getMany();

        const unmodifiedCourseItems = courseItemViews
            .filter(courseItem => !XMutatorHelpers
                .hasMutationForKey(mutations)(courseItem.versionCode));

        //
        // VIDEOS 
        const videoVersionIds = unmodifiedCourseItems
            .map(x => x.videoVersionId!)
            .filter(x => !!x);

        const videoVersionIdMigrations = await this
            ._versionSaveService
            .incrementVersionsAsync(VideoVersion, videoVersionIds, moduleMigrations, x => x.moduleVersionId, (ver, id) => ver.moduleVersionId = id);

        this._saveQuestionsAsync([], videoVersionIdMigrations, true);

        //
        // EXAMS 
        const examItemIds = unmodifiedCourseItems
            .map(x => x.examVersionId!)
            .filter(x => !!x);

        const examVersionIdMigrations = await this
            ._versionSaveService
            .incrementVersionsAsync(ExamVersion, examItemIds, moduleMigrations, x => x.moduleVersionId, (ver, id) => ver.moduleVersionId = id);

        this._saveQuestionsAsync([], examVersionIdMigrations, false);
    }

    /**
     * Inserts new course items
     * attached to a CourseVersion
     */
    async saveMutatedItemsAsync(
        moduleMigrations: VersionMigrationResult[],
        mutations: ItemMutationType[]) {

        const filterMutations = (
            versionType: CourseItemSimpleType) => {

            return mutations
                .filter(x => x.action !== 'delete' && VersionCode.read(x.key).versionType === versionType);
        };

        //
        // SAVE VIDEOS 
        const videoMutations = filterMutations('video');

        const videoVersionMigraionResult = await this
            ._versionSaveService
            .saveItemsAsync(CourseContentItemAdminDTO)({
                version: VideoVersion,
                data: VideoData,
                entity: Video,
                mutationDTOParentVersionField: 'moduleVersionId',
                getDataId: x => x.videoDataId,
                getEntityId: x => x.videoId,
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
                getParentVersionId: version => version.moduleVersionId,
                muts: videoMutations,
                parentVersionIdMigrations: moduleMigrations
            });

        // SAVE EXAMS 
        const examMutations = filterMutations('exam');

        const examVersionMigarationResults = await this
            ._versionSaveService
            .saveItemsAsync(CourseContentItemAdminDTO)({
                version: ExamVersion,
                data: ExamData,
                entity: Exam,
                mutationDTOParentVersionField: 'moduleVersionId',
                getDataId: x => x.examDataId,
                getEntityId: x => x.examId,
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
                getParentVersionId: x => x.moduleVersionId,
                muts: examMutations,
                parentVersionIdMigrations: moduleMigrations
            });
    }

    /**
     * Save questions 
     */
    private async _saveQuestionsAsync(mutationOrdered: ItemMutationType[], itemVersionIdMigrations: VersionMigrationResult[], isVideo: boolean) {

        const questionMutations = mutationOrdered
            .flatMap(x => XMutatorHelpers.getFieldValue(x)('questionMutations')!)
            .filter(x => !!x);

        const answerMutations = mutationOrdered
            .flatMap(x => XMutatorHelpers.getFieldValue(x)('answerMutations')!)
            .filter(x => !!x);

        await this._questionsService
            .saveCourseItemQuestionsAsync(itemVersionIdMigrations, questionMutations, answerMutations, isVideo);
    }

    /**
     * Get item old data 
     */
    private async _getItemOldData<TVersion extends EntityType, TData extends EntityType, TEntity extends EntityType>(
        version: ClassType<TVersion>,
        data: ClassType<TData>,
        entity: ClassType<TEntity>,
        getDataId: (version: TVersion) => number,
        getEntityId: (version: TVersion) => number,
        mutations: ItemMutationType[]): Promise<GetVersionDataPairsFnType<TVersion, TData, TEntity>> {

        const updateMutations = mutations
            .filter(x => x.action === 'update');

        if (updateMutations.length === 0)
            return {
                getOldData: () => { throw new Error('Version data pairs have no elements!') },
                oldVersionIds: []
            };

        const oldVersionIds = updateMutations
            .map(x => VersionCode.read(x.key).versionId);

        const oldVersions = await this._ormService
            .query(version, { oldVersionIds })
            .where('id', '=', 'oldVersionIds')
            .getMany();

        const oldDatas = await this._ormService
            .query(data, { ids: oldVersions.map(getDataId) })
            .where('id', '=', 'ids')
            .getMany();

        const oldVideos = await this._ormService
            .query(entity, { ids: oldVersions.map(getEntityId) })
            .where('id', '=', 'ids')
            .getMany();

        const oldData = oldVersions
            .map((x, i) => ({
                oldVersion: x,
                oldData: oldDatas[i],
                oldEntity: oldVideos[i]
            } as OldData<TVersion, TData, TEntity>))

        const getOldData = (mutation: ItemMutationType) => oldData
            .single(x => x.oldVersion.id === VersionCode.read(mutation.key).versionId);

        return { getOldData, oldVersionIds };
    }
}