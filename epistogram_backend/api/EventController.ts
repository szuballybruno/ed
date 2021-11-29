import { EventService } from "../services/eventService";
import { ActionParamsType } from "../utilities/helpers";

export class EventController {

    private _eventService: EventService;

    constructor(es: EventService) {

        this._eventService = es;
    }

    getUnfulfilledEventAction = async (params: ActionParamsType) => {

        return await this._eventService.getUnfulfilledEventAsync();
    }
}