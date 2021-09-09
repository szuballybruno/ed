"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCourseCoverFileAction = exports.uploadAvatarFileAction = exports.uploadVideoThumbnailFileAction = exports.uploadVideoFileAction = void 0;
const authentication_1 = require("../services/authentication");
const fileService_1 = require("../services/fileService");
const helpers_1 = require("../utilities/helpers");
exports.uploadVideoFileAction = helpers_1.getAsyncActionHandler((req) => {
    var _a;
    const file = helpers_1.withValueOrBadRequest((_a = req.files) === null || _a === void 0 ? void 0 : _a.file);
    const videoId = parseInt(helpers_1.withValueOrBadRequest(req.body.videoId));
    return fileService_1.uploadVideoFileAsync(videoId, file);
});
exports.uploadVideoThumbnailFileAction = helpers_1.getAsyncActionHandler((req) => {
    var _a;
    const file = helpers_1.withValueOrBadRequest((_a = req.files) === null || _a === void 0 ? void 0 : _a.file);
    const videoId = parseInt(helpers_1.withValueOrBadRequest(req.body.videoId));
    return fileService_1.uploadVideoThumbnailFileAsync(videoId, file);
});
exports.uploadAvatarFileAction = helpers_1.getAsyncActionHandler((req) => {
    var _a;
    const file = helpers_1.withValueOrBadRequest((_a = req.files) === null || _a === void 0 ? void 0 : _a.file);
    const userId = authentication_1.getUserIdFromRequest(req);
    return fileService_1.uploadAvatarFileAsync(userId, file);
});
exports.uploadCourseCoverFileAction = helpers_1.getAsyncActionHandler((req) => {
    var _a;
    const file = helpers_1.withValueOrBadRequest((_a = req.files) === null || _a === void 0 ? void 0 : _a.file);
    const courseId = parseInt(helpers_1.withValueOrBadRequest(req.body.courseId));
    return fileService_1.uploadCourseCoverFileAsync(courseId, file);
});
//# sourceMappingURL=fileActions.js.map