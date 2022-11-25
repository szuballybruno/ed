import { EventService } from '@episto/server-services';
import { apiRoutes } from '@episto/communication';
import { ServiceProvider } from '../startup/ServiceProvider';
import { ActionParams } from '../XTurboExpress/ActionParams';
import { XControllerAction } from '../XTurboExpress/XTurboExpressDecorators';
import { XController } from '../XTurboExpress/XTurboExpressTypes';

export class EventController implements XController<EventController> {

    private _eventService: EventService;

    constructor(serviceProvider: ServiceProvider) {

        this._eventService = serviceProvider.getService(EventService);
    }

    @XControllerAction(apiRoutes.event.getUnfulfilledEvent)
    getUnfulfilledEventAction(params: ActionParams) {

        return this._eventService
            .getUnfulfilledEventAsync();
    }
}