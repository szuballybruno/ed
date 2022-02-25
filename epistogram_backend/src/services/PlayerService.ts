import { Video } from "../models/entity/Video";
import { ModuleDTO } from "../shared/dtos/ModuleDTO";
import { PlayerDataDTO } from "../shared/dtos/PlayerDataDTO";
import { VideoDTO } from "../shared/dtos/VideoDTO";
import { CourseItemStateType } from "../shared/types/sharedTypes";
import { CourseService } from "./CourseService";
import { ExamService } from "./ExamService";
import { MapperService } from "./MapperService";
import { readItemCode } from "./misc/encodeService";
import { ServiceBase } from "./misc/ServiceBase";
import { ModuleService } from "./ModuleService";
import { PlaybackService } from "./PlaybackService";
import { QuestionAnswerService } from "./QuestionAnswerService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";
import { UserCourseBridgeService } from "./UserCourseBridgeService";
import { VideoService } from "./VideoService";

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
        playbackService: PlaybackService) {

        super(mappserService, ormService);

        this._courseService = courseService;
        this._examService = examService;
        this._moduleService = moduleService;
        this._userCourseBridgeService = userCourseBridge;
        this._videoService = videoService;
        this._questionAnswerService = questionAnswerService;
        this._playbackService = playbackService;
    }

    getPlayerDataAsync = async (
        userId: number,
        descriptorCode: string) => {

        // get current course id
        const courseId = await this._courseService
            .getCourseIdByItemCodeAsync(descriptorCode);

        // get valid course item 
        const validItemCode = await this.getValidCourseItemCodeAsync(userId, courseId, descriptorCode);

        // set current course 
        await this._courseService
            .setCurrentCourse(userId, courseId, "watch", validItemCode);

        // course items 
        const modules = await this._courseService
            .getCourseModulesAsync(userId, courseId);

        // get course item dto
        const { itemId, itemType } = readItemCode(validItemCode);
        const videoDTO = itemType === "video" ? await this.getVideoDTOAsync(userId, itemId) : null;
        const examDTO = itemType === "exam" ? await this._examService.getExamPlayerDTOAsync(userId, itemId) : null;
        const moduleDetailedDTO = itemType === "module" ? await this._moduleService.getModuleDetailedDTOAsync(itemId) : null;

        // get user course bridge
        const userCourseBridge = await this._userCourseBridgeService
            .getUserCourseBridgeOrFailAsync(userId, courseId);

        // get new answer session
        const answerSessionId = itemType === "module"
            ? null
            : await this._questionAnswerService
                .createAnswerSessionAsync(userId, examDTO?.id, videoDTO?.id);

        // next 
        const flat = this.getCourseItemsFlat(modules);

        const currentItemIndexInFlatList = flat
            .findIndex(x => x.code === validItemCode);

        const nextItemCode = flat[currentItemIndexInFlatList + 1]?.code ?? null;

        return {
            video: videoDTO,
            exam: examDTO,
            module: moduleDetailedDTO,
            answerSessionId: answerSessionId,
            mode: userCourseBridge.courseMode,
            courseId: courseId!,
            courseItemCode: descriptorCode,
            modules: modules,
            nextItemCode
        } as PlayerDataDTO;
    }

    /**
     * Finds the closest valid course item code to the target. 
     * This is to ensure a user is not recieving an item they should not access.
     *
     * @param {number} userId UserId.
     * @param {number} courseId CourseId.
     * @param {string} targetItemCode The code of the target item, if it's accessable for the user, it will be returned.
     * @return {string} the code of the closest valid itme found in course.
     */
    getValidCourseItemCodeAsync = async (userId: number, courseId: number, targetItemCode: string) => {

        const modules = await this._courseService
            .getCourseModulesAsync(userId, courseId);

        const courseItemsFlat = this.getCourseItemsFlat(modules);

        const targetItem = courseItemsFlat
            .single(x => x.code === targetItemCode);

        if (targetItem.state !== "locked")
            return targetItem.code;

        // target item is locked, fallback...
        const firstLockedIndex = courseItemsFlat
            .findIndex(x => x.state === "locked");

        const prevIndex = firstLockedIndex - 1;

        return (courseItemsFlat[prevIndex]
            ? courseItemsFlat[prevIndex]
            : courseItemsFlat[0]).code;
    }

    /**
     * Returns a list of objects symbolizing the items present in the specified course. 
     * The list is ordered, and can be traversed by list item indicies.
     *
     * @param {ModuleDTO[]} modules Modules present in course.
     * @return a flat list of items in course.
     */
    getCourseItemsFlat = (modules: ModuleDTO[]) => {

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
    }

    getVideoDTOAsync = async (userId: number, videoId: number) => {

        const maxWathcedSeconds = await this._playbackService
            .getMaxWatchedSeconds(userId, videoId);

        const video = await this._videoService
            .getVideoByIdAsync(videoId);

        return this._mapperService
            .map(Video, VideoDTO, video, maxWathcedSeconds);
    }
}
