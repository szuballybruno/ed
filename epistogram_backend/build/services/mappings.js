"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCourseAdminDTO = exports.toAnswerDTO = exports.toQuestionDTO = exports.toOrganizationDTO = exports.toCourseShortDTO = exports.toCourseItemDTO = exports.toPlayerDataDTO = exports.toExamDTO = exports.toVideoDTO = exports.toTaskDTO = exports.toQuestionAnswerDTO = exports.toAdminPageUserDTO = exports.toUserDTO = void 0;
const staticProvider_1 = require("../staticProvider");
const helpers_1 = require("../utilities/helpers");
const storageService_1 = require("./storageService");
const toUserDTO = (user) => {
    var _a;
    return {
        userId: user.id,
        organizationId: user.organizationId,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        jobTitle: user.jobTitle,
        isActive: user.isActive,
        email: user.email,
        phoneNumber: user.phoneNumber,
        name: `${user.lastName} ${user.firstName}`,
        avatarUrl: storageService_1.getStorageFileUrl((_a = user.avatarFile) === null || _a === void 0 ? void 0 : _a.filePath)
    };
};
exports.toUserDTO = toUserDTO;
const toAdminPageUserDTO = (user) => {
    const userDTO = exports.toUserDTO(user);
    helpers_1.navPropNotNull(user.organization);
    return Object.assign(Object.assign({}, userDTO), { organizationName: user.organization.name, tasks: user.tasks.map(x => exports.toTaskDTO(x)) });
};
exports.toAdminPageUserDTO = toAdminPageUserDTO;
const toQuestionAnswerDTO = (questionAnswer) => {
    return {
        answerId: questionAnswer.answerId,
        questionId: questionAnswer.questionId,
        userId: questionAnswer.userId
    };
};
exports.toQuestionAnswerDTO = toQuestionAnswerDTO;
const toTaskDTO = (task) => {
    return {
        text: task.name,
        dueDate: task.dueData.toString(),
        objective: task.objective
    };
};
exports.toTaskDTO = toTaskDTO;
const toVideoDTO = (video) => {
    return {
        id: video.id,
        subTitle: video.subtitle,
        title: video.title,
        description: video.description,
        thumbnailUrl: "",
        url: video.videoFile ? storageService_1.getStorageFileUrl(video.videoFile.filePath) : null,
    };
};
exports.toVideoDTO = toVideoDTO;
const toExamDTO = (exam) => {
    return {
        id: exam.id,
        subTitle: exam.subtitle,
        title: exam.title,
        thumbnailUrl: exam.thumbnailUrl
    };
};
exports.toExamDTO = toExamDTO;
const toPlayerDataDTO = (course, video, exam) => {
    const examItems = course
        .exams
        .map(x => exports.toCourseItemDTO(x, false));
    const videoItems = course
        .videos
        .map(x => exports.toCourseItemDTO(x, true));
    const itemsCombined = examItems
        .concat(videoItems);
    const itemsOrdered = itemsCombined
        .orderBy(x => x.orderIndex);
    return {
        courseItems: itemsOrdered,
        video: video ? exports.toVideoDTO(video) : null,
        exam: exam ? exports.toExamDTO(exam) : null
    };
};
exports.toPlayerDataDTO = toPlayerDataDTO;
const toCourseItemDTO = (item, isVideo) => {
    if (isVideo) {
        const video = item;
        return {
            id: video.id,
            subTitle: video.subtitle,
            thumbnailUrl: "",
            title: video.title,
            type: "video",
            orderIndex: video.orderIndex
        };
    }
    else {
        const exam = item;
        return {
            id: exam.id,
            subTitle: exam.subtitle,
            thumbnailUrl: exam.thumbnailUrl,
            title: exam.title,
            type: "exam",
            orderIndex: exam.orderIndex
        };
    }
};
exports.toCourseItemDTO = toCourseItemDTO;
const toCourseShortDTO = (course) => {
    helpers_1.navPropNotNull(course.videos);
    helpers_1.navPropNotNull(course.exams);
    const thumbnailImageURL = staticProvider_1.staticProvider.globalConfig.misc.assetStoreUrl + `/courses/${course.id}.png`;
    return {
        courseId: course.id,
        title: course.title,
        category: course.category,
        firstVideoId: course.videos.length != 0 ? course.videos[0].id : null,
        teacherName: "Mr. Teacher Name",
        thumbnailImageURL: thumbnailImageURL
    };
};
exports.toCourseShortDTO = toCourseShortDTO;
const toOrganizationDTO = (org) => {
    return {
        id: org.id,
        name: org.name
    };
};
exports.toOrganizationDTO = toOrganizationDTO;
const toQuestionDTO = (q) => {
    helpers_1.navPropNotNull(q.answers);
    return {
        questionId: q.id,
        questionText: q.questionText,
        imageUrl: q.imageUrl,
        answers: q.answers
            .map(x => exports.toAnswerDTO(x))
    };
};
exports.toQuestionDTO = toQuestionDTO;
const toAnswerDTO = (a) => {
    return {
        answerId: a.id,
        answerText: a.text
    };
};
exports.toAnswerDTO = toAnswerDTO;
const toCourseAdminDTO = (course) => {
    return {
        title: course.title,
        category: course.category,
        courseId: course.id,
        teacherName: "Mr. Teacher Name",
        videosCount: 0,
        thumbnailImageURL: staticProvider_1.staticProvider.globalConfig.misc.assetStoreUrl + `/courses/${course.id}.png`
    };
};
exports.toCourseAdminDTO = toCourseAdminDTO;
//# sourceMappingURL=mappings.js.map