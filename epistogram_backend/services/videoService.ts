import { StorageFile } from "../models/entity/StorageFile";
import { Video } from "../models/entity/Video";
import { VideoPlaybackData } from "../models/entity/VideoPlaybackData";
import { staticProvider } from "../staticProvider";
import { log } from "./misc/logger";
import { getAssetUrl } from "./misc/urlProvider";
import { getVideoLengthSecondsAsync } from "./misc/videoDurationService";
import { answerQuestionAsync } from "./questionAnswerService";

export const answerVideoQuestionAsync = async (answerSessionId: number, questionId: number, answerId: number) => {

    // validation comes here

    return answerQuestionAsync(answerSessionId, questionId, answerId);
}

export const insertVideoAsync = async (video: Video, filePath?: string) => {

    if (video.id)
        throw new Error("Cannot insert with id!");

    if (filePath) {
        const videoFileUrl = getAssetUrl(filePath)!;

        video.videoFile = {
            filePath: filePath
        } as StorageFile;

        video.lengthSeconds = await getVideoLengthSecondsAsync(videoFileUrl);
    }
    else {

        video.lengthSeconds = 0;
    }

    await staticProvider
        .ormConnection
        .getRepository(Video)
        .save(video);
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

export const saveVideoPlaybackDataAsync = async (
    userId: number, videoId: number, watchedPercent: number, isWatched: boolean) => {

    const repo = staticProvider
        .ormConnection
        .getRepository(VideoPlaybackData);

    const pbd = await repo
        .findOne({
            videoId: videoId,
            userId: userId
        });

    const videoPlaybackData = {
        id: pbd?.id,
        userId: userId,
        videoId: videoId,
        watchedPercent: watchedPercent,
        isWatched: isWatched
    } as VideoPlaybackData;

    log("Saving video playback data:");
    log(videoPlaybackData);

    await repo
        .save(videoPlaybackData);
}

export const getVideoPlaybackData = async (userId: number, videoId: number) => {

    return staticProvider
        .ormConnection
        .getRepository(VideoPlaybackData)
        .findOne({
            videoId: videoId,
            userId: userId
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