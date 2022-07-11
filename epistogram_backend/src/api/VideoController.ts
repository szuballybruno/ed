import { Video } from '../models/entity/video/Video';
import { VideoService } from '../services/VideoService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { Id } from '../shared/types/versionId';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class VideoController {
    private _videoService: VideoService;

    constructor(serviceProvider: ServiceProvider) {

        this._videoService = serviceProvider.getService(VideoService);
    }

    @XControllerAction(apiRoutes.video.uploadVideoFileChunks, { isPost: true, isMultipart: true })
    uploadVideoFileChunksAction = async (params: ActionParams) => {

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

        await this._videoService
            .uploadVideoFileChunksAsync(videoId, chunksCount, chunkIndex, getFile);
    };
}