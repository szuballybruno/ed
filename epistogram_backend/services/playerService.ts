import { User } from "../models/entity/User";
import { VideoPlaybackSample } from "../models/entity/VideoPlaybackSample";
import { UserVideoCompletedView } from "../models/entity/views/UserVideoCompletedView";
import { UserVideoMaxWatchedSecondsView } from "../models/entity/views/UserVideoMaxWatchedSecondsView";
import { PlayerDataDTO } from "../models/shared_models/PlayerDataDTO";
import { VideoPlaybackSampleDTO } from "../models/shared_models/VideoPlaybackSampleDTO";
import { VideoSamplingResultDTO } from "../models/shared_models/VideoSamplingResultDTO";
import { staticProvider } from "../staticProvider";
import { getCourseItemAsync, getCourseItemByCodeAsync, getCourseItemsAsync, getCurrentCourseItemDescriptor, getCurrentCourseItemDescriptorCodeAsync, getExamDTOAsync, getUserCourseBridgeAsync, getUserCourseBridgeOrFailAsync } from "./courseService";
import { getCourseItemDescriptorCode, readCourseItemDescriptorCode } from "./encodeService";
import { toVideoDTO } from "./mappings";
import { log } from "./misc/logger";
import { createAnswerSessionAsync } from "./questionAnswerService";
import { getUserById } from "./userService";
import { getSampleChunksAsync, getVideoWatchedPercentAsync, squishSamplesAsync } from "./videoPlaybackSampleService";
import { getVideoByIdAsync, saveVideoPlaybackDataAsync } from "./videoService";

export const getPlayerDataAsync = async (
    userId: number,
    descriptorCode: string) => {

    // get course id
    const courseId = (await getCourseItemByCodeAsync(descriptorCode)).courseId;

    // course items 
    const courseItems = await getCourseItemsAsync(userId, courseId, descriptorCode);

    const currentCourseItem = courseItems
        .single(x => x.state === "current");

    const { itemId, itemType } = readCourseItemDescriptorCode(currentCourseItem.descriptorCode);
    const videoDTO = itemType == "video" ? await getVideoDTOAsync(userId, itemId) : null;
    const examDTO = itemType == "exam" ? await getExamDTOAsync(userId, itemId) : null;

    // set current items 
    setUserCurrentCourseDataAsync(
        userId,
        itemType === "video" ? itemId : null,
        itemType === "exam" ? itemId : null,
        courseId);

    // get user course bridge
    const userCourseBridge = await getUserCourseBridgeOrFailAsync(userId, courseId);

    // get new answer session
    const answerSessionId = await createAnswerSessionAsync(userId, examDTO?.id, videoDTO?.id);

    return {
        video: videoDTO,
        exam: examDTO,
        answerSessionId: answerSessionId,
        mode: userCourseBridge.courseMode,
        courseId: courseId,
        courseItemCode: currentCourseItem.descriptorCode,
        courseItems: courseItems
    } as PlayerDataDTO;
}

const setUserCurrentCourseDataAsync = async (
    userId: number,
    videoId: number | null,
    examId: number | null,
    courseId: number | null) => {

    // set current course item
    const setCurrentItemData = {
        id: userId,
        currentVideoId: videoId,
        currentExamId: examId,
        currentCourseId: courseId
    } as User;

    await staticProvider
        .ormConnection
        .getRepository(User)
        .save(setCurrentItemData);
}

export const getVideoDTOAsync = async (userId: number, videoId: number) => {

    const maxWathcedSeconds = await getMaxWatchedSeconds(userId, videoId);
    const video = await getVideoByIdAsync(videoId);

    return toVideoDTO(video, maxWathcedSeconds);
}

export const saveVideoPlaybackSample = async (userId: number, dto: VideoPlaybackSampleDTO) => {

    const user = await getUserById(userId);
    const currentItemDesc = getCurrentCourseItemDescriptor(user);

    if (!currentItemDesc)
        throw new Error("Cannot add video playback sample while current course item is not set!");

    if (currentItemDesc.itemType !== "video")
        throw new Error("Cannot add video playback sample while current course item is not a video!");

    const videoId = currentItemDesc.itemId;

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

    return {
        isWatchedStateChanged,
        maxWathcedSeconds
    } as VideoSamplingResultDTO;
}

export const getMaxWatchedSeconds = async (userId: number, videoId: number) => {

    const ads = await staticProvider
        .ormConnection
        .getRepository(UserVideoMaxWatchedSecondsView)
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
        .getRepository(UserVideoCompletedView)
        .findOne({
            where: {
                userId: userId,
                videoId: videoId
            }
        });
}
