import { Request } from "express";
import { VideoPlaybackSampleDTO } from "../models/shared_models/VideoPlaybackSampleDTO";
import { getUserIdFromRequest } from "../services/authenticationService";
import { getPlayerDataAsync, saveVideoPlaybackSample } from "../services/playerService";
import { getAsyncActionHandler, withValueOrBadRequest } from "../utilities/helpers";

export const saveVideoPlaybackSampleAction = getAsyncActionHandler((req: Request) => {

    const userId = getUserIdFromRequest(req);
    const dto = withValueOrBadRequest<VideoPlaybackSampleDTO>(req.body);

    return saveVideoPlaybackSample(userId, dto);
});

export const getPlayerDataAction = getAsyncActionHandler((req: Request) => {

    const userId = getUserIdFromRequest(req);
    const descriptorCode = withValueOrBadRequest<string>(req.query.descriptorCode);

    return getPlayerDataAsync(userId, descriptorCode);
});