import { TempomatService } from '../services/TempomatService';

export class ScheduledJobTriggerController {

    private _tempomatService: TempomatService;

    constructor(tempomatService: TempomatService) {

        this._tempomatService = tempomatService;
    }

    evaluateUserProgressesAction = async () => {

        await this._tempomatService
            .evaluateUserProgressesAsync();
    };
}