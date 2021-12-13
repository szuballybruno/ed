import { AnswerQuestionDTO } from "../models/shared_models/AnswerQuestionDTO";
import { VideoPlaybackSampleDTO } from "../models/shared_models/VideoPlaybackSampleDTO";
import { CourseService } from "../services/CourseService";
import { PlayerService } from "../services/playerService";
import { VideoService } from "../services/VideoService";
import { ActionParams, withValueOrBadRequest } from "../utilities/helpers";

export class PlayerController {

    private _courseService: CourseService;
    private _playerService: PlayerService;
    private _videoService: VideoService;

    constructor(courseService: CourseService, playerService: PlayerService, videoService: VideoService) {

        this._courseService = courseService;
        this._playerService = playerService;
        this._videoService = videoService;
    }

    answerVideoQuestionAction = async (params: ActionParams) => {

        const dto = withValueOrBadRequest<AnswerQuestionDTO>(params.req.body);
        const answerIds = withValueOrBadRequest<number[]>(dto.answerIds);
        const questionId = withValueOrBadRequest<number>(dto.questionId, "number");
        const answerSessionId = withValueOrBadRequest<number>(dto.answerSessionId, "number");

        return this._videoService
            .answerVideoQuestionAsync(params.userId, answerSessionId, questionId, answerIds);
    };

    saveVideoPlaybackSampleAction = (params: ActionParams) => {

        const dto = withValueOrBadRequest<VideoPlaybackSampleDTO>(params.req.body);

        return this._playerService.saveVideoPlaybackSample(params.userId, dto);
    };

    getPlayerDataAction = (params: ActionParams) => {

        const descriptorCode = withValueOrBadRequest<string>(params.req.query.descriptorCode);

        return this._playerService.getPlayerDataAsync(params.userId, descriptorCode);
    };

    getCourseItemsAction = async (params: ActionParams) => {

        return this._courseService.getCurrentCourseItemsAsync(params.userId);
    };
}