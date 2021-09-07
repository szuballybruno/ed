import { Video } from "../models/entity/Video";
import { staticProvider } from "../staticProvider";
import { answerQuestionAsync } from "./questionAnswerService";

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