import { Event } from '../models/entity/Event';
import { CoinAcquireResultDTO } from '../shared/dtos/CoinAcquireResultDTO';
import { EventDTO } from '../shared/dtos/EventDTO';
import { LagBehindNotificationDTO } from '../shared/dtos/LagBehindNotificationDTO';
import { EventCodeType } from '../shared/types/sharedTypes';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class EventService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;

    constructor(mapperService: MapperService, conn: ORMConnectionService) {

        this._ormService = conn;
        this._mapperService = mapperService;
    }

    async addAnswerStreakEventAsync(userId: number, data: CoinAcquireResultDTO) {

        await this.addEventAsync(userId, 'coin_acquire_answer_streak', data);
    }

    async addSessionStreakEventAsync(userId: number, data: CoinAcquireResultDTO) {

        await this.addEventAsync(userId, 'coin_acquire_session_streak', data);
    }

    async addLagBehindNotificationEventAsync(userId: number, data: LagBehindNotificationDTO) {

        await this.addEventAsync(userId, 'lag_behind_notification', data);
    }

    async addEventAsync(userId: number, eventCode: EventCodeType, eventDataDTO: any) {

        console.log(`Queueing new event for user: ${userId} code: ${eventCode}`);

        await this._ormService
            .getRepository(Event)
            .insert({
                userId: userId,
                type: eventCode,
                isFulfilled: false,
                data: JSON.stringify(eventDataDTO)
            });
    }

    async getUnfulfilledEventAsync() {

        const events = await this._ormService
            .getRepository(Event)
            .createQueryBuilder('e')
            .where('e.is_fulfilled = false')
            .orderBy('e.creationDate')
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