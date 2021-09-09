"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminCoursesAction = void 0;
const authentication_1 = require("../services/authentication");
const helpers_1 = require("../utilities/helpers");
const adminCoursesService_1 = require("../services/adminCoursesService");
const getAdminCoursesAction = (req) => {
    const userId = authentication_1.getUserIdFromRequest(req);
    const dto = helpers_1.withValueOrBadRequest(req.body);
    return adminCoursesService_1.getAdminCoursesAsync(userId, dto);
};
exports.getAdminCoursesAction = getAdminCoursesAction;
//# sourceMappingURL=adminCourses.js.map