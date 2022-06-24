import moment from 'moment';
import { Course } from '../models/entity/course/Course';
import { CourseData } from '../models/entity/course/CourseData';
import { CourseVersion } from '../models/entity/course/CourseVersion';
import { VideoPlaybackSession } from '../models/entity/playback/VideoPlaybackSession';
import { ModuleDTO } from '../shared/dtos/ModuleDTO';
import { PlayerDataDTO } from '../shared/dtos/PlayerDataDTO';
import { VideoPlayerDataDTO } from '../shared/dtos/VideoDTO';
import { CourseItemStateType } from '../shared/types/sharedTypes';
import { VerboseError } from '../shared/types/VerboseError';
import { PrincipalId } from '../utilities/ActionParams';
import { throwNotImplemented } from '../utilities/helpers';
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

        // set current course 
        await this._userCourseBridgeService
            .setCurrentCourse(userId, courseVersionId!, 'watch', validItemCode);

        // course items list
        const modules = await this._courseService
            .getCourseModulesAsync(userId, courseVersionId!);

        // get course item dto
        const { itemVersionId, itemType } = readItemCode(validItemCode);

        const videoDTO = itemType === 'video' ? await this
            ._getVideoPlayerDataDTOAsync(userId, itemVersionId) : null;

        const examDTO = itemType === 'exam' ? await this._examService
            .getExamPlayerDTOAsync(userId, itemVersionId) : null;

        const moduleDetailedDTO = itemType === 'module' ? await this._moduleService
            .getModuleDetailedDTOAsync(itemVersionId) : null;

        // get user course bridge
        const userCourseBridge = await this._userCourseBridgeService
            .getUserCourseBridgeOrFailAsync(userId, courseVersionId!);

        if (userCourseBridge && userCourseBridge.startDate === null)
            await this._userCourseBridgeService.setCourseStartDateAsync(principalId, courseId)

        // get new answer session
        const answerSessionId = itemType === 'module'
            ? null
            : await this._questionAnswerService
                .createAnswerSessionAsync(userId, examDTO?.id, videoDTO?.videoVersionId);

        // next 
        const { nextItemCode, nextItemState } = this._getNextItem(modules, validItemCode);

        return {
            video: videoDTO,
            exam: examDTO,
            module: moduleDetailedDTO,
            answerSessionId: answerSessionId,
            mode: userCourseBridge.courseMode,
            courseId: courseVersionId!,
            courseItemCode: requestedItemCode,
            modules: modules,
            nextItemCode,
            nextItemState
        } as PlayerDataDTO;
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
    private _getNextItem(modules: ModuleDTO[], validItemCode: string) {

        const flat = this._getCourseItemsFlat(modules);

        const currentItemIndexInFlatList = flat
            .findIndex(x => x.code === validItemCode);

        const nextItem = flat[currentItemIndexInFlatList + 1];
        const nextItemCode = nextItem?.code ?? null;
        const nextItemState = nextItem?.state ?? null;

        return {
            nextItemCode,
            nextItemState
        };
    }

    /**
     * Finds the closest valid course item code to the target. 
     * This is to ensure a user is not recieving an item they should not access.
     */
    private async _getValidCourseItemCodeAsync(userId: number, courseId: number, targetItemCode: string) {

        const modules = await this._courseService
            .getCourseModulesAsync(userId, courseId);

        const courseItemsFlat = this._getCourseItemsFlat(modules);

        const targetItem = courseItemsFlat
            .firstOrNull(x => x.code === targetItemCode);

        if (targetItem && targetItem.state !== 'locked')
            return targetItem.code;

        // target item is locked, fallback...
        const firstLockedIndex = courseItemsFlat
            .findIndex(x => x.state === 'locked');

        const prevIndex = firstLockedIndex - 1;

        return (courseItemsFlat[prevIndex]
            ? courseItemsFlat[prevIndex]
            : courseItemsFlat[0]).code;
    };

    /**
     * Returns a list of objects symbolizing the items present in the specified course. 
     * The list is ordered, and can be traversed by list item indicies.
     */
    private _getCourseItemsFlat(modules: ModuleDTO[]) {

        type CourseItemFlatListTyle = {
            code: string,
            index: number,
            state: CourseItemStateType
        };

        const flatList = [] as CourseItemFlatListTyle[];

        modules
            .forEach(module => {

                flatList
                    .push({
                        code: module.code,
                        index: module.orderIndex,
                        state: module.state
                    });

                module
                    .items
                    .forEach(x => flatList
                        .push({
                            code: x.descriptorCode,
                            index: x.orderIndex,
                            state: x.state
                        }));
            });

        return flatList;
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
