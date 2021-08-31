import { UploadedFile } from "express-fileupload";
import { StorageFile } from "../models/entity/StorageFile";
import { Video } from "../models/entity/Video";
import { staticProvider } from "../staticProvider"
import { appendToFileAsync } from "./storageService";

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

    let videoFile = (await staticProvider
        .ormConnection
        .getRepository(Video)
        .createQueryBuilder("v")
        .leftJoinAndSelect("v.videoFile", "vf")
        .getOneOrFail()).videoFile;

    // crate pending storage file
    if (!videoFile) {

        videoFile = {
            pending: true,
            url: "file.mp4"
        } as StorageFile;

        await staticProvider
            .ormConnection
            .getRepository(StorageFile)
            .insert(videoFile);

        await staticProvider
            .ormConnection
            .getRepository(Video)
            .save({
                id: videoId,
                videoFileId: videoFile.id
            });
    }

    // append to file
    await appendToFileAsync(videoFile.url, file.data);
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