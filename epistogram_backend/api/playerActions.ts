import { VideoPlaybackSampleDTO } from "../models/shared_models/VideoPlaybackSampleDTO";
import { getCurrentCourseItemsAsync } from "../services/courseService";
import { getPlayerDataAsync, saveVideoPlaybackSample } from "../services/playerService";
import { ActionParamsType, withValueOrBadRequest } from "../utilities/helpers";

export const saveVideoPlaybackSampleAction = (params: ActionParamsType) => {

    const dto = withValueOrBadRequest<VideoPlaybackSampleDTO>(params.req.body);

    return saveVideoPlaybackSample(params.userId, dto);
};

export const getPlayerDataAction = (params: ActionParamsType) => {

    const descriptorCode = withValueOrBadRequest<string>(params.req.query.descriptorCode);

    return getPlayerDataAsync(params.userId, descriptorCode);
};

export const getCourseItemsAction = async (params: ActionParamsType) => {

    return getCurrentCourseItemsAsync(params.userId);
};