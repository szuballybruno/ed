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
exports.getAdminCoursesAsync = void 0;
const mappings_1 = require("./mappings");
const Course_1 = require("../models/entity/Course");
const staticProvider_1 = require("../staticProvider");
const getAdminCoursesAsync = (userId, dto) => __awaiter(void 0, void 0, void 0, function* () {
    const aggregatedCourses = yield staticProvider_1.staticProvider
        .ormConnection
        .getRepository(Course_1.Course)
        .find();
    return aggregatedCourses.map(course => mappings_1.toCourseAdminDTO(course));
});
exports.getAdminCoursesAsync = getAdminCoursesAsync;
//# sourceMappingURL=adminCoursesService.js.map