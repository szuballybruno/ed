import { VideoRatingDTO } from '../shared/dtos/VideoRatingDTO';
import { VideoRatingService } from '../services/VideoRatingService';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { apiRoutes } from '../shared/types/apiRoutes';

export class VideoRatingController {

    private _videoRatingService: VideoRatingService;

    constructor(videoRatingService: VideoRatingService) {

        this._videoRatingService = videoRatingService;
    }

    @XControllerAction(apiRoutes.videoRating.rateVideoDifficulty, { isPost: true })
    rateVideoDifficultyAction = async (params: ActionParams) => {

        const dto = params
            .getBody<VideoRatingDTO>()
            .data;

        await this._videoRatingService
            .rateVideoDifficultyAsync(params.principalId, dto);
    };

    @XControllerAction(apiRoutes.videoRating.rateVideoExperience, { isPost: true })
    rateVideoExperienceAction = async (params: ActionParams) => {

        const dto = params
            .getBody<VideoRatingDTO>()
            .data;

        await this._videoRatingService
            .rateVideoExperienceAsync(params.principalId, dto);
    };

    @XControllerAction(apiRoutes.videoRating.getVideoRating)
    getVideoRatingAction = async (params: ActionParams) => {

        const videoId = params
            .getQuery<{ videoId: number }>()
            .getValue(x => x.videoId, 'int');

        return await this._videoRatingService
            .getVideoRatingAsync(params.principalId, videoId);
    };
} 