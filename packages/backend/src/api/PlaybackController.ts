import { PlaybackService } from '../services/PlaybackService';
import { VideoPlaybackSampleDTO } from '@episto/communication';
import { VideoSeekEventDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { ServiceProvider } from '../startup/serviceDependencyContainer';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class PlaybackController implements XController<PlaybackController> {

    private _playbackService: PlaybackService;

    constructor(serviceProvider: ServiceProvider) {

        this._playbackService = serviceProvider.getService(PlaybackService);
    }

    @XControllerAction(apiRoutes.playback.saveVideoPlaybackSample, { isPost: true })
    saveVideoPlaybackSampleAction(params: ActionParams) {

        const dto = params
            .getBody<VideoPlaybackSampleDTO>(['fromSeconds', 'toSeconds', 'videoVersionId', 'videoPlaybackSessionId']);

        return this._playbackService
            .saveVideoPlaybackSample(params.principalId, dto.data);
    }

    @XControllerAction(apiRoutes.playback.saveVideoSeekEvent, { isPost: true })
    saveVideoSeekEventAction(params: ActionParams) {

        const dto = params
            .getBody<VideoSeekEventDTO>(['fromSeconds', 'toSeconds', 'videoVersionId', 'videoPlaybackSessionId']);

        return this._playbackService
            .saveVideoSeekEventAsync(params.principalId, dto.data);
    }
}