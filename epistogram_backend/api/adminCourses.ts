import { Request } from "express";
import { GetUserCoursesDTO } from "../models/shared_models/GetUserCoursesDTO";
import { getUserIdFromRequest } from "../services/authentication";
import { withValueOrBadRequest } from "../utilities/helpers";
import {getAdminCoursesAsync} from "../services/adminCoursesService";

export const getAdminCoursesAction = (req: Request) => {

    const userId = getUserIdFromRequest(req);
    const dto = withValueOrBadRequest(req.body) as GetUserCoursesDTO;

    return getAdminCoursesAsync(userId, dto);
}