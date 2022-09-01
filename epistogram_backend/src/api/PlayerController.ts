import {CourseService} from '../services/CourseService';
import {PlayerService} from '../services/PlayerService';
import {VideoService} from '../services/VideoService';
import {ActionParams} from '../utilities/XTurboExpress/ActionParams';
import {XControllerAction} from '../utilities/XTurboExpress/XTurboExpressDecorators';
import {apiRoutes} from '../shared/types/apiRoutes';
import {ServiceProvider} from '../startup/servicesDI';
import {Id} from '../shared/types/versionId';
import {XController} from '../utilities/XTurboExpress/XTurboExpressTypes';

export class PlayerController implements XController<PlayerController> {

    private _courseService: CourseService;
    private _playerService: PlayerService;
    private _videoService: VideoService;

    constructor(serviceProvider: ServiceProvider) {

        this._courseService = serviceProvider.getService(CourseService);
        this._playerService = serviceProvider.getService(PlayerService);
        this._videoService = serviceProvider.getService(VideoService);
    }

    @XControllerAction(apiRoutes.player.answerVideoQuestion, {isPost: true})
    answerVideoQuestionAction(params: ActionParams) {

        const dto = params.getBody<any>();

        //TODO: There is no answerversionid yet
        const answerVersionIds = dto
            .getValue(x => x.answerVersionIds, 'int[]');

        const answerVersionIdsAsIdType = answerVersionIds
            .map(x => Id.create<'AnswerVersion'>(x));

        const questionVersionId = Id
            .create<'QuestionVersion'>(dto
                .getValue(x => x.questionVersionId, 'int'));

        const answerSessionId = Id
            .create<'AnswerSession'>(dto
                .getValue(x => x.answerSessionId, 'int'));

        const elapsedSeconds = dto.getValue(x => x.elapsedSeconds, 'float');

        return this._videoService
            .answerVideoQuestionAsync(params.principalId, answerSessionId, questionVersionId, answerVersionIdsAsIdType, elapsedSeconds);
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
