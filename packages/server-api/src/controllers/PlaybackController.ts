import { PlaybackService } from '@episto/server-services';
import { VideoPlaybackSampleDTO } from '@episto/communication';
import { VideoSeekEventDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { IXGatewayServiceProvider } from '@thinkhub/x-gateway';
import { ActionParams } from '../helpers/ActionParams';
import { XControllerAction } from '@thinkhub/x-gateway';
import { IController } from '../interfaces/IController';

export class PlaybackController implements IController<PlaybackController> {

    private _playbackService: PlaybackService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

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