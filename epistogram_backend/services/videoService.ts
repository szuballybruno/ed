import { Video } from "../models/entity/Video";
import { staticProvider } from "../staticProvider";

export const createVideoAsync = async (courseId: number, orderIndex: number) => {

    await staticProvider
        .ormConnection
        .getRepository(Video)
        .insert({
            courseId: courseId,
            orderIndex: orderIndex,
        });
}

export const setVideoFileId = async (videoId: number, videoFileId: number) => {

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

export const getVideoByIdAsync = (videoId: number) => {

    return staticProvider
        .ormConnection
        .getRepository(Video)
        .createQueryBuilder("v")
        .where("v.id = :videoId", { videoId })
        .leftJoinAndSelect("v.videoFile", "vf")
        .getOneOrFail();
}