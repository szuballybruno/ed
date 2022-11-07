import { PlaylistService } from '../services/PlaylistService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ServiceProvider } from '../startup/serviceDependencyContainer';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class PlaylistController {

    private _playlistService: PlaylistService;

    constructor(serviceProvider: ServiceProvider) {

        this._playlistService = serviceProvider
            .getService(PlaylistService);
    }

    @XControllerAction(apiRoutes.playlist.getPlaylist)
    getCurrentCoursePlaylistModulesAction = async (params: ActionParams) => {

        return this._playlistService
            .getCurrentCoursePlaylistModulesAsync(params.principalId);
    };
}