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
import { InsertEntity, VersionMigrationHelpers, VersionMigrationResult } from '../utilities/misc';
import { MapperService } from './MapperService';
import { readVersionCode } from './misc/encodeService';
import { XMutatorHelpers } from './misc/XMutatorHelpers_a';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { QuestionService } from './QuestionService';

type ItemMutationType = Mutation<CourseContentItemAdminDTO, 'versionCode'>;

type GetVersionDataPairsFnType<TVerion, TData, TEntity> = {
    getVersionDataPair: (versionId: number) => {
        oldVersion: TVerion;
        oldData: TData;
        oldEntity: TEntity;
    },
    mutationVersionIdPairs: {
        mutation: ItemMutationType;
        oldVersionId: number;
    }[]
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
            .filter(courseItem => mutations
                .none(mut => mut.key === courseItem.versionCode));

        // VIDEOS 
        const videoItems = unmodifiedCourseItems
            .filter(x => !!x.videoVersionId);

        await this._incrementVideoVersionsAsync(videoItems, moduleMigrations);

        // EXAMS 
        const examItems = unmodifiedCourseItems
            .filter(x => !!x.examVersionId);

        await this._incrementExamVersionsAsync(examItems, moduleMigrations);
    }

    /**
     * Inserts new course items
     * attached to a CourseVersion
     */
    async saveNewCourseItemsAsync(
        moduleMigrations: VersionMigrationResult[],
        mutations: ItemMutationType[]) {

        const filterMutations = (
            versionType: CourseItemSimpleType) => {

            return mutations
                .filter(x => x.action !== 'delete' && readVersionCode(x.key).versionType === versionType)
        };

        await this
            ._createNewVideosAsync(filterMutations('video'), moduleMigrations);

        await this
            ._createNewExamsAsync(filterMutations('exam'), moduleMigrations);
    }

    /**
     * Incerements video version while keeping old data version
     */
    private async _incrementVideoVersionsAsync(videoItems: CourseItemView[], moduleMigrations: VersionMigrationResult[]) {

        const oldVersionIds = videoItems
            .map(x => x.videoVersionId!);

        const oldVideoVersions = await this._ormService
            .query(VideoVersion, { oldVersionIds })
            .where('id', '=', 'oldVersionIds')
            .getMany();

        const newVersions = oldVideoVersions
            .map(oldVideoVersion => {

                const newModuleId = VersionMigrationHelpers
                    .getNewVersionId(moduleMigrations, oldVideoVersion.moduleVersionId);

                const videoVerison: InsertEntity<VideoVersion> = {
                    moduleVersionId: newModuleId,
                    videoDataId: oldVideoVersion.videoDataId,
                    videoId: oldVideoVersion.videoId
                };

                return videoVerison;
            });

        const newVersionIds = await this._ormService
            .createManyAsync(VideoVersion, newVersions);

        // SAVE QUESTIONS 
        const versionMigrations = newVersionIds
            .map((newVersionId, i) => ({
                newVersionId: newVersionId,
                oldVersionId: oldVideoVersions[i].id
            } as VersionMigrationResult));

        await this._questionsService
            .saveCourseItemQuestionsAsync(versionMigrations, [], true);
    }

    /**
     * Incerements exam version while keeping old data version
     */
    private async _incrementExamVersionsAsync(examItems: CourseItemView[], moduleMigrations: VersionMigrationResult[]) {

        const oldVersionIds = examItems
            .map(x => x.examVersionId!);

        const oldExamVersions = await this._ormService
            .query(ExamVersion, { oldVersionIds })
            .where('id', '=', 'oldVersionIds')
            .getMany();

        const newVersions = oldExamVersions
            .map(oldExamVersion => {

                const newModuleId = VersionMigrationHelpers
                    .getNewVersionId(moduleMigrations, oldExamVersion.moduleVersionId);

                const examVersion: InsertEntity<ExamVersion> = {
                    moduleVersionId: newModuleId,
                    examDataId: oldExamVersion.examDataId,
                    examId: oldExamVersion.examId
                };

                return examVersion;
            });

        const newVersionIds = await this._ormService
            .createManyAsync(ExamVersion, newVersions);

        // SAVE QUESTIONS 
        const versionMigrations = newVersionIds
            .map((newVersionId, i) => ({
                newVersionId: newVersionId,
                oldVersionId: oldExamVersions[i].id
            } as VersionMigrationResult));

        await this._questionsService
            .saveCourseItemQuestionsAsync(versionMigrations, [], true);
    }

    /**
     * Creates new videos from 
     * video ADD mutations  
     */
    private async _createNewVideosAsync(
        mutations: ItemMutationType[],
        moduleMigrations: VersionMigrationResult[]) {

        // get old data
        const { getVersionDataPair, mutationVersionIdPairs } = await this._getVideoVersionDataPairs(mutations);

        //
        // CREATE VIDEO DATAS
        const videoDatas = mutationVersionIdPairs
            .map(({ mutation, oldVersionId }) => {

                // get default data
                // in case of update, default data is the previous data
                // in case of insert, default data is just a 
                // js object with proper default values 
                const defaultData = mutation.action === 'update'
                    ? getVersionDataPair(oldVersionId)
                        .oldData
                    : {
                        title: '',
                        subtitle: '',
                        orderIndex: XMutatorHelpers.getFieldValueOrFail(mutation)('itemOrderIndex'),
                        description: '',
                        thumbnailFileId: null,
                        videoFileId: null
                    } as VideoData;

                const { itemOrderIndex, itemTitle, itemSubtitle } = XMutatorHelpers
                    .mapMutationToPartialObject(mutation);

                // create new video data 
                // and set props from mutation
                const newVideoData: InsertEntity<VideoData> = defaultData;

                if (itemOrderIndex)
                    newVideoData.orderIndex = itemOrderIndex;

                if (itemSubtitle)
                    newVideoData.subtitle = itemSubtitle;

                if (itemTitle)
                    newVideoData.title = itemTitle;

                return newVideoData;
            });

        const videoDataIds = await this._ormService
            .createManyAsync(VideoData, videoDatas);

        //
        // CREATE VIDEOS 
        const videos = mutationVersionIdPairs
            .map(({ }) => {

                const video: InsertEntity<Video> = {};
                return video;
            });

        const videoIds = await this._ormService
            .createManyAsync(Video, videos);

        //
        // CREATE VIDEO VERSIONS 
        const videoVersionMigrations = mutationVersionIdPairs
            .map(({ mutation, oldVersionId }, i) => {

                const videoDataId = videoDataIds[i];
                const videoId = videoIds[i];
                const oldVersion = getVersionDataPair(oldVersionId).oldVersion;
                const oldModuleVersionId = this._getModuleVersionId(mutation, () => oldVersion.moduleVersionId);

                const newModuleVersionId = VersionMigrationHelpers
                    .getNewVersionId(moduleMigrations, oldModuleVersionId);

                const videoVersion: InsertEntity<VideoVersion> = {
                    moduleVersionId: newModuleVersionId,
                    videoDataId: videoDataId,
                    videoId: videoId
                };

                return { videoVersion: videoVersion, oldVersion };
            });

        const newExamVersionIds = await this._ormService
            .createManyAsync(VideoVersion, videoVersionMigrations.map(x => x.videoVersion));

        //
        // SAVE QUESTIONS
        const questionMutations = mutations
            .filter(x => XMutatorHelpers.hasFieldMutation(x)('questionMutations'))
            .flatMap(x => XMutatorHelpers.getFieldValueOrFail(x)('questionMutations'));

        const oldVersionIds = mutationVersionIdPairs
            .map(x => x.oldVersionId);

        const videoVersionIdMigrations = newExamVersionIds
            .map((newVersionId, i) => ({
                newVersionId: newVersionId,
                oldVersionId: oldVersionIds[i]
            } as VersionMigrationResult))

        await this._questionsService
            .saveCourseItemQuestionsAsync(videoVersionIdMigrations, questionMutations, true);
    }

    /**
     * Creates new exams from 
     * exam ADD mutations  
     */
    private async _createNewExamsAsync(
        mutations: ItemMutationType[],
        moduleMigrations: VersionMigrationResult[]) {

        // get old data
        const { getVersionDataPair, mutationVersionIdPairs } = await this._getExamVersionDataPairs(mutations);

        //
        // CREATE EXAM DATAS
        const examDatas = mutationVersionIdPairs
            .map(({ mutation, oldVersionId }) => {

                // get default data
                // in case of update, default data is the previous data
                // in case of insert, default data is just a 
                // js object with proper default values 
                const defaultData = mutation.action === 'update'
                    ? getVersionDataPair(oldVersionId).oldData
                    : {
                        description: '',
                        isFinal: false,
                        orderIndex: XMutatorHelpers.getFieldValueOrFail(mutation)('itemOrderIndex'),
                        retakeLimit: 3,
                        subtitle: '',
                        thumbnailUrl: null,
                        title: ''
                    } as ExamData;

                // mutaitonObject contains all the mutated properties as keys and  
                const { itemOrderIndex, itemSubtitle, itemTitle } = XMutatorHelpers
                    .mapMutationToPartialObject(mutation);

                // create new video data
                // and apply mutation props to it
                const newExamData: InsertEntity<ExamData> = defaultData;

                if (itemOrderIndex)
                    newExamData.orderIndex = itemOrderIndex;

                if (itemSubtitle)
                    newExamData.subtitle = itemSubtitle;

                if (itemTitle)
                    newExamData.title = itemTitle;

                return newExamData;
            });

        const examDataIds = await this._ormService
            .createManyAsync(ExamData, examDatas);

        //
        // CREATE VIDEOS 
        const exams = mutationVersionIdPairs
            .map(({ mutation, oldVersionId }) => {

                // get default data
                const defaultExam = mutation.action === 'update'
                    ? getVersionDataPair(oldVersionId).oldEntity
                    : {
                        isPretest: false,
                        isSignup: false
                    } as Exam;

                const exam: InsertEntity<Exam> = defaultExam;

                return exam;
            });

        const examIds = await this._ormService
            .createManyAsync(Exam, exams);

        //
        // CREATE EXAM VERSIONS 
        const examVersionMigrations = mutationVersionIdPairs
            .map(({ mutation, oldVersionId }, i) => {

                const examDataId = examDataIds[i];
                const examId = examIds[i];
                const oldModuleVersionId = this._getModuleVersionId(mutation, () => getVersionDataPair(oldVersionId).oldVersion.moduleVersionId);

                const newModuleVersionId = VersionMigrationHelpers
                    .getNewVersionId(moduleMigrations, oldModuleVersionId);

                const newExamVersion: InsertEntity<ExamVersion> = {
                    moduleVersionId: newModuleVersionId,
                    examDataId: examDataId,
                    examId: examId
                };

                return { newExamVersion, oldVersionId };
            });

        const newExamVersionIds = await this._ormService
            .createManyAsync(ExamVersion, examVersionMigrations.map(x => x.newExamVersion));

        //
        // SAVE QUESTIONS
        const questionMutations = mutations
            .filter(x => XMutatorHelpers.hasFieldMutation(x)('questionMutations'))
            .flatMap(x => XMutatorHelpers.getFieldValueOrFail(x)('questionMutations'));

        const oldVersionIds = mutationVersionIdPairs
            .map(x => x.oldVersionId);

        const examVersionIdMigrations = newExamVersionIds
            .map((newExamVersionId, i) => ({
                newVersionId: newExamVersionId,
                oldVersionId: oldVersionIds[i]
            } as VersionMigrationResult))

        await this._questionsService
            .saveCourseItemQuestionsAsync(examVersionIdMigrations, questionMutations, false);
    }

    /**
     * Get old video data 
     */
    private async _getVideoVersionDataPairs(mutations: ItemMutationType[]): Promise<GetVersionDataPairsFnType<VideoVersion, VideoData, Video>> {

        const updateMutations = mutations
            .filter(x => x.action === 'update');

        if (updateMutations.length === 0)
            return {
                getVersionDataPair: () => { throw new Error('Version data pairs have no elements!') },
                mutationVersionIdPairs: []
            };

        const oldVersionIds = updateMutations
            .map(x => readVersionCode(x.key).versionId);

        const oldVersions = await this._ormService
            .query(VideoVersion, { oldVersionIds })
            .where('id', '=', 'oldVersionIds')
            .getMany();

        const oldDatas = await this._ormService
            .query(VideoData, { ids: oldVersions.map(x => x.videoDataId) })
            .where('id', '=', 'ids')
            .getMany();

        const oldVideos = await this._ormService
            .query(Video, { ids: oldVersions.map(x => x.videoId) })
            .where('id', '=', 'ids')
            .getMany();

        const getVersionDataPair = (oldVersionId: number) => oldVersions
            .map((oldVersion, i) => ({ oldVersion, oldData: oldDatas[i], oldEntity: oldVideos[i] }))
            .single(x => x.oldVersion.id === oldVersionId);

        const mutationVersionIdPairs = mutations
            .map(x => ({ mutation: x, oldVersionId: this._getVersionIdFromMutation(x).versionId }));

        return { getVersionDataPair, mutationVersionIdPairs };
    }

    /**
     * Get old exam data 
     */
    private async _getExamVersionDataPairs(mutations: ItemMutationType[]): Promise<GetVersionDataPairsFnType<ExamVersion, ExamData, Exam>> {

        const updateMutations = mutations
            .filter(x => x.action === 'update');

        // mutaitons length is 0
        if (updateMutations.length === 0)
            return {
                getVersionDataPair: (x) => {
                    throw new Error('Version data pairs are empty!');
                },
                mutationVersionIdPairs: []
            };

        const oldVersionIds = updateMutations
            .map(x => readVersionCode(x.key).versionId);

        const oldVersions = await this._ormService
            .query(ExamVersion, { oldVersionIds })
            .where('id', '=', 'oldVersionIds')
            .getMany();

        const oldDatas = await this._ormService
            .query(ExamData, { ids: oldVersions.map(x => x.examDataId) })
            .where('id', '=', 'ids')
            .getMany();

        const oldExams = await this._ormService
            .query(Exam, { ids: oldVersions.map(x => x.examId) })
            .where('id', '=', 'ids')
            .getMany();

        const getVersionDataPair = (versionId: number) => oldVersions
            .map((version, i) => ({ oldVersion: version, oldData: oldDatas[i], oldEntity: oldExams[i] }))
            .single(x => x.oldVersion.id === versionId);

        const mutationVersionIdPairs = mutations
            .map(x => ({ mutation: x, oldVersionId: this._getVersionIdFromMutation(x).versionId }));

        return { getVersionDataPair, mutationVersionIdPairs };
    }

    /**
     * get version id from mutation
     */
    private _getVersionIdFromMutation(mut: ItemMutationType) {

        return readVersionCode(mut.key);
    }

    /**
     * 
     */
    private _getModuleVersionId(mutation: ItemMutationType, getOldModuleVersionId: () => number) {

        if (mutation.action !== 'update')
            return XMutatorHelpers
                .getFieldValueOrFail(mutation)('moduleVersionId');

        const mutatedId = XMutatorHelpers
            .getFieldValue(mutation)('moduleVersionId');

        if (mutatedId)
            return mutatedId;

        return getOldModuleVersionId();
    }
}