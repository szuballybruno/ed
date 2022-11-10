import { AnswerQuestionDTO, AnswerResultDTO, apiRoutes } from '@episto/communication';
import { PlayerService } from '../services/PlayerService';
import { VideoService } from '../services/VideoService';
import { ServiceProvider } from '../startup/serviceDependencyContainer';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class PlayerController implements XController<PlayerController> {

    private _playerService: PlayerService;
    private _videoService: VideoService;

    constructor(serviceProvider: ServiceProvider) {

        this._playerService = serviceProvider.getService(PlayerService);
        this._videoService = serviceProvider.getService(VideoService);
    }

    @XControllerAction(apiRoutes.player.answerVideoQuestion, { isPost: true })
    answerVideoQuestionAction(params: ActionParams): Promise<AnswerResultDTO> {

        const dto = params
            .getBody<AnswerQuestionDTO>(['answerSessionId', 'givenAnswer'])
            .data;

        return this._videoService
            .answerVideoQuestionAsync(params.principalId, dto);
    }

    @XControllerAction(apiRoutes.player.getPlayerData)
    getPlayerDataAction(params: ActionParams) {

        const descriptorCode = params
            .getQuery()
            .getValue(x => x.descriptorCode, 'string');

        return this._playerService
            .getPlayerDataAsync(params.principalId, descriptorCode);
    }
}
