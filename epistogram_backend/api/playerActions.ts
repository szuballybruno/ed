import { Request } from "express";
import { VideoPlaybackSampleDTO } from "../models/shared_models/VideoPlaybackSampleDTO";
import { getUserIdFromRequest } from "../services/authentication";
import { getPlayerDataAsync } from "../services/playerService";
import { saveVideoPlaybackSample } from "../services/videoService";
import { getAsyncActionHandler, withValueOrBadRequest } from "../utilities/helpers";

export const saveVideoPlaybackSampleAction = getAsyncActionHandler((req: Request) => {

    const userId = getUserIdFromRequest(req);
    const dto = withValueOrBadRequest(req.body) as VideoPlaybackSampleDTO;

    return saveVideoPlaybackSample(userId, dto);
});

export const getPlayerDataAction = getAsyncActionHandler((req: Request) => {

    const userId = getUserIdFromRequest(req);
    const descriptorCode = withValueOrBadRequest(req.query.descriptorCode);

    return getPlayerDataAsync(userId, descriptorCode);
});