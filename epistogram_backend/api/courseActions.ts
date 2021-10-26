import { Request } from "express";
import { GetUserCoursesDTO } from "../models/shared_models/GetUserCoursesDTO";
import { IdResultDTO } from "../models/shared_models/IdResultDTO";
import { CourseModeType } from "../models/shared_models/types/sharedTypes";
import { getUserIdFromRequest } from "../services/authenticationService";
import { getUserCoursesDataAsync, setCourseTypeAsync, startCourseAsync } from "../services/courseService"
import { getAvailableCoursesAsync } from "../services/userCoursesService";
import { ActionParamsType, getAsyncActionHandler, withValueOrBadRequest } from "../utilities/helpers";

export const startCourseAction = async (params: ActionParamsType) => {

    const courseId = withValueOrBadRequest<IdResultDTO>(params.req.body).id;

    return startCourseAsync(params.userId, courseId);
};

export const getAvailableCoursesAction = async (params: ActionParamsType) => {

    const dto = withValueOrBadRequest<GetUserCoursesDTO>(params.req.body);

    return getAvailableCoursesAsync(params.userId, dto);
};

export const setCourseTypeAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const courseId = withValueOrBadRequest<number>(req.query.courseId, "number");
    const modeType = withValueOrBadRequest<CourseModeType>(req.query.mode);

    return setCourseTypeAsync(userId, courseId, modeType);
});

export const getUserCoursesDataAction = getAsyncActionHandler(async (req: Request) => {

    const userId = getUserIdFromRequest(req);

    return getUserCoursesDataAsync(userId);
});