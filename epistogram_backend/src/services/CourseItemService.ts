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
import { CourseItemSimpleType, CourseItemType } from '../shared/types/sharedTypes';
import { InsertEntity, VersionMigrationHelpers, VersionMigrationResult } from '../utilities/misc';
import { MapperService } from './MapperService';
import { readVersionCode } from './misc/encodeService';
import { XMutatorHelpers } from './misc/XMutatorHelpers_a';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

type ItemMutationType = Mutation<CourseContentItemAdminDTO, 'versionCode'>;

export class CourseItemService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;

    constructor(ormService: ORMConnectionService, mapperService: MapperService) {

        this._ormService = ormService;
        this._mapperService = mapperService;
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

        await this._ormService
            .createManyAsync(VideoVersion, newVersions);
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

        await this._ormService
            .createManyAsync(ExamVersion, newVersions);
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
            .map(({ mutation, versionId }) => {

                // get default data
                // in case of update, default data is the previous data
                // in case of insert, default data is just a 
                // js object with proper default values 
                const defaultData = mutation.action === 'update'
                    ? getVersionDataPair(versionId)
                        .data
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
        const videoVersions = mutationVersionIdPairs
            .map(({ mutation, versionId }, i) => {

                const videoDataId = videoDataIds[i];
                const videoId = videoIds[i];
                const oldModuleVersionId = this._getModuleVersionId(mutation, () => getVersionDataPair(versionId).version.moduleVersionId);

                const newModuleVersionId = VersionMigrationHelpers
                    .getNewVersionId(moduleMigrations, oldModuleVersionId);

                const videoVersion: InsertEntity<VideoVersion> = {
                    moduleVersionId: newModuleVersionId,
                    videoDataId: videoDataId,
                    videoId: videoId
                };

                return videoVersion;
            });

        await this._ormService
            .createManyAsync(VideoVersion, videoVersions);
    }

    /**
     * Get old video data 
     */
    private async _getVideoVersionDataPairs(mutations: ItemMutationType[]) {

        //
        // OLD VIDEO VERSION IDS 
        const oldVersionIds = mutations
            .filter(x => x.action === 'update')
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

        const getVersionDataPair = (versionId: number) => oldVersions
            .map((version, i) => ({ version, data: oldDatas[i], video: oldVideos[i] }))
            .single(x => x.version.id === versionId);

        const mutationVersionIdPairs = mutations
            .map(x => ({ mutation: x, versionId: this._getVersionIdFromMutation(x).versionId }));

        return { getVersionDataPair, mutationVersionIdPairs };
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
            .map(({ mutation, versionId }) => {

                // get default data
                // in case of update, default data is the previous data
                // in case of insert, default data is just a 
                // js object with proper default values 
                const defaultData = mutation.action === 'update'
                    ? getVersionDataPair(versionId)
                        .data
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
            .map(({ mutation, versionId }) => {

                // get default data
                const defaultExam = mutation.action === 'update'
                    ? getVersionDataPair(versionId).exam
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
        const examVersions = mutationVersionIdPairs
            .map(({ mutation, versionId }, i) => {

                const examDataId = examDataIds[i];
                const examId = examIds[i];
                const oldModuleVersionId = this._getModuleVersionId(mutation, () => getVersionDataPair(versionId).version.moduleVersionId);

                const newModuleVersionId = VersionMigrationHelpers
                    .getNewVersionId(moduleMigrations, oldModuleVersionId);

                const examVersion: InsertEntity<ExamVersion> = {
                    moduleVersionId: newModuleVersionId,
                    examDataId: examDataId,
                    examId: examId
                };

                return examVersion;
            });

        await this._ormService
            .createManyAsync(ExamVersion, examVersions);
    }

    /**
     * Get old exam data 
     */
    private async _getExamVersionDataPairs(mutations: ItemMutationType[]) {

        //
        // OLD VIDEO VERSION IDS 
        const oldVersionIds = mutations
            .filter(x => x.action === 'update')
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
            .map((version, i) => ({ version, data: oldDatas[i], exam: oldExams[i] }))
            .single(x => x.version.id === versionId);

        const mutationVersionIdPairs = mutations
            .map(x => ({ mutation: x, versionId: this._getVersionIdFromMutation(x).versionId }));

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