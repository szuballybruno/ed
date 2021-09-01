import { UploadedFile } from "express-fileupload";
import { StorageFile } from "../models/entity/StorageFile";
import { User } from "../models/entity/User";
import { Video } from "../models/entity/Video";
import { staticProvider } from "../staticProvider";
import { deleteStorageFileAsync, uploadToStorageAsync } from "./storageService";
import { getUserById, setUserAvatarFileId } from "./userService";
import { getVideoByIdAsync, setVideoFileId, setVideoThumbnailFileId } from "./videoService";

export const uploadVideoFileAsync = (videoId: number, file: UploadedFile) => {

    return uploadAssigendFileAsync<Video>(
        getFilePath("videos", "video", videoId, "mp4"),
        () => getVideoByIdAsync(videoId),
        (fileId) => setVideoFileId(videoId, fileId),
        (entity) => entity.videoFileId,
        file);
}

export const uploadVideoThumbnailFileAsync = (videoId: number, file: UploadedFile) => {

    return uploadAssigendFileAsync<Video>(
        getFilePath("videoThumbnails", "video_thumbnail", videoId, "png"),
        () => getVideoByIdAsync(videoId),
        (fileId) => setVideoThumbnailFileId(videoId, fileId),
        (entity) => entity.thumbnailFileId,
        file);
};

export const uploadAvatarFileAsync = (userId: number, file: UploadedFile) => {

    return uploadAssigendFileAsync<User>(
        getFilePath("userAvatars", "user_avatar", userId, "png"),
        () => getUserById(userId),
        (fileId) => setUserAvatarFileId(userId, fileId),
        (entity) => entity.avatarFileId,
        file);
};

export const uploadCourseCoverFileAsync = (courseId: number, file: UploadedFile) => {

    // return uploadAssigendFileAsync<Video>(
    //     getFilePath("videos", "video_thumbnail", videoId, ".png"),
    //     () => getVideoByIdAsync(videoId),
    //     (fileId) => setVideoThumbnailFileId(videoId, fileId),
    //     (entity) => entity.thumbnailFileId,
    //     file);

    return Promise.resolve();
};

const uploadAssigendFileAsync = async <T>(
    filePath: string,
    getEntityAsync: () => Promise<T>,
    assignFileToEntity: (fileId: number) => Promise<void>,
    getAssignedFileId: (entity: T) => number,
    file: UploadedFile) => {

    // crate pending storage file
    const fileEntity = await insertFileAsync(filePath);

    // get entity
    const entity = await getEntityAsync();

    // assing to entity
    await assignFileToEntity(fileEntity.id);

    // delete previous file entity
    const assignedFileId = getAssignedFileId(entity);
    if (assignedFileId) {

        await deleteFileAsync(assignedFileId);
        await deleteStorageFileAsync(filePath);
    }

    // upload to storage
    await uploadToStorageAsync(file, filePath);
}

const getFilePath = (folderPath: string, fileType: string, fileId: number, extension: string) => {

    return `${folderPath}/${fileType}_${fileId}.${extension}`
}

const deleteFileAsync = async (id: number) => {

    await staticProvider
        .ormConnection
        .getRepository(StorageFile)
        .delete(id);
}

const insertFileAsync = async (path: string) => {

    const file = {
        pending: true,
        filePath: path
    } as StorageFile;

    await staticProvider
        .ormConnection
        .getRepository(StorageFile)
        .insert(file);

    return file;
}