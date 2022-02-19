import { Event } from "../models/entity/Event";
import { CoinAcquireResultDTO } from "../sharedd/dtos/CoinAcquireResultDTO";
import { EventDTO } from "../sharedd/dtos/EventDTO";
import { EventType } from "../sharedd/types/sharedTypes";
import { MapperService } from "./MapperService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

export class EventService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;

    constructor(mapperService: MapperService, conn: ORMConnectionService) {

        this._ormService = conn;
        this._mapperService = mapperService;
    }

    async addAnswerStreakEventAsync(userId: number, data: CoinAcquireResultDTO) {

        await this.addEventAsync(userId, "coin_acquire_answer_streak", data);
    }

    async addSessionStreakEventAsync(userId: number, data: CoinAcquireResultDTO) {

        await this.addEventAsync(userId, "coin_acquire_session_streak", data);
    }

    async addEventAsync(userId: number, eventType: EventType, eventDataDTO: any) {

        await this._ormService
            .getRepository(Event)
            .insert({
                userId: userId,
                type: eventType,
                isFulfilled: false,
                data: JSON.stringify(eventDataDTO)
            });
    }

    async getUnfulfilledEventAsync() {

        const events = await this._ormService
            .getRepository(Event)
            .createQueryBuilder("e")
            .where("e.is_fulfilled = false")
            .orderBy("e.creationDate")
            .getMany();

        if (events.length === 0)
            return null;

        const event = events[0];

        await this._ormService
            .getRepository(Event)
            .save({
                id: event.id,
                isFulfilled: true
            });

        return this._mapperService
            .map(Event, EventDTO, event);
    }
}