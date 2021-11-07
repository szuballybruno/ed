import { UserCourseBridge } from "../models/entity/UserCourseBridge";
import { VideoPlaybackSample } from "../models/entity/VideoPlaybackSample";
import { PlayerDataDTO } from "../models/shared_models/PlayerDataDTO";
import { VideoPlaybackSampleDTO } from "../models/shared_models/VideoPlaybackSampleDTO";
import { VideoSamplingResultDTO } from "../models/shared_models/VideoSamplingResultDTO";
import { CourseItemStateView } from "../models/views/CourseItemStateView";
import { VideoCompletedView } from "../models/views/VideoCompletedView";
import { VideoProgressView } from "../models/views/VideoProgressView";
import { staticProvider } from "../staticProvider";
import { getCourseItemByCodeAsync, getCourseItemsAsync, getCurrentCourseItemsAsync, getExamDTOAsync, getUserCourseBridgeOrFailAsync, setCurrentCourse } from "./courseService";
import { toCourseItemDTO, toVideoDTO } from "./mappings";
import { createAnswerSessionAsync } from "./questionAnswerService";
import { saveUserSessionActivityAsync } from "./userSessionActivity";
import { getSampleChunksAsync, getVideoWatchedPercentAsync, squishSamplesAsync } from "./videoPlaybackSampleService";
import { getVideoByIdAsync, saveVideoPlaybackDataAsync } from "./videoService";

export const getPlayerDataAsync = async (
    userId: number,
    descriptorCode: string) => {

    // get current item
    const currentCourseItem = await getCourseItemByCodeAsync(descriptorCode);
    const courseId = currentCourseItem.courseId;

    // get valid course item code
    const validCourseItem = await getValidCourseItem(userId, courseId, descriptorCode);

    // set current course 
    await setCurrentCourse(
        userId,
        courseId,
        validCourseItem.type === "video" ? validCourseItem.id : null,
        validCourseItem.type === "exam" ? validCourseItem.id : null);

    // course items 
    const courseItems = await getCurrentCourseItemsAsync(userId);

    // get course item dto
    const videoDTO = validCourseItem.type === "video" ? await getVideoDTOAsync(userId, validCourseItem.id) : null;
    const examDTO = validCourseItem.type === "exam" ? await getExamDTOAsync(userId, validCourseItem.id) : null;

    // get user course bridge
    const userCourseBridge = await getUserCourseBridgeOrFailAsync(userId, courseId);

    // get new answer session
    const answerSessionId = await createAnswerSessionAsync(userId, examDTO?.id, videoDTO?.id);

    return {
        video: videoDTO,
        exam: examDTO,
        answerSessionId: answerSessionId,
        mode: userCourseBridge.courseMode,
        courseId: courseId!,
        courseItemCode: descriptorCode,
        courseItems: courseItems
    } as PlayerDataDTO;
}

export const getValidCourseItem = async (userId: number, courseId: number, itemCode: string) => {

    const courseItems = await getCourseItemsAsync(userId, courseId);

    const targetItem = courseItems
        .single(x => x.descriptorCode === itemCode);

    // if requested item is locked, return the last available
    if (targetItem.state === "locked") {

        const firstLockedIndex = courseItems
            .findIndex(x => x.state === "locked");

        const prevIndex = firstLockedIndex - 1;

        return courseItems[prevIndex]
            ? courseItems[prevIndex]
            : courseItems[0];
    }

    return targetItem;
}

export const getVideoDTOAsync = async (userId: number, videoId: number) => {

    const maxWathcedSeconds = await getMaxWatchedSeconds(userId, videoId);
    const video = await getVideoByIdAsync(videoId);

    return toVideoDTO(video, maxWathcedSeconds);
}

export const saveVideoPlaybackSample = async (userId: number, dto: VideoPlaybackSampleDTO) => {

    const currentBridge = await staticProvider
        .ormConnection
        .getRepository(UserCourseBridge)
        .findOneOrFail({
            where: {
                userId,
                isCurrent: true
            }
        });

    const videoId = currentBridge.currentVideoId;
    if (!videoId)
        throw new Error("Current video id is null or undefined!");

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
    const isCompletedBefore = await getVideoIsCompletedState(userId, videoId);

    // squish chunks to store less data 
    await squishSamplesAsync(userId, videoId, chunks);
    await saveVideoPlaybackDataAsync(userId, videoId, watchedPercent, newIsWatchedState);

    // calculate is watched state changed
    const isCompletedAfter = await getVideoIsCompletedState(userId, videoId);
    const isWatchedStateChanged = isCompletedBefore?.isComplete !== isCompletedAfter?.isComplete;

    const maxWathcedSeconds = await getMaxWatchedSeconds(userId, videoId);

    // save user activity
    await saveUserSessionActivityAsync(userId, "video");

    return {
        isWatchedStateChanged,
        maxWathcedSeconds
    } as VideoSamplingResultDTO;
}

export const getMaxWatchedSeconds = async (userId: number, videoId: number) => {

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

export const getVideoIsCompletedState = async (userId: number, videoId: number) => {

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
