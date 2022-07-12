import { Course } from '../models/entity/course/Course';
import { TempomatService } from '../services/TempomatService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { TempomatModeType } from '../shared/types/sharedTypes';
import { Id } from '../shared/types/versionId';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class TempomatController {

    private _tempomatService: TempomatService;

    constructor(serviceProvider: ServiceProvider) {

        this._tempomatService = serviceProvider.getService(TempomatService);
    }

    @XControllerAction(apiRoutes.tempomat.getTempomatMode)
    getTempomatModeAction = async (params: ActionParams) => {

        const courseId = Id
            .create<'Course'>(params.getQuery<any>()
                .getValue(x => x.courseId, 'int'))

        return this._tempomatService
            .getTempomatModeAsync(params.principalId, courseId);
    };

    @XControllerAction(apiRoutes.tempomat.setTempomatMode, { isPost: true })
    setTempomatModeAction = async (params: ActionParams) => {

        const body = params
            .getBody<any>();

        const mode = body
            .getValue<TempomatModeType>(bod => bod.mode, 'custom', value => value === 'auto' || value === 'balanced' || value === 'light' || value === 'strict');

        const courseId = Id
            .create<'Course'>(body
                .getValue(x => x.courseId, 'int'));

        await this._tempomatService
            .setTempomatModeAsync(params.principalId, courseId, mode);
    };
}