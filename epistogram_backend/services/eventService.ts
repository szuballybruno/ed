import { Event } from "../models/entity/Event";
import { EventDTO } from "../models/shared_models/EventDTO";
import { EventType } from "../models/shared_models/types/sharedTypes";
import { DbConnectionService } from "./databaseConnectionService";

export class EventService {

    private _dbConnection: DbConnectionService;

    constructor(conn: DbConnectionService) {

        this._dbConnection = conn;
    }

    async addEvent(eventType: EventType, eventDTO: EventDTO) {

        await this._dbConnection
            .getRepository(Event)
            .insert({
                type: eventType,
                isFulfilled: false,
                data: JSON.stringify(eventDTO)
            });
    }

    async getUnfulfilledEventAsync() {

        const events = await this._dbConnection
            .getRepository(Event)
            .createQueryBuilder("e")
            .where("e.is_fulfilled = false")
            .orderBy("e.creationDate")
            .getMany();

        return events.length > 0 ? events[0] : null;
    }
}