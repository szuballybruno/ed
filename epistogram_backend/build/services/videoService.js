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
exports.getVideoByIdAsync = exports.setVideoThumbnailFileId = exports.setVideoFileId = exports.createVideoAsync = void 0;
const Video_1 = require("../models/entity/Video");
const staticProvider_1 = require("../staticProvider");
const createVideoAsync = (courseId, orderIndex) => __awaiter(void 0, void 0, void 0, function* () {
    yield staticProvider_1.staticProvider
        .ormConnection
        .getRepository(Video_1.Video)
        .insert({
        courseId: courseId,
        orderIndex: orderIndex,
    });
});
exports.createVideoAsync = createVideoAsync;
const setVideoFileId = (videoId, videoFileId) => __awaiter(void 0, void 0, void 0, function* () {
    yield staticProvider_1.staticProvider
        .ormConnection
        .getRepository(Video_1.Video)
        .save({
        id: videoId,
        videoFileId: videoFileId
    });
});
exports.setVideoFileId = setVideoFileId;
const setVideoThumbnailFileId = (videoId, thumbnailFileId) => __awaiter(void 0, void 0, void 0, function* () {
    yield staticProvider_1.staticProvider
        .ormConnection
        .getRepository(Video_1.Video)
        .save({
        id: videoId,
        thumbnailFileId: thumbnailFileId
    });
});
exports.setVideoThumbnailFileId = setVideoThumbnailFileId;
const getVideoByIdAsync = (videoId) => {
    return staticProvider_1.staticProvider
        .ormConnection
        .getRepository(Video_1.Video)
        .createQueryBuilder("v")
        .where("v.id = :videoId", { videoId })
        .leftJoinAndSelect("v.videoFile", "vf")
        .getOneOrFail();
};
exports.getVideoByIdAsync = getVideoByIdAsync;
//# sourceMappingURL=videoService.js.map