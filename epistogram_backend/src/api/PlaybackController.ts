import { PlaybackService } from '../services/PlaybackService';
import { VideoPlaybackSampleDTO } from '../shared/dtos/VideoPlaybackSampleDTO';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class PlaybackController {

    private _playbackService: PlaybackService;

    constructor(playbackService: PlaybackService) {

        this._playbackService = playbackService;
    }

    @XControllerAction(apiRoutes.playback.saveVideoPlaybackSample, { isPost: true })
    saveVideoPlaybackSampleAction = (params: ActionParams) => {

        const dto = params
            .getBody<VideoPlaybackSampleDTO>();

        return this._playbackService
            .saveVideoPlaybackSample(params.principalId, dto.data);
    };
}