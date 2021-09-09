import { Video } from "../models/entity/Video";
import { VideoPlaybackSample } from "../models/entity/VideoPlaybackSample";
import { VideoPlaybackSampleDTO } from "../models/shared_models/VideoPlaybackSampleDTO";
import { staticProvider } from "../staticProvider";
import { getCurrentCourseItemDescriptor } from "./courseService";
import { answerQuestionAsync } from "./questionAnswerService";
import { getUserById } from "./userService";

export const saveVideoPlaybackSample = async (userId: number, dto: VideoPlaybackSampleDTO) => {

    const user = await getUserById(userId);
    const currentItemDesc = getCurrentCourseItemDescriptor(user);

    if (!currentItemDesc)
        throw new Error("Cannot add video playback sample while current course item is not set!");

    if (currentItemDesc.itemType !== "video")
        throw new Error("Cannot add video playback sample while current course item is not a video!");

    await staticProvider
        .ormConnection
        .getRepository(VideoPlaybackSample)
        .insert({
            videoId: currentItemDesc.itemId,
            userId: userId,
            fromSeconds: dto.fromSeconds,
            toSeconds: dto.toSeconds
        });
}

export const answerVideoQuestionAsync = async (
    userId: number, answerSessionId: number, questionId: number, answerId: number) => {

    // validation comes here

    return answerQuestionAsync(userId, answerSessionId, questionId, answerId);
}

export const createVideoAsync = async (courseId: number, orderIndex: number) => {

    await staticProvider
        .ormConnection
        .getRepository(Video)
        .insert({
            courseId: courseId,
            orderIndex: orderIndex,
        });
}

export const setVideoFileIdAsync = async (videoId: number, videoFileId: number) => {

    await staticProvider
        .ormConnection
        .getRepository(Video)
        .save({
            id: videoId,
            videoFileId: videoFileId
        });
}

export const setVideoThumbnailFileId = async (videoId: number, thumbnailFileId: number) => {

    await staticProvider
        .ormConnection
        .getRepository(Video)
        .save({
            id: videoId,
            thumbnailFileId: thumbnailFileId
        });
}

export const getVideoByIdAsync = async (videoId: number) => {

    const video = await staticProvider
        .ormConnection
        .getRepository(Video)
        .createQueryBuilder("v")
        .where("v.id = :videoId", { videoId })
        .leftJoinAndSelect("v.videoFile", "vf")
        .leftJoinAndSelect("v.questions", "q")
        .leftJoinAndSelect("q.answers", "a")
        .getOneOrFail();

    return video;
}