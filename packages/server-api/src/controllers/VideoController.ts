import { VideoService } from '@episto/server-services';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { IXGatewayServiceProvider } from '@episto/x-gateway';
import { ActionParams } from '../ActionParams';
import { XControllerAction } from '@episto/x-gateway';
import { Controller } from '../Controller';

export class VideoController implements Controller<VideoController> {
    private _videoService: VideoService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

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