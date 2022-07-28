import { VideoService } from '../services/VideoService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { Id } from '../shared/types/versionId';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class VideoController implements XController<VideoController> {
    private _videoService: VideoService;

    constructor(serviceProvider: ServiceProvider) {

        this._videoService = serviceProvider.getService(VideoService);
    }

    @XControllerAction(apiRoutes.video.uploadVideoFileChunks, { isPost: true, isMultipart: true })
    uploadVideoFileChunksAction(params: ActionParams) {

        const getFile = () => params.getSingleFile();

        const body = params
            .getBody<{
                videoId: number,
                chunkIndex: number,
                chunksCount: number
            }>();

        const videoId = Id
            .create<'Video'>(body
                .getValue(x => x.videoId, 'int'));

        const chunksCount = body.getValue(x => x.chunksCount, 'int');
        const chunkIndex = body.getValue(x => x.chunkIndex, 'int');

        return this._videoService
            .uploadVideoFileChunksAsync(params.principalId, videoId, chunksCount, chunkIndex, getFile);
    }
}