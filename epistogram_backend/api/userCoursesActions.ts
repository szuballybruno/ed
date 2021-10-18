import { Request } from "express";
import { GetUserCoursesDTO } from "../models/shared_models/GetUserCoursesDTO";
import { getUserIdFromRequest } from "../services/authenticationService";
import { getUserCoursesAsync } from "../services/userCoursesService";
import { getAsyncActionHandler, withValueOrBadRequest } from "../utilities/helpers";

export const getUserCoursesAction = getAsyncActionHandler((req: Request) => {

    const userId = getUserIdFromRequest(req);
    const dto = withValueOrBadRequest<GetUserCoursesDTO>(req.body);

    return getUserCoursesAsync(userId, dto);
});