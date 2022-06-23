import { Video } from '../models/entity/video/Video';
import { VideoData } from '../models/entity/video/VideoData';
import { VideoVersion } from '../models/entity/video/VideoVersion';
import { CourseItemEditView } from '../models/views/CourseItemEditView';
import { CourseItemView } from '../models/views/CourseItemView';
import { CourseContentItemAdminDTO } from '../shared/dtos/admin/CourseContentItemAdminDTO';
import { CourseItemEditDTO } from '../shared/dtos/CourseItemEditDTO';
import { Mutation } from '../shared/dtos/mutations/Mutation';
import { CourseItemType } from '../shared/types/sharedTypes';
import { InsertEntity, VersionMigrationHelpers, VersionMigrationResult } from '../utilities/misc';
import { MapperService } from './MapperService';
import { XMutatorHelpers } from './misc/XMutatorHelpers_a';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

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
     * Inserts new course items
     * attached to a CourseVersion
     */
    async saveNewCourseItemsAsync(
        moduleMigrations: VersionMigrationResult[],
        mutations: Mutation<CourseContentItemAdminDTO, 'versionCode'>[]) {

        const filterMutations = (
            itemType: CourseItemType) => {

            return mutations
                .filter(x => x.action === 'add')
                .filter(x => XMutatorHelpers
                    .anyField(x)('itemType', itemType))
        };

        await this
            ._createNewVideosAsync(filterMutations('video'), moduleMigrations);
    }

    /**
     * Increments all non-modified course item's version, 
     * but keeps old [xyx]Data reference, since data is not changed.
     * This is an optimalization, there's no unneccesary redundant data in the DB this way.
     * This has hierarchical side effects, it increments every dependant entities's version as well.
     */
    async incrementUnmodifiedCourseItemVersions(
        moduleMigrations: VersionMigrationResult[],
        mutations: Mutation<CourseContentItemAdminDTO, 'versionCode'>[]) {

        // const courseItemViews = await this._ormService
        //     .query(CourseItemView)
        //     .
            
    }

    /**
     * Creates new videos from 
     * video ADD mutations  
     */
    private async _createNewVideosAsync(
        videoMutations: Mutation<CourseContentItemAdminDTO, 'versionCode'>[],
        moduleMigrations: VersionMigrationResult[]) {

        //
        // CREATE VIDEO DATAS
        const videoDatas = videoMutations
            .map((x) => {

                const videoData = XMutatorHelpers
                    .mapMutationToPartialObject(x);

                if (videoData.itemOrderIndex === null || videoData.itemOrderIndex === undefined)
                    throw new Error('itemOrderIndex is null or undefiend');

                const newVideoData: InsertEntity<VideoData> = {
                    title: videoData.itemTitle ?? '',
                    subtitle: videoData.itemSubtitle ?? '',
                    orderIndex: videoData.itemOrderIndex,
                    description: '',
                    thumbnailFileId: null,
                    videoFileId: null
                };

                return newVideoData;
            });

        const videoDataIds = await this._ormService
            .createManyAsync(VideoData, videoDatas);

        //
        // CREATE VIDEOS 
        const videos = videoMutations
            .map(x => {

                const video: InsertEntity<Video> = {};
                return video;
            });

        const videoIds = await this._ormService
            .createManyAsync(Video, videos);

        //
        // CREATE VIDEO VERSIONS 
        const videoVersions = videoMutations
            .map((x, i) => {

                const videoDataId = videoDataIds[i];
                const videoId = videoIds[i];
                const oldModuleVersionId = XMutatorHelpers
                    .getFieldValueOrFail(x)('moduleVersionId');

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
}