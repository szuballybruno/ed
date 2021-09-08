import { Request } from "express";
import { GetUserCoursesDTO } from "../models/shared_models/GetUserCoursesDTO";
import { getUserIdFromRequest } from "../services/authentication";
import { getUserCoursesAsync } from "../services/userCoursesService";
import { getAsyncActionHandler, withValueOrBadRequest } from "../utilities/helpers";

export const getUserCoursesAction = getAsyncActionHandler((req: Request) => {

    const userId = getUserIdFromRequest(req);
    const dto = withValueOrBadRequest(req.body) as GetUserCoursesDTO;

    return getUserCoursesAsync(userId, dto);
});