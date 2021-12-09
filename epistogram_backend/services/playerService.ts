import { UserCourseBridge } from "../models/entity/UserCourseBridge";
import { VideoPlaybackSample } from "../models/entity/VideoPlaybackSample";
import { ModuleDTO } from "../models/shared_models/ModuleDTO";
import { PlayerDataDTO } from "../models/shared_models/PlayerDataDTO";
import { CourseItemStateType } from "../models/shared_models/types/sharedTypes";
import { VideoPlaybackSampleDTO } from "../models/shared_models/VideoPlaybackSampleDTO";
import { VideoSamplingResultDTO } from "../models/shared_models/VideoSamplingResultDTO";
import { VideoCompletedView } from "../models/views/VideoCompletedView";
import { VideoProgressView } from "../models/views/VideoProgressView";
import { staticProvider } from "../staticProvider";
import { CourseService } from "./CourseService2";
import { readItemCode } from "./encodeService";
import { ExamService } from "./ExamService2";
import { toVideoDTO } from "./mappings";
import { ModuleService } from "./ModuleService2";
import { createAnswerSessionAsync } from "./questionAnswerService";
import { UserCourseBridgeService } from "./UserCourseBridgeService";
import { getSampleChunksAsync, getVideoWatchedPercentAsync, squishSamplesAsync } from "./videoPlaybackSampleService";
import { VideoService } from "./VideoService2";

export class PlayerService {

    private _courseService: CourseService;
    private _examService: ExamService;
    private _moduleService: ModuleService;
    private _userCourseBridgeService: UserCourseBridgeService;
    private _videoService: VideoService;

    constructor(
        courseService: CourseService,
        examService: ExamService,
        moduleService: ModuleService,
        userCourseBridge: UserCourseBridgeService,
        videoService: VideoService) {

        this._courseService = courseService;
        this._examService = examService;
        this._moduleService = moduleService;
        this._userCourseBridgeService = userCourseBridge;
        this._videoService = videoService;
    }

    getPlayerDataAsync = async (
        userId: number,
        descriptorCode: string) => {

        // get current item
        const courseId = await this._courseService
            .getCourseIdByItemCodeAsync(descriptorCode);

        // get valid course item 
        const validItemCode = await this.getValidCourseItemCodeAsync(userId, courseId, descriptorCode);

        // set current course 
        await this._courseService.setCurrentCourse(userId, courseId, validItemCode);

        // course items 
        const modules = await this._courseService.getCurrentCourseItemsAsync(userId);

        // get course item dto
        const { itemId, itemType } = readItemCode(validItemCode);
        const videoDTO = itemType === "video" ? await this.getVideoDTOAsync(userId, itemId) : null;
        const examDTO = itemType === "exam" ? await this._examService.getExamDTOAsync(itemId) : null;
        const moduleDetailedDTO = itemType === "module" ? await this._moduleService.getModuleDetailedDTOAsync(itemId) : null;

        // get user course bridge
        const userCourseBridge = await this._userCourseBridgeService
            .getUserCourseBridgeOrFailAsync(userId, courseId);

        // get new answer session
        const answerSessionId = itemType === "module"
            ? null
            : await createAnswerSessionAsync(userId, examDTO?.id, videoDTO?.id);

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

        const modules = await this._courseService.getCourseModulesAsync(userId, courseId);
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

        const flat = [] as { code: string, index: number, state: CourseItemStateType }[];
        modules
            .forEach(module => {

                flat.push({ code: module.code, index: module.orderIndex, state: module.state });

                module.items.forEach(x => flat.push({ code: x.descriptorCode, index: x.orderIndex, state: x.state }));
            });

        return flat;
    }

    getVideoDTOAsync = async (userId: number, videoId: number) => {

        const maxWathcedSeconds = await this.getMaxWatchedSeconds(userId, videoId);
        const video = await this._videoService.getVideoByIdAsync(videoId);

        return toVideoDTO(video, maxWathcedSeconds);
    }

    saveVideoPlaybackSample = async (userId: number, dto: VideoPlaybackSampleDTO) => {

        const currentBridge = await staticProvider
            .ormConnection
            .getRepository(UserCourseBridge)
            .findOneOrFail({
                where: {
                    userId,
                    isCurrent: true
                }
            });

        if (!currentBridge.currentItemCode)
            throw new Error("Course has no current item!");

        const { itemId: videoId, itemType } = readItemCode(currentBridge.currentItemCode);
        if (itemType !== "video")
            throw new Error("Current item is not of type: video!");

        await staticProvider
            .ormConnection
            .getRepository(VideoPlaybackSample)
            .insert({
                videoId: videoId,
                userId: userId,
                fromSeconds: dto.fromSeconds,
                toSeconds: dto.toSeconds
            });

        // get sample chunks
        const chunks = await getSampleChunksAsync(userId, videoId);

        // calucate and save watched percent
        const watchedPercent = await getVideoWatchedPercentAsync(userId, videoId, chunks);

        // 5% is a very low number only for development
        const newIsWatchedState = watchedPercent > 5;

        // get old watched state, can be null on first sampling.
        const isCompletedBefore = await this.getVideoIsCompletedState(userId, videoId);

        // squish chunks to store less data 
        await squishSamplesAsync(userId, videoId, chunks);
        await this._videoService.saveVideoPlaybackDataAsync(userId, videoId, watchedPercent, newIsWatchedState);

        // calculate is watched state changed
        const isCompletedAfter = await this.getVideoIsCompletedState(userId, videoId);
        const isWatchedStateChanged = isCompletedBefore?.isCompleted !== isCompletedAfter?.isCompleted;

        const maxWathcedSeconds = await this.getMaxWatchedSeconds(userId, videoId);

        // if is watched state changed 
        // reward user with episto coins
        if (isWatchedStateChanged) {

            await staticProvider
                .services
                .coinAcquireService
                .acquireVideoWatchedCoinsAsync(userId, videoId);
        }

        // save user activity
        await staticProvider
            .services
            .userSessionActivityService
            .saveUserSessionActivityAsync(userId, "video");

        return {
            isWatchedStateChanged,
            maxWathcedSeconds
        } as VideoSamplingResultDTO;
    }

    getMaxWatchedSeconds = async (userId: number, videoId: number) => {

        const ads = await staticProvider
            .ormConnection
            .getRepository(VideoProgressView)
            .findOneOrFail({
                where: {
                    userId: userId,
                    videoId: videoId
                }
            })

        return ads.toSeconds;
    }

    getVideoIsCompletedState = async (userId: number, videoId: number) => {

        return await staticProvider
            .ormConnection
            .getRepository(VideoCompletedView)
            .findOne({
                where: {
                    userId: userId,
                    videoId: videoId
                }
            });
    }
}
