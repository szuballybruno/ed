import { TempomatService } from '@episto/server-services';
import { apiRoutes } from '@episto/communication';
import { TempomatModeType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { IXGatewayServiceProvider } from '@episto/x-gateway';
import { ActionParams } from '../helpers/ActionParams';
import { XControllerAction } from '@episto/x-gateway';
import { IController } from '../interfaces/IController';

export class TempomatController implements IController<TempomatController> {

    private _tempomatService: TempomatService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

        this._tempomatService = serviceProvider.getService(TempomatService);
    }

    @XControllerAction(apiRoutes.tempomat.getTempomatMode)
    getTempomatModeAction(params: ActionParams) {

        const courseId = Id
            .create<'Course'>(params.getQuery<any>()
                .getValue(x => x.courseId, 'int'));

        return this._tempomatService
            .getTempomatModeAsync(params.principalId, courseId);
    }

    @XControllerAction(apiRoutes.tempomat.setTempomatMode, { isPost: true })
    setTempomatModeAction(params: ActionParams) {

        const body = params
            .getBody<any>();

        const mode = body
            .getValue<TempomatModeType>(bod => bod.mode, 'custom', value => value === 'light' || value === 'strict');

        const courseId = Id
            .create<'Course'>(body
                .getValue(x => x.courseId, 'int'));

        return this._tempomatService
            .setTempomatModeAsync(params.principalId, courseId, mode);
    }
}