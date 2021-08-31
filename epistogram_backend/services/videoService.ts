import { UploadedFile } from "express-fileupload";
import { StorageFile } from "../models/entity/StorageFile";
import { Video } from "../models/entity/Video";
import { staticProvider } from "../staticProvider"
import { uploadToStorageAsync } from "./storageService";

export const createVideoAsync = async (courseId: number, orderIndex: number) => {

    await staticProvider
        .ormConnection
        .getRepository(Video)
        .insert({
            courseId: courseId,
            orderIndex: orderIndex,
        });
}

export const uploadVideoFileAsync = async (videoId: number, file: UploadedFile) => {

    // crate pending storage file
    const videoFile = {
        pending: true,
        filePath: `videos/video_${videoId}.mp4`
    } as StorageFile;

    await staticProvider
        .ormConnection
        .getRepository(StorageFile)
        .insert(videoFile);

    // assing to video
    await staticProvider
        .ormConnection
        .getRepository(Video)
        .save({
            id: videoId,
            videoFileId: videoFile.id
        });

    // upload to storage
    await uploadToStorageAsync(file, videoFile.filePath);
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