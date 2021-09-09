"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCourseCoverFileAsync = exports.uploadAvatarFileAsync = exports.uploadVideoThumbnailFileAsync = exports.uploadVideoFileAsync = void 0;
const StorageFile_1 = require("../models/entity/StorageFile");
const staticProvider_1 = require("../staticProvider");
const storageService_1 = require("./storageService");
const userService_1 = require("./userService");
const videoService_1 = require("./videoService");
const uploadVideoFileAsync = (videoId, file) => {
    return uploadAssigendFileAsync(getFilePath("videos", "video", videoId, "mp4"), () => videoService_1.getVideoByIdAsync(videoId), (fileId) => videoService_1.setVideoFileId(videoId, fileId), (entity) => entity.videoFileId, file);
};
exports.uploadVideoFileAsync = uploadVideoFileAsync;
const uploadVideoThumbnailFileAsync = (videoId, file) => {
    return uploadAssigendFileAsync(getFilePath("videoThumbnails", "video_thumbnail", videoId, "png"), () => videoService_1.getVideoByIdAsync(videoId), (fileId) => videoService_1.setVideoThumbnailFileId(videoId, fileId), (entity) => entity.thumbnailFileId, file);
};
exports.uploadVideoThumbnailFileAsync = uploadVideoThumbnailFileAsync;
const uploadAvatarFileAsync = (userId, file) => {
    return uploadAssigendFileAsync(getFilePath("userAvatars", "user_avatar", userId, "png"), () => userService_1.getUserById(userId), (fileId) => userService_1.setUserAvatarFileId(userId, fileId), (entity) => entity.avatarFileId, file);
};
exports.uploadAvatarFileAsync = uploadAvatarFileAsync;
const uploadCourseCoverFileAsync = (courseId, file) => {
    // return uploadAssigendFileAsync<Video>(
    //     getFilePath("videos", "video_thumbnail", videoId, ".png"),
    //     () => getVideoByIdAsync(videoId),
    //     (fileId) => setVideoThumbnailFileId(videoId, fileId),
    //     (entity) => entity.thumbnailFileId,
    //     file);
    return Promise.resolve();
};
exports.uploadCourseCoverFileAsync = uploadCourseCoverFileAsync;
const uploadAssigendFileAsync = (filePath, getEntityAsync, assignFileToEntity, getAssignedFileId, file) => __awaiter(void 0, void 0, void 0, function* () {
    // crate pending storage file
    const fileEntity = yield insertFileAsync(filePath);
    // get entity
    const entity = yield getEntityAsync();
    // assing to entity
    yield assignFileToEntity(fileEntity.id);
    // delete previous file entity
    const assignedFileId = getAssignedFileId(entity);
    if (assignedFileId) {
        yield deleteFileAsync(assignedFileId);
        yield storageService_1.deleteStorageFileAsync(filePath);
    }
    // upload to storage
    yield storageService_1.uploadToStorageAsync(file, filePath);
});
const getFilePath = (folderPath, fileType, fileId, extension) => {
    return `${folderPath}/${fileType}_${fileId}.${extension}`;
};
const deleteFileAsync = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield staticProvider_1.staticProvider
        .ormConnection
        .getRepository(StorageFile_1.StorageFile)
        .delete(id);
});
const insertFileAsync = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const file = {
        pending: true,
        filePath: path
    };
    yield staticProvider_1.staticProvider
        .ormConnection
        .getRepository(StorageFile_1.StorageFile)
        .insert(file);
    return file;
});
//# sourceMappingURL=fileService.js.map