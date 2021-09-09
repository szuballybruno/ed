"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserCoursesAction = void 0;
const authentication_1 = require("../services/authentication");
const userCoursesService_1 = require("../services/userCoursesService");
const helpers_1 = require("../utilities/helpers");
exports.getUserCoursesAction = helpers_1.getAsyncActionHandler((req) => {
    const userId = authentication_1.getUserIdFromRequest(req);
    const dto = helpers_1.withValueOrBadRequest(req.body);
    return userCoursesService_1.getUserCoursesAsync(userId, dto);
});
//# sourceMappingURL=userCourses.js.map