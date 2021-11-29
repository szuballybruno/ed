import { CoinAcquire } from "../models/entity/CoinAcquire";
import { CoinAcquireResultDTO } from "../models/shared_models/CoinAcquireResultDTO";
import { CoinAcquireReasonType } from "../models/shared_models/types/sharedTypes";
import { ActivityStreakView } from "../models/views/ActivityStreakView";
import { UserSessionDailyView } from "../models/views/UserActivityDailyView";
import { trimTimeFromDate } from "../utilities/helpers";
import { DbConnectionService } from "./databaseConnectionService";
import { EventService } from "./eventService";
import { SQLFunctionsService } from "./sqlServices/sqlFunctionsService";

export class CoinAcquireService {
    private _funcService: SQLFunctionsService;
    private _connService: DbConnectionService;
    private _eventService: EventService;

    constructor(funcService: SQLFunctionsService, connService: DbConnectionService, es: EventService) {

        this._funcService = funcService;
        this._connService = connService;
        this._eventService = es;
    }

    /**
     * This will add reward coins for session activity,
     * and also, new notification events, if necessary 
     * 
     * @param userId 
     * @param activitySessionId 
     */
    handleSessionActivityCoinsAsync = async (userId: number, activitySessionId: number) => {

        await this.acquireGenericActivityCoin(userId, activitySessionId);
        await this.acquireActivityStreakCoin(userId);
    }

    /**
     * Generic activity coins are given at the start of each new activity session,
     * only 3 can be given in one day's period (by date, not 24h)  
     * 
     * @param userId 
     * @param activitySessionId 
     * @returns 
     */
    acquireGenericActivityCoin = async (userId: number, activitySessionId: number) => {

        // check if it's not more than 3 sessions today
        const today = trimTimeFromDate(new Date());

        const todaysInfo = await this._connService
            .getRepository(UserSessionDailyView)
            .createQueryBuilder("us")
            .where('us.userId = :userId', { userId })
            .andWhere("us.date = :today", { today })
            .getOneOrFail();

        // if (todaysInfo.sessionCount > 3)
        //     return;

        // check if current session has a coin acquire 
        const acquireForCurrentSession = await this._connService
            .getRepository(CoinAcquire)
            .findOne({
                where: {
                    activitySessionId: activitySessionId
                }
            });

        if (acquireForCurrentSession)
            return;

        // add acquire 
        await this._funcService
            .insertCoinAcquiredFn(userId, 10, activitySessionId, null, null, null);
    }

    /**
     * Activity streak coins are given after 3-5-10 days of countinous activity
     * the cuntion also adds a notification event that the frontend will pick up and display. 
     * 
     * @param userId 
     * @returns 
     */
    acquireActivityStreakCoin = async (userId: number) => {

        const currentActivityStreak = await this._connService
            .getRepository(ActivityStreakView)
            .findOneOrFail({
                where: {
                    isFinalized: false
                }
            });

        const coinsForActivityStreak = await this._connService
            .getRepository(CoinAcquire)
            .find({
                where: {
                    activityStreakId: currentActivityStreak.id
                }
            });

        const alreadyGivenCoinsLegth = coinsForActivityStreak.length;
        const currentActivityStreakLenght = currentActivityStreak.length_days;
        const currentActivityStreakId = currentActivityStreak.id;

        // no more than 3 different types of streak gives you coins, 
        // these are incrementally added until 3 is reached, after that no more coins can be given 
        // for the same streak 
        if (alreadyGivenCoinsLegth > 3)
            return;

        // get proper reason and coin amount
        const { amount, reason } = (() => {

            if (alreadyGivenCoinsLegth === 0 && currentActivityStreakLenght === 3) {

                return {
                    amount: 10,
                    reason: "activity_streak_3_days"
                } as CoinAcquireResultDTO;
            }

            if (alreadyGivenCoinsLegth === 1 && currentActivityStreakLenght === 5) {

                return {
                    amount: 20,
                    reason: "activity_streak_5_days"
                } as CoinAcquireResultDTO;
            }

            if (alreadyGivenCoinsLegth === 2 && currentActivityStreakLenght === 10) {

                return {
                    amount: 50,
                    reason: "activity_streak_10_days"
                } as CoinAcquireResultDTO;
            }

            return {
                amount: 0,
                reason: "activity_streak_10_days"
            } as CoinAcquireResultDTO;
        })();

        // streak is not in a state that would result in coin acquire 
        if (amount === 0)
            return;

        // actually insert the new coin acquire
        await this._funcService
            .insertCoinAcquiredFn(userId, amount, null, null, null, currentActivityStreakId);

        // add acquire event 
        this._eventService
            .addEvent("coin_acquire", {
                coinAcquireNotification: {
                    amount,
                    reason
                }
            });
    }
}