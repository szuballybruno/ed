import { EventService } from '../services/EventService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class EventController implements XController<EventController> {

    private _eventService: EventService;

    constructor(serviceProvider: ServiceProvider) {

        this._eventService = serviceProvider.getService(EventService);
    }

    @XControllerAction(apiRoutes.event.getUnfulfilledEvent)
    getUnfulfilledEventAction(params: ActionParams) {

        return this._eventService
            .getUnfulfilledEventAsync();
    };
}