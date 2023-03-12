import moment from 'moment';
import { VideoPlaybackSession } from '../models/tables/VideoPlaybackSession';
import { CourseItemView } from '../models/views/CourseItemView';
import { PlaylistView } from '../models/views/PlaylistView';
import { UserPlaylistView } from '../models/views/UserPlaylistView';
import { PlayerDataDTO } from '@episto/communication';
import { PlaylistModuleDTO } from '@episto/communication';
import { VideoPlayerDataDTO } from '@episto/communication';
import { instantiate } from '@episto/commonlogic';
import { CourseItemStateType, CourseModeType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { instatiateInsertEntity } from '../utilities/misc';
import { PrincipalId } from '@episto/x-core';
import { ExamService } from './ExamService';
import { MapperService } from './MapperService';
import { readItemCode } from './misc/encodeService';
import { ModuleService } from './ModuleService';
import { ORMConnectionService } from './ORMConnectionService';
import { PermissionService } from './PermissionService';
import { PlaybackService } from './PlaybackService';
import { PlaylistService } from './PlaylistService';
import { QuestionAnswerService } from './QuestionAnswerService';
import { UserCourseBridgeService } from './UserCourseBridgeService';
import { VideoService } from './VideoService';

export class PlayerService {

    constructor(
        private _ormService: ORMConnectionService,
        private _playlistService: PlaylistService,
        private _examService: ExamService,
        private _moduleService: ModuleService,
        private _videoService: VideoService,
        private _questionAnswerService: QuestionAnswerService,
        private _playbackService: PlaybackService,
        private _userCourseBridgeService: UserCourseBridgeService,
        private _mapperService: MapperService,
        private _permissionService: PermissionService) {
    }

    /**
     * getFirstPlaylistItemCode
     */
    async getFirstPlaylistItemCodeAsync(courseId: Id<'Course'>) {

        const { playlistItemCode: firstItemPlaylistCode } = await this
            ._ormService
            .query(PlaylistView, { courseId, one: 1, zero: 0 })
            .where('courseId', '=', 'courseId')
            .and('moduleOrderIndex', '=', 'one')
            .and('itemOrderIndex', '=', 'zero')
            .getSingle();

        return { firstItemPlaylistCode };
    }

    /**
     * Gets the player data 
     */
    async getPlayerDataAsync(
        principalId: PrincipalId,
        requestedItemCode: string) {

        const userId = principalId.getId();

        // get current course id
        const courseId = await this
            .getCourseIdOrFailAsync(requestedItemCode);

        // get valid course item 
        const validItemCode = await this
            ._getValidCourseItemCodeAsync(userId, courseId, requestedItemCode);

        // set current course 
        await this._userCourseBridgeService
            .setStageAsync(userId, courseId, 'watch', validItemCode);

        // course items list
        const modules = await this
            ._playlistService
            .getPlaylistModulesAsync(userId, courseId);

        // get course item dto
        const { itemId, itemType } = readItemCode(validItemCode);

        const videoPlayerDTO = itemType === 'video' ? await this
            ._getVideoPlayerDataDTOAsync(userId, itemId as Id<'Video'>) : null;

        const examPlayerDTO = itemType === 'exam' ? await this._examService
            .getExamPlayerDTOAsync(userId, itemId as Id<'Exam'>) : null;

        const modulePlayerDTO = itemType === 'module' ? await this._moduleService
            .getModuleDetailedDTOAsync(itemId as Id<'Module'>) : null;

        const userCourseBridge = await this._userCourseBridgeService
            .getUserCourseBridgeOrFailAsync(userId, courseId);
        //
        // get new answer session
        const answerSessionId = itemType === 'module'
            ? null
            : await this._questionAnswerService
                .createAnswerSessionAsync(userId, examPlayerDTO?.examVersionId ?? null, videoPlayerDTO?.videoVersionId ?? null);

        // get previous item, because on mobile it's needed
        // to abort the exam before it's started
        const { previousPlaylistItemCode, previousPlaylistItemState } = this
            ._getPreviousPlaylistItem(modules, validItemCode);

        // get next item 
        const { nextPlaylistItemCode, nextItemState } = this
            ._getNextPlaylistItem(modules, validItemCode);

        /**
         * Get SET_COURSE_MODE permission
         */
        const hasPermission = await this
            ._permissionService
            .getPermissionAsync(userId, 'SET_COURSE_MODE', { courseId });

        return instantiate<PlayerDataDTO>({
            videoPlayerData: videoPlayerDTO,
            examPlayerData: examPlayerDTO,
            modulePlayerData: modulePlayerDTO,
            answerSessionId: answerSessionId,
            courseMode: userCourseBridge.courseMode as CourseModeType,
            courseId: courseId,
            currentPlaylistItemCode: requestedItemCode,
            modules: modules,
            previousPlaylistItemCode,
            previousPlaylistItemState,
            nextPlaylistItemCode,
            nextPlaylistItemState: nextItemState,
            canChangeMode: !!hasPermission
        });
    }

    //
    // PRIVATE
    //

    /**
     * Returns the course id from an item code.
     */
    async getCourseIdOrFailAsync(playlistItemCode: string) {

        const playlistViewByItemCode = await this._ormService
            .query(UserPlaylistView, { playlistItemCode })
            .where('playlistItemCode', '=', 'playlistItemCode')
            .getOneOrNull();

        if (playlistViewByItemCode)
            return playlistViewByItemCode.courseId;

        const playlistViewByModuleCode = await this._ormService
            .query(UserPlaylistView, { moduleCode: playlistItemCode, itemOrderIndex: 0 })
            .where('moduleCode', '=', 'moduleCode')
            .and('itemOrderIndex', '=', 'itemOrderIndex')
            .getOneOrNull();

        if (playlistViewByModuleCode)
            return playlistViewByModuleCode.courseId;

        throw new Error(`Playlist code (${playlistItemCode}) is corrupt: not found in playlist view!`);
    }

    /**
    * Gets the previous item in modules list 
    */
    private _getPreviousPlaylistItem(modules: PlaylistModuleDTO[], validItemCode: string) {

        const flat = this
            ._getPlaylistItemsFlatList(modules);

        const currentItemIndexInFlatList = flat
            .findIndex(x => x.playlistItemCode === validItemCode);

        const previousItem = flat[currentItemIndexInFlatList + -1];
        const previousPlaylistItemCode = previousItem?.playlistItemCode ?? null;
        const previousPlaylistItemState = previousItem?.playlistItemState ?? null;

        return {
            previousPlaylistItemCode,
            previousPlaylistItemState
        };
    }

    /**
     * Gets the next item in modules list 
     */
    private _getNextPlaylistItem(modules: PlaylistModuleDTO[], validItemCode: string) {

        const flat = this._getPlaylistItemsFlatList(modules);

        const currentItemIndexInFlatList = flat
            .findIndex(x => x.playlistItemCode === validItemCode);

        const nextItem = flat[currentItemIndexInFlatList + 1];
        const nextPlaylistItemCode = nextItem?.playlistItemCode ?? null;
        const nextItemState = nextItem?.playlistItemState ?? null;

        return {
            nextPlaylistItemCode,
            nextItemState
        };
    }

    /**
     * Finds the closest valid course item code to the target. 
     * This is to ensure a user is not recieving an item they should not access.
     */
    private async _getValidCourseItemCodeAsync(userId: Id<'User'>, courseId: Id<'Course'>, targetItemCode: string) {

        const modules = await this
            ._playlistService
            .getPlaylistModulesAsync(userId, courseId);

        const courseItemsFlat = this._getPlaylistItemsFlatList(modules);

        const targetItem = courseItemsFlat
            .firstOrNull(x => x.playlistItemCode === targetItemCode);

        if (targetItem && targetItem.playlistItemState !== 'locked')
            return targetItem.playlistItemCode;

        // target item is locked, fallback...
        const firstLockedIndex = courseItemsFlat
            .findIndex(x => x.playlistItemState === 'locked');

        const prevIndex = firstLockedIndex - 1;
        const prevItem = courseItemsFlat
            .byIndexOrNull(prevIndex);

        if (prevItem)
            return prevItem.playlistItemCode;

        return courseItemsFlat
            .first()
            .playlistItemCode;
    }

    /**
     * Returns a list of objects symbolizing the items present in the specified course. 
     * The list is ordered, and can be traversed by list item indicies.
     */
    private _getPlaylistItemsFlatList(modules: PlaylistModuleDTO[]) {

        type CourseItemFlatListType = {
            playlistItemCode: string,
            playlistItemState: CourseItemStateType,
            orderIndex: number,
        };

        const courseItemFlatList = [] as CourseItemFlatListType[];

        modules
            .forEach(module => {

                courseItemFlatList
                    .push({
                        playlistItemCode: module.moduleCode,
                        orderIndex: module.moduleOrderIndex,
                        playlistItemState: module.moduleState
                    });

                module
                    .items
                    .forEach(moduleItem => courseItemFlatList
                        .push({
                            playlistItemCode: moduleItem.playlistItemCode,
                            orderIndex: moduleItem.orderIndex,
                            playlistItemState: moduleItem.state
                        }));
            });

        return courseItemFlatList;
    }

    /**
     * Gets teh video watch dto 
     */
    private async _getVideoPlayerDataDTOAsync(userId: Id<'User'>, videoId: Id<'Video'>) {

        // get latest video version id
        const videoVersionId = (await this._ormService
            .query(CourseItemView, { videoId })
            .where('videoId', '=', 'videoId')
            .getSingle())
            .videoVersionId!;

        const maxWatchedSeconds = await this._playbackService
            .getMaxWatchedSeconds(userId, videoVersionId);

        const videoPlayerData = await this._videoService
            .getVideoPlayerDataAsync(videoVersionId);

        const videoQuestionData = await this._videoService
            ._getQuestionDataByVideoVersionId(videoVersionId);

        const currentDateMinThreshold = moment(new Date())
            .subtract(5, 'minutes')
            .toDate();

        const oldSessions = await this._ormService
            .query(VideoPlaybackSession, { userId, videoVersionId, currentDateMinThreshold })
            .where('userId', '=', 'userId')
            .and('videoVersionId', '=', 'videoVersionId')
            .and('lastUsageDate', '>', 'currentDateMinThreshold')
            .getMany();

        const oldSession = oldSessions
            .orderBy(x => x.lastUsageDate)
            .firstOrNull();

        const { id: videoPlaybackSessionId } = oldSession
            ? oldSession
            : await this._ormService
                .createAsync(VideoPlaybackSession, instatiateInsertEntity<VideoPlaybackSession>({
                    creationDate: new Date(),
                    lastUsageDate: new Date(),
                    userId,
                    videoVersionId
                }));

        const dto = this._mapperService
            .mapTo(VideoPlayerDataDTO, [videoPlayerData, videoQuestionData, videoPlaybackSessionId, maxWatchedSeconds]);

        return dto;
    }
}
