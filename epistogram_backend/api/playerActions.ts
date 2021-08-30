import { Request } from "express";
import { GetPlayerDataDTO } from "../models/shared_models/GetPlayerDataDTO";
import { getUserIdFromRequest } from "../services/authentication";
import { getPlayerDataAsync } from "../services/playerService";
import { getAsyncActionHandler, withValueOrBadRequest } from "../utilities/helpers";

export const getPlayerDataAction = getAsyncActionHandler((req: Request) => {

    const userId = getUserIdFromRequest(req);
    const dto = withValueOrBadRequest(req.body) as GetPlayerDataDTO;
    const courseItemId = withValueOrBadRequest(dto.courseItemId);
    const courseItemType = withValueOrBadRequest(dto.courseItemType);

    return getPlayerDataAsync(userId, courseItemId, courseItemType);
});