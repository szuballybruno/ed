import moment from 'moment';
import { Course } from '../models/entity/course/Course';
import { CourseData } from '../models/entity/course/CourseData';
import { CourseVersion } from '../models/entity/course/CourseVersion';
import { VideoPlaybackSession } from '../models/entity/playback/VideoPlaybackSession';
import { LatestCourseVersionView } from '../models/views/LatestCourseVersionView';
import { PlaylistModuleDTO } from '../shared/dtos/PlaylistModuleDTO';
import { PlayerDataDTO } from '../shared/dtos/PlayerDataDTO';
import { VideoPlayerDataDTO } from '../shared/dtos/VideoDTO';
import { CourseItemStateType } from '../shared/types/sharedTypes';
import { VerboseError } from '../shared/types/VerboseError';
import { PrincipalId } from '../utilities/ActionParams';
import { instantiate, throwNotImplemented } from '../utilities/helpers';
import { instatiateInsertEntity } from '../utilities/misc';
import { AuthorizationService } from './AuthorizationService';
import { CourseService } from './CourseService';
import { ExamService } from './ExamService';
import { MapperService } from './MapperService';
import { readItemCode } from './misc/encodeService';
import { ServiceBase } from './misc/ServiceBase';
import { ModuleService } from './ModuleService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { PlaybackService } from './PlaybackService';
import { QuestionAnswerService } from './QuestionAnswerService';
import { UserCourseBridgeService } from './UserCourseBridgeService';
import { VideoService } from './VideoService';

export class PlayerService extends ServiceBase {

    private _courseService: CourseService;
    private _examService: ExamService;
    private _moduleService: ModuleService;
    private _userCourseBridgeService: UserCourseBridgeService;
    private _videoService: VideoService;
    private _questionAnswerService: QuestionAnswerService;
    private _playbackService: PlaybackService;

    constructor(
        ormService: ORMConnectionService,
        courseService: CourseService,
        examService: ExamService,
        moduleService: ModuleService,
        userCourseBridge: UserCourseBridgeService,
        videoService: VideoService,
        questionAnswerService: QuestionAnswerService,
        mappserService: MapperService,
        playbackService: PlaybackService,
        private _authorizationService: AuthorizationService) {

        super(mappserService, ormService);

        this._courseService = courseService;
        this._examService = examService;
        this._moduleService = moduleService;
        this._userCourseBridgeService = userCourseBridge;
        this._videoService = videoService;
        this._questionAnswerService = questionAnswerService;
        this._playbackService = playbackService;
    }

    /**
     * Gets the player data 
     */
    getPlayerDataAsync = async (
        principalId: PrincipalId,
        requestedItemCode: string) => {

        const userId = principalId.toSQLValue();

        // validate request
        const { courseVersionId, validItemCode } = await this._validatePlayerDataRequest(principalId, requestedItemCode);

        //
        // GET COURSE ID 
        const courseId = (await this._ormService
            .query(LatestCourseVersionView, { courseVersionId })
            .where('versionId', '=', 'courseVersionId')
            .getSingle())
            .courseId;

        // set current course 
        await this._userCourseBridgeService
            .setCurrentCourse(userId, courseVersionId!, 'watch', validItemCode);

        // course items list
        const modules = await this._courseService
            .getPlaylistModulesAsync(userId, courseVersionId!);

        // get course item dto
        const { itemVersionId, itemType } = readItemCode(validItemCode);

        const videoDTO = itemType === 'video' ? await this
            ._getVideoPlayerDataDTOAsync(userId, itemVersionId) : null;

        const examDTO = itemType === 'exam' ? await this._examService
            .getExamPlayerDTOAsync(userId, itemVersionId) : null;

        const moduleDetailedDTO = itemType === 'module' ? await this._moduleService
            .getModuleDetailedDTOAsync(itemVersionId) : null;

        //
        // SET START DATE 
        // SET WATCH STAGE
        const userCourseBridge = await this._userCourseBridgeService
            .getUserCourseBridgeOrFailAsync(userId, courseVersionId!);

        if (!userCourseBridge.startDate)
            await this._userCourseBridgeService
                .setCourseStartDateAsync(principalId, courseId)

        //
        // get new answer session
        const answerSessionId = itemType === 'module'
            ? null
            : await this._questionAnswerService
                .createAnswerSessionAsync(userId, examDTO?.id, videoDTO?.videoVersionId);

        //
        // get next item 
        const { nextPlaylistItemCode, nextItemState } = this._getNextPlaylistItem(modules, validItemCode);

        return instantiate<PlayerDataDTO>({
            videoPlayerData: videoDTO,
            examPlayerData: examDTO,
            modulePlayerData: moduleDetailedDTO,
            answerSessionId: answerSessionId,
            courseMode: userCourseBridge.courseMode,
            courseId: courseVersionId!,
            currentPlaylistItemCode: requestedItemCode,
            modules: modules,
            nextPlaylistItemCode,
            nextPlaylistItemState: nextItemState
        });
    };

    private async _validatePlayerDataRequest(principalId: PrincipalId, requestedItemCode: string) {

        // get current course id
        const courseVersionId = await this._courseService
            .getCourseVersionIdByItemCodeAsync(requestedItemCode);

        if (!courseVersionId)
            throw new Error('Cannot find courseId');

        // get course 
        const courseVersion = await this._ormService
            .query(CourseVersion, { courseVersionId })
            .leftJoin(Course, x => x
                .on('id', '=', 'courseId', CourseVersion))
            .allowDeleted()
            .where('id', '=', 'courseVersionId')
            .getSingle();

        // authorize 
        /*         await this._authorizationService
                    .checkPermissionAsync(principalId, 'WATCH_COURSE', { courseId: courseVersion.courseId }); */

        if (courseVersion?.course?.deletionDate)
            throw new VerboseError('Course has been deleted!', 'deleted');

        // get valid course item 
        const validItemCode = await this._getValidCourseItemCodeAsync(principalId.toSQLValue(), courseVersionId, requestedItemCode);

        return { validItemCode, courseVersionId }
    }

    //
    // PRIVATE
    //

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
    private async _getValidCourseItemCodeAsync(userId: number, courseId: number, targetItemCode: string) {

        const modules = await this._courseService
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
    };

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
    };

    /**
     * Gets teh video watch dto 
     */
    private async _getVideoPlayerDataDTOAsync(userId: number, videoVersionId: number) {

        const maxWatchedSeconds = await this._playbackService
            .getMaxWatchedSeconds(userId, videoVersionId);

        const videoPlayerData = await this._videoService
            .getVideoPlayerDataAsync(videoVersionId);

        const videoQuestionData = await this._videoService
            ._getQuestionDataByVideoVersionId(videoVersionId);

        const currentDateMinThreshold = moment(new Date()).subtract(5, 'minutes').toDate();

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
    };
}
