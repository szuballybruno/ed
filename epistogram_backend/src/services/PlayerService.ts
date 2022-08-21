import moment from 'moment';
import { VideoPlaybackSession } from '../models/entity/playback/VideoPlaybackSession';
import { CourseItemView } from '../models/views/CourseItemView';
import { PlayerDataDTO } from '../shared/dtos/PlayerDataDTO';
import { PlaylistModuleDTO } from '../shared/dtos/PlaylistModuleDTO';
import { VideoPlayerDataDTO } from '../shared/dtos/VideoDTO';
import { instantiate } from '../shared/logic/sharedLogic';
import { CourseItemStateType } from '../shared/types/sharedTypes';
import { Id } from '../shared/types/versionId';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { instatiateInsertEntity } from '../utilities/misc';
import { CourseService } from './CourseService';
import { ExamService } from './ExamService';
import { MapperService } from './MapperService';
import { readItemCode } from './misc/encodeService';
import { ModuleService } from './ModuleService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { PlaybackService } from './PlaybackService';
import { PlaylistService } from './PlaylistService';
import { QuestionAnswerService } from './QuestionAnswerService';
import { UserCourseBridgeService } from './UserCourseBridgeService';
import { VideoService } from './VideoService';
import { AuthorizationService } from './AuthorizationService';
import { ControllerActionReturnType } from '../utilities/XTurboExpress/XTurboExpressTypes';
import { PretestCompletionView } from '../models/views/PretestCompletionView';
import { ErrorWithCode } from '../shared/types/ErrorWithCode';
import { PermissionService } from './PermissionService';

export class PlayerService {

    constructor(
        private _ormService: ORMConnectionService,
        private _courseService: CourseService,
        private _playlistService: PlaylistService,
        private _examService: ExamService,
        private _moduleService: ModuleService,
        private _videoService: VideoService,
        private _questionAnswerService: QuestionAnswerService,
        private _playbackService: PlaybackService,
        private _userCourseBridgeService: UserCourseBridgeService,
        private _mapperService: MapperService,
        private _authorizationService: AuthorizationService,
        private _permissionService: PermissionService) {
    }

    /**
     * Gets the player data 
     */
    getPlayerDataAsync(
        principalId: PrincipalId,
        requestedItemCode: string) {

        return {
            action: async () => {

                const userId = principalId.getId();

                // validate request
                const { courseId, validItemCode } = await this
                    ._validatePlayerDataRequest(principalId, requestedItemCode);

                // set current course 
                await this._userCourseBridgeService
                    .setCurrentCourse(userId, courseId, 'watch', validItemCode);

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

                //
                // get next item 
                const { nextPlaylistItemCode, nextItemState } = this._getNextPlaylistItem(modules, validItemCode);

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
                    courseMode: userCourseBridge.courseMode,
                    courseId: courseId,
                    currentPlaylistItemCode: requestedItemCode,
                    modules: modules,
                    nextPlaylistItemCode,
                    nextPlaylistItemState: nextItemState,
                    canChangeMode: !!hasPermission
                });
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'ACCESS_APPLICATION');
            }
        };
    }

    //
    // PRIVATE
    //

    /**
     * Validates request 
     */
    private async _validatePlayerDataRequest(principalId: PrincipalId, requestedPlaylistItemCode: string) {

        const userId = principalId
            .getId();

        // get current course id
        const courseId = await this._courseService
            .getCourseIdOrFailAsync(requestedPlaylistItemCode);

        // get valid course item 
        const validItemCode = await this
            ._getValidCourseItemCodeAsync(userId, courseId, requestedPlaylistItemCode);

        // check pretest 
        const pcv = await this
            ._ormService
            .query(PretestCompletionView, { userId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getSingle();

        if (!pcv.isCompleted)
            throw new ErrorWithCode('Tring to watch course, but "pretest" is not completed yet!', 'forbidden player stage');

        return { validItemCode, courseId };
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

        return (courseItemsFlat[prevIndex]
            ? courseItemsFlat[prevIndex]
            : courseItemsFlat[0]).playlistItemCode;
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

        const videoPlaybackSessionId = oldSession
            ? oldSession.id
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
