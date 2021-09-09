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
exports.getPlayerDataAsync = exports.getCurrentVideoAsync = void 0;
const Course_1 = require("../models/entity/Course");
const Exam_1 = require("../models/entity/Exam");
const User_1 = require("../models/entity/User");
const staticProvider_1 = require("../staticProvider");
const helpers_1 = require("../utilities/helpers");
const mappings_1 = require("./mappings");
const videoService_1 = require("./videoService");
const getCurrentVideoAsync = (userId, videoId) => __awaiter(void 0, void 0, void 0, function* () {
    // return video
    const user = yield staticProvider_1.staticProvider
        .ormConnection
        .getRepository(User_1.User)
        .createQueryBuilder("user")
        .where("user.id = :userId", { userId: userId })
        .leftJoinAndSelect("user.currentVideo", "video")
        .getOneOrFail();
    const currentVideo = user.currentVideo;
    return mappings_1.toVideoDTO(currentVideo);
});
exports.getCurrentVideoAsync = getCurrentVideoAsync;
const getPlayerDataAsync = (userId, courseItemId, courseItemType) => __awaiter(void 0, void 0, void 0, function* () {
    const courseItem = yield setAndGetCurrentCourseItem(userId, courseItemId, courseItemType);
    const course = yield staticProvider_1.staticProvider
        .ormConnection
        .getRepository(Course_1.Course)
        .createQueryBuilder("c")
        .where("c.id = :courseId", { courseId: courseItem.courseId })
        .leftJoinAndSelect("c.videos", "v")
        .leftJoinAndSelect("c.exams", "e")
        .getOneOrFail();
    return mappings_1.toPlayerDataDTO(course, courseItemType == "video" ? courseItem : null, courseItemType == "exam" ? courseItem : null);
});
exports.getPlayerDataAsync = getPlayerDataAsync;
const setAndGetCurrentCourseItem = (userId, courseItemId, courseItemType) => __awaiter(void 0, void 0, void 0, function* () {
    if (courseItemType == "video") {
        const videoId = courseItemId;
        // set current video 
        const video = yield videoService_1.getVideoByIdAsync(videoId);
        if (!video)
            throw new helpers_1.TypedError("Video not found by id: " + videoId, "courseItemNotFound");
        // set current video id
        yield staticProvider_1.staticProvider
            .ormConnection
            .getRepository(User_1.User)
            .save({
            id: userId,
            currentVideoId: videoId
        });
        return video;
    }
    else {
        // set current exam
        yield setCurrentExamAsync(userId, courseItemId);
        // get player data
        const exam = yield staticProvider_1.staticProvider
            .ormConnection
            .getRepository(Exam_1.Exam)
            .findOneOrFail(courseItemId);
        return exam;
    }
});
const setCurrentExamAsync = (userId, examId) => __awaiter(void 0, void 0, void 0, function* () {
    const exam = yield getExamByIdAsync(examId);
    if (!exam)
        throw new helpers_1.TypedError("Exam not found by id: " + examId, "courseItemNotFound");
    return yield staticProvider_1.staticProvider
        .ormConnection
        .getRepository(User_1.User)
        .save({
        id: userId,
        currentExamId: examId
    });
});
const getExamByIdAsync = (examId) => {
    return staticProvider_1.staticProvider
        .ormConnection
        .getRepository(Exam_1.Exam)
        .findOne(examId);
};
//# sourceMappingURL=playerService.js.map