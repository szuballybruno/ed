import { MapperService } from '../services/MapperService';
import { GlobalConfiguration } from '../services/misc/GlobalConfiguration';
import { ORMConnectionService } from '../services/ORMConnectionService/ORMConnectionService';
import { QuestionService } from '../services/QuestionService';
import { VideoService } from '../services/VideoService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class VideoController {

    constructor(private _videoService: VideoService) {

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

        const videoId = body.getValue(x => x.videoId, 'int');
        const chunksCount = body.getValue(x => x.chunksCount, 'int');
        const chunkIndex = body.getValue(x => x.chunkIndex, 'int');

        await this._videoService
            .uploadVideoFileChunksAsync(videoId, chunksCount, chunkIndex, getFile);
    };
}