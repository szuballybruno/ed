import { EventService } from '../services/EventService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class EventController {

    private _eventService: EventService;

    constructor(serviceProvider: ServiceProvider) {

        this._eventService = serviceProvider.getService(EventService);
    }

    @XControllerAction(apiRoutes.event.getUnfulfilledEvent)
    getUnfulfilledEventAction = async (params: ActionParams) => {

        return await this._eventService.getUnfulfilledEventAsync();
    };
}