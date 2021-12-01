import { Event } from "../models/entity/Event";
import { EventDTO } from "../models/shared_models/EventDTO";
import { EventType } from "../models/shared_models/types/sharedTypes";
import { DbConnectionService } from "./sqlServices/DatabaseConnectionService";
import { MapperService } from "./mapperService";

export class EventService {

    private _dbConnection: DbConnectionService;
    private _mapperService: MapperService;

    constructor(mapperService: MapperService, conn: DbConnectionService) {

        this._dbConnection = conn;
        this._mapperService = mapperService;
    }

    async addEvent(eventType: EventType, eventDataDTO: any) {

        await this._dbConnection
            .getRepository(Event)
            .insert({
                type: eventType,
                isFulfilled: false,
                data: JSON.stringify(eventDataDTO)
            });
    }

    async getUnfulfilledEventAsync() {

        const events = await this._dbConnection
            .getRepository(Event)
            .createQueryBuilder("e")
            .where("e.is_fulfilled = false")
            .orderBy("e.creationDate")
            .getMany();

        if (events.length === 0)
            return null;

        const event = events[0];

        return this._mapperService
            .useMapperFunction(Event, EventDTO, event);
    }
}