import { Event } from '../models/entity/Event';
import { CoinAcquireResultDTO } from '../shared/dtos/CoinAcquireResultDTO';
import { EventDTO } from '../shared/dtos/EventDTO';
import { LagBehindNotificationDTO } from '../shared/dtos/LagBehindNotificationDTO';
import { EventCodeType } from '../shared/types/sharedTypes';
import { Id } from '../shared/types/versionId';
import { AuthorizationResult } from '../utilities/XTurboExpress/XTurboExpressTypes';
import { AuthorizationService } from './AuthorizationService';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class EventService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;
    private _authorizationService: AuthorizationService;

    constructor(
        mapperService: MapperService,
        conn: ORMConnectionService,
        authorizationService: AuthorizationService) {

        this._ormService = conn;
        this._mapperService = mapperService;
        this._authorizationService = authorizationService;
    }

    async addAnswerStreakEventAsync(userId: Id<'User'>, data: CoinAcquireResultDTO) {

        await this.addEventAsync(userId, 'coin_acquire_answer_streak', data);
    }

    async addSessionStreakEventAsync(userId: Id<'User'>, data: CoinAcquireResultDTO) {

        await this.addEventAsync(userId, 'coin_acquire_session_streak', data);
    }

    async addLagBehindNotificationEventAsync(userId: Id<'User'>, data: LagBehindNotificationDTO) {

        await this.addEventAsync(userId, 'lag_behind_notification', data);
    }

    async addEventAsync(userId: Id<'User'>, eventCode: EventCodeType, eventDataDTO: any) {

        console.log(`Queueing new event for user: ${userId} code: ${eventCode}`);

        await this._ormService
            .createAsync(Event, {
                userId: userId,
                type: eventCode,
                isFulfilled: false,
                data: JSON.stringify(eventDataDTO)
            } as Event);
    }

    getUnfulfilledEventAsync() {

        return {
            action: async () => {
                const events = await this._ormService
                    .query(Event)
                    .where('isFulfilled', '=', 'false')
                    .orderBy(['creationDate'])
                    .getMany();

                if (events.length === 0)
                    return null;

                const event = events[0];

                await this._ormService
                    .save(Event, {
                        id: event.id,
                        isFulfilled: true
                    });

                return this._mapperService
                    .mapTo(EventDTO, [event]);
            },
            auth: async () => {

                return AuthorizationResult.ok;
            }
        };


    }
}