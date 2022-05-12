import { TempomatService } from '../services/TempomatService';
import { TempomatModeType } from '../shared/types/sharedTypes';
import { ActionParams } from '../utilities/ActionParams';

export class TempomatController {

    private _tempomatService: TempomatService;

    constructor(tempomatService: TempomatService) {

        this._tempomatService = tempomatService;
    }

    getTempomatModeAction = async (params: ActionParams) => {

        return this._tempomatService
            .getTempomatModeAsync(params.principalId, params.getQuery<any>()
                .getValue(x => x.courseId, 'int'));
    };

    setTempomatModeAction = async (params: ActionParams) => {

        const body = params
            .getBody<any>();

        const mode = body
            .getValue<TempomatModeType>(bod => bod.mode, 'custom', value => value === 'auto' || value === 'balanced' || value === 'light' || value === 'strict');

        const courseId = body
            .getValue(x => x.courseId, 'int');

        await this._tempomatService
            .setTempomatModeAsync(params.principalId, courseId, mode);
    };
}