import { EventService } from '@episto/server-services';
import { apiRoutes } from '@episto/communication';
import { IXGatewayServiceProvider } from '@episto/x-gateway';
import { ActionParams } from '../helpers/ActionParams';
import { XControllerAction } from '@episto/x-gateway';
import { IController } from '../interfaces/IController';

export class EventController implements IController<EventController> {

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