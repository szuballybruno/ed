import { AnswerQuestionDTO, AnswerResultDTO, apiRoutes } from '@episto/communication';
import { PlayerService } from '@episto/server-services';
import { VideoService } from '@episto/server-services';
import { IXGatewayServiceProvider } from '@episto/x-gateway';
import { ActionParams } from '../ActionParams';
import { XControllerAction } from '@episto/x-gateway';
import { Controller } from '../Controller';

export class PlayerController implements Controller<PlayerController> {

    private _playerService: PlayerService;
    private _videoService: VideoService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

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
