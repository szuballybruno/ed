import { Request } from "express";
import { getUserIdFromRequest } from "../services/authentication";
import { startCourseAsync } from "../services/courseService"
import { getAsyncActionHandler, withValueOrBadRequest } from "../utilities/helpers";

export const startCourseAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const courseId = parseInt(withValueOrBadRequest(req.query.courseId));

    return startCourseAsync(userId, courseId);
});