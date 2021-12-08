import { AnswerQuestionDTO } from "../models/shared_models/AnswerQuestionDTO";
import { VideoPlaybackSampleDTO } from "../models/shared_models/VideoPlaybackSampleDTO";
import { getCurrentCourseItemsAsync } from "../services/courseService";
import { getPlayerDataAsync, saveVideoPlaybackSample } from "../services/playerService";
import { answerVideoQuestionAsync } from "../services/videoService";
import { ActionParams, withValueOrBadRequest } from "../utilities/helpers";

export class PlayerController {

    constructor() {

    }

    answerVideoQuestionAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<AnswerQuestionDTO>(params.req.body);
        const answerIds = withValueOrBadRequest<number[]>(dto.answerIds);
        const questionId = withValueOrBadRequest<number>(dto.questionId, "number");
        const answerSessionId = withValueOrBadRequest<number>(dto.answerSessionId, "number");

        return answerVideoQuestionAsync(params.userId, answerSessionId, questionId, answerIds);
    };

    saveVideoPlaybackSampleAction = (params: ActionParams) => {

        const dto = withValueOrBadRequest<VideoPlaybackSampleDTO>(params.req.body);

        return saveVideoPlaybackSample(params.userId, dto);
    };

    getPlayerDataAction = (params: ActionParams) => {

        const descriptorCode = withValueOrBadRequest<string>(params.req.query.descriptorCode);

        return getPlayerDataAsync(params.userId, descriptorCode);
    };

    getCourseItemsAction = async (params: ActionParams) => {

        return getCurrentCourseItemsAsync(params.userId);
    };
}