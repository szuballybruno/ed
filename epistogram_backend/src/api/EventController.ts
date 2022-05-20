import { EventService } from '../services/EventService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class EventController {

    private _eventService: EventService;

    constructor(es: EventService) {

        this._eventService = es;
    }

    @XControllerAction(apiRoutes.event.getUnfulfilledEvent)
    getUnfulfilledEventAction = async (params: ActionParams) => {

        return await this._eventService.getUnfulfilledEventAsync();
    };
}