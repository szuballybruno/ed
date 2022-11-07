import { VideoRatingDTO } from '../shared/dtos/VideoRatingDTO';
import { VideoRatingService } from '../services/VideoRatingService';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ServiceProvider } from '../startup/serviceDependencyContainer';
import { Id } from '../shared/types/versionId';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class VideoRatingController implements XController<VideoRatingController> {

    private _videoRatingService: VideoRatingService;

    constructor(serviceProvider: ServiceProvider) {

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