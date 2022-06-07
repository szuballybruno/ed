import { PlaybackService } from '../services/PlaybackService';
import { VideoPlaybackSampleDTO } from '../shared/dtos/playback/VideoPlaybackSampleDTO';
import { VideoSeekEventDTO } from '../shared/dtos/playback/VideoSeekEventDTO';
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
            .getBody<VideoPlaybackSampleDTO>(['fromSeconds', 'toSeconds', 'videoItemCode', 'videoPlaybackSessionId']);

        return this._playbackService
            .saveVideoPlaybackSample(params.principalId, dto.data);
    };

    @XControllerAction(apiRoutes.playback.saveVideoSeekEvent, { isPost: true })
    saveVideoSeekEventAction = (params: ActionParams) => {

        const dto = params
            .getBody<VideoSeekEventDTO>(['fromSeconds', 'toSeconds', 'videoItemCode', 'videoPlaybackSessionId']);

        return this._playbackService
            .saveVideoSeekEventAsync(params.principalId, dto.data);
    };
}