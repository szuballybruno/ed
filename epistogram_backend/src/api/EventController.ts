import { EventService } from '../services/EventService';
import { ActionParams } from '../utilities/helpers';

export class EventController {

    private _eventService: EventService;

    constructor(es: EventService) {

        this._eventService = es;
    }

    getUnfulfilledEventAction = async (params: ActionParams) => {

        return await this._eventService.getUnfulfilledEventAsync();
    }
}