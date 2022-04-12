import { VideoRatingDTO } from '../shared/dtos/VideoRatingDTO';
import { VideoRatingService } from '../services/VideoRatingService';
import { ActionParams } from '../utilities/helpers';

export class VideoRatingController {

    private _videoRatingService: VideoRatingService;

    constructor(videoRatingService: VideoRatingService) {

        this._videoRatingService = videoRatingService;
    }

    rateVideoDifficultyAction = async (params: ActionParams) => {

        const dto = params
            .getBody<VideoRatingDTO>()
            .data;

        await this._videoRatingService
            .rateVideoDifficultyAsync(params.currentUserId, dto);
    };

    rateVideoExperienceAction = async (params: ActionParams) => {

        const dto = params
            .getBody<VideoRatingDTO>()
            .data;

        await this._videoRatingService
            .rateVideoExperienceAsync(params.currentUserId, dto);
    };

    getVideoRatingAction = async (params: ActionParams) => {

        const videoId = params
            .getQuery<{ videoId: number }>()
            .getValue(x => x.videoId, 'int');

        return await this._videoRatingService
            .getVideoRatingAsync(params.currentUserId, videoId);
    };
} 