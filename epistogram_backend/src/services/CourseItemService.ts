import { Exam } from '../models/entity/exam/Exam';
import { ExamData } from '../models/entity/exam/ExamData';
import { ExamVersion } from '../models/entity/exam/ExamVersion';
import { Video } from '../models/entity/video/Video';
import { VideoData } from '../models/entity/video/VideoData';
import { VideoVersion } from '../models/entity/video/VideoVersion';
import { CourseItemEditView } from '../models/views/CourseItemEditView';
import { CourseItemView } from '../models/views/CourseItemView';
import { CourseContentItemAdminDTO } from '../shared/dtos/admin/CourseContentItemAdminDTO';
import { CourseItemEditDTO } from '../shared/dtos/CourseItemEditDTO';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { CourseItemSimpleType } from '../shared/types/sharedTypes';
import { VersionCode } from '../shared/types/versionCode';
import { InsertEntity, VersionMigrationHelpers, VersionMigrationResult } from '../utilities/misc';
import { MapperService } from './MapperService';
import { ClassType } from './misc/advancedTypes/ClassType';
import { OldData } from './misc/types';
import { XMutatorHelpers } from './misc/XMutatorHelpers_a';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { QuestionService } from './QuestionService';
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
        private _questionsService: QuestionService) {
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

        await this
            ._incrementItemVersionsAsync(VideoVersion, videoVersionIds, moduleMigrations, true);

        //
        // EXAMS 
        const examItemIds = unmodifiedCourseItems
            .map(x => x.examVersionId!)
            .filter(x => !!x);

        await this
            ._incrementItemVersionsAsync(ExamVersion, examItemIds, moduleMigrations, false);
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

        await this
            ._saveItemsAsync({
                version: VideoVersion,
                data: VideoData,
                entity: Video,
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
                getNewVersion: ({ entityId, newDataId, newModuleVersionId }) => ({
                    moduleVersionId: newModuleVersionId,
                    videoDataId: newDataId,
                    videoId: entityId
                }),
                muts: videoMutations,
                moduleMigrations,
                isVideo: true
            });

        // SAVE EXAMS 
        const examMutations = filterMutations('exam');

        await this
            ._saveItemsAsync({
                version: ExamVersion,
                data: ExamData,
                entity: Exam,
                getDataId: x => x.examDataId,
                getEntityId: x => x.examId,
                getDefaultData: mutation => ({
                    description: '',
                    isFinal: false,
                    orderIndex: XMutatorHelpers.getFieldValueOrFail(mutation)('itemOrderIndex'),
                    retakeLimit: 3,
                    subtitle: '',
                    thumbnailUrl: null,
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
                getNewVersion: ({ entityId, newDataId, newModuleVersionId }) => ({
                    moduleVersionId: newModuleVersionId,
                    examDataId: newDataId,
                    examId: entityId
                }),
                muts: examMutations,
                moduleMigrations,
                isVideo: false
            });
    }

    /**
     * Incerements video version while keeping old data version
     */
    private async _incrementItemVersionsAsync<TVersion extends ItemVersionEntityType>(
        version: ClassType<TVersion>,
        oldVersionIds: number[],
        moduleMigrations: VersionMigrationResult[],
        isVideo: boolean) {

        const oldVersions = await this._ormService
            .query(version, { oldVersionIds })
            .where('id', '=', 'oldVersionIds')
            .getMany();

        const newVersions = oldVersions
            .map(oldVersion => {

                const newModuleId = VersionMigrationHelpers
                    .getNewVersionId(moduleMigrations, oldVersion.moduleVersionId);

                const newVersion: InsertEntity<TVersion> = {
                    ...oldVersion,
                    moduleVersionId: newModuleId,
                };

                return newVersion;
            });

        const newVersionIds = await this._ormService
            .createManyAsync(version, newVersions);

        // SAVE QUESTIONS 
        await this._saveQuestionsAsync([], newVersionIds, oldVersionIds, isVideo);
    }

    /**
     * Creates new videos from 
     * video ADD mutations  
     */
    private async _saveItemsAsync<TVersion extends ItemVersionEntityType, TData extends EntityType, TEntity extends EntityType>(opts: {
        version: ClassType<TVersion>,
        data: ClassType<TData>,
        entity: ClassType<TEntity>,
        getDataId: (version: TVersion) => number,
        getEntityId: (version: TVersion) => number,
        getDefaultData: (mutation: ItemMutationType) => InsertEntity<TData>,
        overrideDataProps: (data: InsertEntity<TData>, mutation: ItemMutationType) => InsertEntity<TData>,
        getNewEntity: (mutation: ItemMutationType) => InsertEntity<TEntity>,
        getNewVersion: (opts: { newDataId: number, entityId: number, newModuleVersionId: number }) => InsertEntity<TVersion>,
        muts: ItemMutationType[],
        moduleMigrations: VersionMigrationResult[],
        isVideo: boolean
    }) {

        if (opts.muts.length === 0)
            return;

        const {
            version,
            data,
            entity,
            getDataId,
            getEntityId,
            getDefaultData,
            overrideDataProps,
            getNewEntity,
            getNewVersion,
            moduleMigrations,
            muts,
            isVideo
        } = opts;

        // order: add mutations first
        const mutationOrdered = muts
            .orderBy(x => x.action === 'add' ? 1 : 2);

        // get old data
        const { getOldData, oldVersionIds } = await this
            ._getItemOldData(version, data, entity, getDataId, getEntityId, mutationOrdered);

        //
        // CREATE VIDEO DATAS
        const newDatas = mutationOrdered
            .map(mutation => {

                // get default data
                // in case of update, default data is the previous data
                // in case of insert, default data is just a 
                // js object with proper default values 
                const defaultData = mutation.action === 'update'
                    ? getOldData(mutation).oldData
                    : getDefaultData(mutation);

                return overrideDataProps(defaultData, mutation);
            });

        const dataIds = await this._ormService
            .createManyAsync(data, newDatas);

        //
        // CREATE ENTITES (FROM ADD MUTATIONS ONLY)
        const newEntities = mutationOrdered
            .filter(x => x.action === 'add')
            .map(getNewEntity);

        const newEntityIds = await this._ormService
            .createManyAsync(entity, newEntities);

        //
        // CREATE VERSIONS 
        const newVersions = mutationOrdered
            .map((mutation, i) => {

                const newDataId = dataIds[i];

                // if action is add, use new entity ids
                // indexing works, because all new mutations
                // are ordered as first
                const entityId = mutation.action === 'add'
                    ? newEntityIds[i]
                    : getOldData(mutation).oldEntity.id;

                // new entity: mutation has module version id 
                // otherwise use mutation or old data (mutation is priorized)
                const oldModuleVersionId = mutation.action === 'add'
                    ? XMutatorHelpers.getFieldValueOrFail(mutation)('moduleVersionId')
                    : XMutatorHelpers.getFieldValue(mutation)('moduleVersionId') ?? getOldData(mutation).oldVersion.moduleVersionId;

                const newModuleVersionId = VersionMigrationHelpers
                    .getNewVersionId(moduleMigrations, oldModuleVersionId);

                return getNewVersion({
                    entityId,
                    newDataId,
                    newModuleVersionId
                });
            });

        const newVersionIds = await this._ormService
            .createManyAsync(version, newVersions);

        //
        // SAVE QUESTIONS
        await this._saveQuestionsAsync(mutationOrdered, newVersionIds, oldVersionIds, isVideo);
    }

    /**
     * Save questions 
     */
    private async _saveQuestionsAsync(mutationOrdered: ItemMutationType[], newVersionIds: number[], oldVersionIds: number[], isVideo: boolean) {

        const questionMutations = mutationOrdered
            .flatMap(x => XMutatorHelpers.getFieldValue(x)('questionMutations')!)
            .filter(x => !!x);

        const videoVersionIdMigrations = newVersionIds
            .map((newVersionId, i) => ({
                newVersionId: newVersionId,
                oldVersionId: oldVersionIds[i]
            } as VersionMigrationResult))

        await this._questionsService
            .saveCourseItemQuestionsAsync(videoVersionIdMigrations, questionMutations, isVideo);
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