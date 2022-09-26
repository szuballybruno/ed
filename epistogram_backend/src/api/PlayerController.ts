import { CourseService } from '../services/CourseService';
import { PlayerService } from '../services/PlayerService';
import { VideoService } from '../services/VideoService';
import { AnswerQuestionDTO } from '../shared/dtos/AnswerQuestionDTO';
import { AnswerResultDTO } from '../shared/dtos/AnswerResultDTO';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class PlayerController implements XController<PlayerController> {

    private _courseService: CourseService;
    private _playerService: PlayerService;
    private _videoService: VideoService;

    constructor(serviceProvider: ServiceProvider) {

        this._courseService = serviceProvider.getService(CourseService);
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
