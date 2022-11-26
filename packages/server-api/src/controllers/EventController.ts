import { EventService } from '@episto/server-services';
import { apiRoutes } from '@episto/communication';
import { IXGatewayServiceProvider } from '@episto/x-gateway';
import { ActionParams } from '../ActionParams';
import { XControllerAction } from '@episto/x-gateway';
import { Controller } from '../Controller';

export class EventController implements Controller<EventController> {

    private _eventService: EventService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

        this._eventService = serviceProvider.getService(EventService);
    }

    @XControllerAction(apiRoutes.event.getUnfulfilledEvent)
    getUnfulfilledEventAction(params: ActionParams) {

        return this._eventService
            .getUnfulfilledEventAsync();
    }
}