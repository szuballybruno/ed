import { VideoRatingDTO } from '@episto/communication';
import { VideoRatingService } from '@episto/server-services';
import { ActionParams } from '../ActionParams';
import { XControllerAction } from '@episto/x-gateway';
import { apiRoutes } from '@episto/communication';
import { IXGatewayServiceProvider } from '@episto/x-gateway';
import { Id } from '@episto/commontypes';
import { Controller } from '../Controller';

export class VideoRatingController implements Controller<VideoRatingController> {

    private _videoRatingService: VideoRatingService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

        this._videoRatingService = serviceProvider.getService(VideoRatingService);
    }

    @XControllerAction(apiRoutes.videoRating.rateVideoDifficulty, { isPost: true })
    rateVideoDifficultyAction(params: ActionParams) {

        const dto = params
            .getBody<VideoRatingDTO>()
            .data;

        return this._videoRatingService
            .rateVideoDifficultyAsync(params.principalId, dto);
    }

    @XControllerAction(apiRoutes.videoRating.rateVideoExperience, { isPost: true })
    rateVideoExperienceAction(params: ActionParams) {

        const dto = params
            .getBody<VideoRatingDTO>()
            .data;

        return this._videoRatingService
            .rateVideoExperienceAsync(params.principalId, dto);
    }

    @XControllerAction(apiRoutes.videoRating.getVideoRating)
    getVideoRatingAction(params: ActionParams) {

        const videoVersionId = Id
            .create<'VideoVersion'>(params
                .getQuery<{ videoVersionId: number }>()
                .getValue(x => x.videoVersionId, 'int'));

        return this._videoRatingService
            .getVideoRatingAsync(params.principalId, videoVersionId);
    }
} 