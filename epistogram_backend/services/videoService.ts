import { StorageFile } from "../models/entity/StorageFile";
import { Video } from "../models/entity/Video";
import { staticProvider } from "../staticProvider";
import { getAssetUrl } from "./misc/urlProvider";
import { getVideoLengthSecondsAsync } from "./misc/videoDurationService";
import { answerQuestionAsync } from "./questionAnswerService";

export const answerVideoQuestionAsync = async (
    userId: number, answerSessionId: number, questionId: number, answerId: number) => {

    // validation comes here

    return answerQuestionAsync(userId, answerSessionId, questionId, answerId);
}

export const insertVideoAsync = async (video: Video, filePath: string | null) => {

    if (video.id)
        throw new Error("Cannot insert with id!");

    if (filePath) {
        const videoFileUrl = getAssetUrl(filePath)!;

        video.videoFile = {
            pending: false,
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