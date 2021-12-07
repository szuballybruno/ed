import { VideoPlaybackSampleDTO } from "../models/shared_models/VideoPlaybackSampleDTO";
import { getCurrentCourseItemsAsync } from "../services/courseService";
import { getPlayerDataAsync, saveVideoPlaybackSample } from "../services/playerService";
import { ActionParams, withValueOrBadRequest } from "../utilities/helpers";

export const saveVideoPlaybackSampleAction = (params: ActionParams) => {

    const dto = withValueOrBadRequest<VideoPlaybackSampleDTO>(params.req.body);

    return saveVideoPlaybackSample(params.userId, dto);
};

export const getPlayerDataAction = (params: ActionParams) => {

    const descriptorCode = withValueOrBadRequest<string>(params.req.query.descriptorCode);

    return getPlayerDataAsync(params.userId, descriptorCode);
};

export const getCourseItemsAction = async (params: ActionParams) => {

    return getCurrentCourseItemsAsync(params.userId);
};