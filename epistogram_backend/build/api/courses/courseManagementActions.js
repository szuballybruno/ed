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
exports.getEditedCourseAction = exports.getEditedVideoAction = exports.getEditedCourseAsync = exports.getEditedVideoAsync = exports.getCourseIdFromRequest = exports.getVideoIdFromRequest = void 0;
const staticProvider_1 = require("../../staticProvider");
const Video_1 = require("../../models/entity/Video");
const mappings_1 = require("../../services/mappings");
const Exam_1 = require("../../models/entity/Exam");
const Course_1 = require("../../models/entity/Course");
const getVideoIdFromRequest = (req) => {
    const videoId = req.body.videoId;
    return !!videoId ? videoId : new Error("Cannot get videoId");
};
exports.getVideoIdFromRequest = getVideoIdFromRequest;
const getCourseIdFromRequest = (req) => {
    const courseId = req.body.courseId;
    return !!courseId ? courseId : new Error("Cannot get courseId");
};
exports.getCourseIdFromRequest = getCourseIdFromRequest;
const getEditedVideoAsync = (videoId) => __awaiter(void 0, void 0, void 0, function* () {
    /*const { aggregateAsync } = await useCollection("videos");*/
    const aggregateEditedVideoByVideoId = () => __awaiter(void 0, void 0, void 0, function* () {
        /*const AdminPageEditedVideo = await aggregateAsync([{
            '$match': {
                '_id': {$toObjectId: videoId}
            }
        },{
            '$project': {
                'editedVideoId': 'string',
                'editedVideoTitle': 'string',
                'editedVideoSubTitle': 'string',
                'editedVideoURL': 'string',
                'editedVideoDescription': 'string',
                'editedVideoThumbnailURL': 'string',
                'editedVideoTags': 'TagView',
                'allTags': 'TagView',
            }
        }])

        return AdminPageEditedVideo as AdminPageEditVideoView[];*/
    });
    return aggregateEditedVideoByVideoId();
});
exports.getEditedVideoAsync = getEditedVideoAsync;
const toEditCourseItemsDTO = (course) => {
    const examItems = course
        .exams
        .map(x => mappings_1.toCourseItemDTO(x, false));
    const videoItems = course
        .videos
        .map(x => mappings_1.toCourseItemDTO(x, true));
    const itemsCombined = examItems
        .concat(videoItems);
    const itemsOrdered = itemsCombined
        .orderBy(x => x.orderIndex);
    return itemsOrdered;
};
const getCurrentCourseItem = (courseItemId, courseItemType) => __awaiter(void 0, void 0, void 0, function* () {
    if (courseItemType == "video") {
        // get player data
        const video = yield staticProvider_1.staticProvider
            .ormConnection
            .getRepository(Video_1.Video)
            .findOneOrFail(courseItemId);
        return video;
    }
    else {
        // get player data
        const exam = yield staticProvider_1.staticProvider
            .ormConnection
            .getRepository(Exam_1.Exam)
            .findOneOrFail(courseItemId);
        return exam;
    }
});
const getEditedCourseAsync = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield staticProvider_1.staticProvider
        .ormConnection
        .getRepository(Course_1.Course)
        .createQueryBuilder("course")
        .where("course.id = :courseId", { courseId: courseId })
        //.leftJoinAndSelect("course.tags", "tags")
        //.leftJoinAndSelect("user.currentVideo", "video")
        //.leftJoinAndSelect("user.currentExam", "exam")
        .leftJoinAndSelect("course.organization", "organization")
        .leftJoinAndSelect("course.exams", "exams")
        .leftJoinAndSelect("course.videos", "videos")
        .getOneOrFail();
    const courseItems = toEditCourseItemsDTO(course);
    // const currentCourse = user.currentCourse;
    // const currentVideo = user.currentVideo;
    // const currentExam = user.currentExam;
    //
    // const videoDTOs = currentCourse
    //     ?.videos
    //     ?.map((course: Video) => toVideoDTO(course));
    //
    // const examDTOs = currentCourse
    //     ?.videos
    //     ?.map((course: Exam) => toExamDTO(course));
    //
    // const recommendedCourseDTOs = [] as CourseShortDTO[];
    // const randomQuestion = getReandomQuestion();
    // const currntTasks = getCurrentTasks();
    // const developmentChartData = getDevelopmentChart();
    const AdminPageEditCourseDTO = {
        courseId: course.id,
        title: course.title,
        category: course.category,
        courseGroup: course.courseGroup,
        permissionLevel: course.permissionLevel,
        colorOne: course.colorOne,
        colorTwo: course.colorTwo,
        courseOrganizations: [course.organization],
        allOrganizations: [{
                id: ""
            }],
        /*courseTags: [{
            id: course.tags.id
        }]*/
        courseItems: courseItems
        // tipOfTheDay: tipOfTheDay,
        // currentCourseId: currentCourse?.id ?? null,
        //
        // currentCourseVideos: videoDTOs ?? null,
        // currentCourseExams: examDTOs ?? null,
        //
        //currentCourseVideo: currentVideo ? toVideoDTO(currentVideo) : null,
        // currentCourseExam: currentExam ? toExamDTO(currentExam) : null,
        //
        // recommendedCourses: recommendedCourseDTOs,
        // testQuestionDTO: randomQuestion,
        // currentTasks: currntTasks,
        // developmentChartData: developmentChartData
    };
    return AdminPageEditCourseDTO;
});
exports.getEditedCourseAsync = getEditedCourseAsync;
const getEditedVideoAction = (req) => __awaiter(void 0, void 0, void 0, function* () {
    //needs a getVideoIdFromRequest
    const videoId = exports.getVideoIdFromRequest(req);
    //needs a getEditedVideoAsync
    return yield exports.getEditedVideoAsync(videoId);
});
exports.getEditedVideoAction = getEditedVideoAction;
const getEditedCourseAction = (req) => __awaiter(void 0, void 0, void 0, function* () {
    //needs a getCourseIdFromRequest
    const videoId = exports.getCourseIdFromRequest(req);
    //needs a getEditedVideoAsync
    return yield exports.getEditedCourseAsync(videoId);
});
exports.getEditedCourseAction = getEditedCourseAction;
//# sourceMappingURL=courseManagementActions.js.map