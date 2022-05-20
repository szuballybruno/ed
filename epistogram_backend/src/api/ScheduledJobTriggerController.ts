import { TempomatService } from '../services/TempomatService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class ScheduledJobTriggerController {

    private _tempomatService: TempomatService;

    constructor(tempomatService: TempomatService) {

        this._tempomatService = tempomatService;
    }

    @XControllerAction(apiRoutes.scheduledJobs.evaluateUserProgress, { isPublic: true })
    evaluateUserProgressesAction = async () => {

        await this._tempomatService
            .evaluateUserProgressesAsync();
    };
}