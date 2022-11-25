import { VideoService } from '@episto/server-services';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { ServiceProvider } from '../startup/ServiceProvider';
import { ActionParams } from '../XTurboExpress/ActionParams';
import { XControllerAction } from '../XTurboExpress/XTurboExpressDecorators';
import { XController } from '../XTurboExpress/XTurboExpressTypes';

export class VideoController implements XController<VideoController> {
    private _videoService: VideoService;

    constructor(serviceProvider: ServiceProvider) {

        this._videoService = serviceProvider.getService(VideoService);
    }

    @XControllerAction(apiRoutes.video.uploadVideoFileChunks, { isPost: true })
    uploadVideoFileChunksAction(params: ActionParams) {

        const getFile = () => params
            .getSingleFile();

        const body = params
            .getBody<{
                videoVersionId: Id<'VideoVersion'>,
                chunkIndex: number,
                chunksCount: number
            }>();

        const videoVersionId = body
            .getValue(x => x.videoVersionId, 'int');

        const chunksCount = body
            .getValue(x => x.chunksCount, 'int');

        const chunkIndex = body
            .getValue(x => x.chunkIndex, 'int');

        return this
            ._videoService
            .uploadVideoFileChunksAsync({
                principalId: params.principalId,
                videoVersionId,
                chunksCount,
                chunkIndex,
                getFile
            });
    }
}