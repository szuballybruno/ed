import { User } from "../models/entity/User";
import { VideoPlaybackSample } from "../models/entity/VideoPlaybackSample";
import { UserVideoCompletedView } from "../models/entity/views/UserVideoCompletedView";
import { UserVideoMaxWatchedSecondsView } from "../models/entity/views/UserVideoMaxWatchedSecondsView";
import { PlayerDataDTO } from "../models/shared_models/PlayerDataDTO";
import { VideoPlaybackSampleDTO } from "../models/shared_models/VideoPlaybackSampleDTO";
import { VideoSamplingResultDTO } from "../models/shared_models/VideoSamplingResultDTO";
import { staticProvider } from "../staticProvider";
import { getCourseItemsAsync, getCurrentCourseItemDescriptor, getCurrentCourseItemDescriptorCodeAsync, getExamDTOAsync, getUserCourseBridgeAsync, getUserCourseBridgeOrFailAsync } from "./courseService";
import { readCourseItemDescriptorCode } from "./encodeService";
import { toVideoDTO } from "./mappings";
import { log } from "./misc/logger";
import { createAnswerSessionAsync } from "./questionAnswerService";
import { getUserById } from "./userService";
import { getSampleChunksAsync, getVideoWatchedPercentAsync, squishSamplesAsync } from "./videoPlaybackSampleService";
import { getVideoByIdAsync, saveVideoPlaybackDataAsync } from "./videoService";

export const getPlayerDataAsync = async (
    userId: number,
    descriptorCode: string) => {

    const { itemId: courseItemId, itemType: courseItemType } = readCourseItemDescriptorCode(descriptorCode);

    const videoDTO = courseItemType == "video" ? await getVideoDTOAsync(userId, courseItemId) : null;
    const examDTO = courseItemType == "exam" ? await getExamDTOAsync(userId, courseItemId) : null;
    const courseId = videoDTO?.courseId || examDTO?.courseId;

    // set current course item
    const setCurrentItemData = {
        id: userId,
        currentVideoId: videoDTO?.id ?? null,
        currentExamId: examDTO?.id ?? null
    } as User;

    await staticProvider
        .ormConnection
        .getRepository(User)
        .save(setCurrentItemData);

    // get user course bridge
    const userCourseBridge = await getUserCourseBridgeOrFailAsync(userId, courseId!);

    // get new answer session
    const answerSessionId = await createAnswerSessionAsync(userId, examDTO?.id, videoDTO?.id);

    // current item code 
    const code = await getCurrentCourseItemDescriptorCodeAsync(userId);

    // course items 
    const courseItems = await getCourseItemsAsync(userId);

    return {
        video: videoDTO,
        exam: examDTO,
        answerSessionId: answerSessionId,
        mode: userCourseBridge.courseMode,
        courseId: courseId!,
        courseItemCode: code,
        courseItems: courseItems
    } as PlayerDataDTO;
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
