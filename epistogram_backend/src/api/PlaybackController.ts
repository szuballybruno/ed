import { PlaybackService } from '../services/PlaybackService';
import { VideoPlaybackSampleDTO } from '../shared/dtos/VideoPlaybackSampleDTO';
import { ActionParams } from "../utilities/ActionParams";

export class PlaybackController {

    private _playbackService: PlaybackService;

    constructor(playbackService: PlaybackService) {

        this._playbackService = playbackService;
    }

    saveVideoPlaybackSampleAction = (params: ActionParams) => {

        const dto = params
            .getBody<VideoPlaybackSampleDTO>();

        return this._playbackService
            .saveVideoPlaybackSample(params.currentUserId, dto.data);
    };
}