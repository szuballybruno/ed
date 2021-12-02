import { CoinAcquire } from "../models/entity/CoinAcquire";
import { GivenAnswer } from "../models/entity/GivenAnswer";
import { CoinAcquireResultDTO } from "../models/shared_models/CoinAcquireResultDTO";
import { ActivityStreakView } from "../models/views/ActivityStreakView";
import { UserSessionDailyView } from "../models/views/UserActivityDailyView";
import { trimTimeFromDate } from "../utilities/helpers";
import { EventService } from "./eventService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";
import { SQLFunctionsService } from "./sqlServices/SQLFunctionsService";

export class CoinAcquireService {
    private _funcService: SQLFunctionsService;
    private _ormService: ORMConnectionService;
    private _eventService: EventService;

    constructor(funcService: SQLFunctionsService, ormService: ORMConnectionService, es: EventService) {

        this._funcService = funcService;
        this._ormService = ormService;
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
     * Reward user after a video is watched fo the first time 
     * 
     * @param userId 
     * @param videoId 
     */
    acquireVideoWatchedCoinsAsync = async (userId: number, videoId: number) => {

        await this._funcService
            .insertCoinAcquiredFn({ userId, amount: 1, videoId });
    }

    /**
     * Reward user after a question is answered correctly for the first time 
     * 
     * @param userId 
     * @param givenAnswerId 
     */
    acquireQuestionAnswerCoinsAsync = async (userId: number, givenAnswerId: number) => {

        // do not reward user if the question is already answered 
        // correctly and a coin is previously acquired for that 
        const newGivenAnswer = await this._ormService
            .getRepository(GivenAnswer)
            .findOneOrFail(givenAnswerId);

        const alreadyAcquiredCoinsForCurrentQuestionId = await this._ormService
            .getRepository(CoinAcquire)
            .createQueryBuilder("ca")
            .leftJoinAndSelect("ca.givenAnswer", "ga")
            .where("ca.userId = :userId", { userId })
            .andWhere("ga.question_id = :questionId", { questionId: newGivenAnswer.questionId })
            .andWhere("ca.given_answer_id IS NOT NULL")
            .getMany();

        if (alreadyAcquiredCoinsForCurrentQuestionId.length > 0)
            return;

        // insert coin
        await this._funcService
            .insertCoinAcquiredFn({ userId, amount: 1, givenAnswerId });
    }

    /**
     * Reward user with coins based on the given answer streak length  
     * 
     */
    handleGivenAnswerStreakCoinsAsync = async (userId: number, streakId: number, streakLength: number) => {

        const prevCoinsGivenForStreak = await this._ormService
            .getRepository(CoinAcquire)
            .createQueryBuilder("ca")
            .where("ca.userId = :userId", { userId })
            .andWhere("ca.given_answer_streak_id = :gasid", { gasid: streakId })
            .getMany();

        if (streakLength === 5 && prevCoinsGivenForStreak.length === 0) {

            await this._funcService
                .insertCoinAcquiredFn({ userId, amount: 5, givenAnswerStreakId: streakId });
        }

        if (streakLength === 10 && prevCoinsGivenForStreak.length === 0) {

            await this._funcService
                .insertCoinAcquiredFn({ userId, amount: 15, givenAnswerStreakId: streakId });
        }
    }

    /**
     * Generic activity coins are given at the start of each new activity session,
     * only 3 can be given in one day's period (by date, not 24h)  
     * 
     * @param userId 
     * @param activitySessionId 
     * @returns 
     */
    private acquireGenericActivityCoin = async (userId: number, activitySessionId: number) => {

        // check if it's not more than 3 sessions today
        const today = trimTimeFromDate(new Date());

        // TODO
        const todaysInfo = await this._ormService
            .getRepository(UserSessionDailyView)
            .createQueryBuilder("us")
            .where('us.userId = :userId', { userId })
            .andWhere("us.date = :today", { today })
            .getOneOrFail();

        // if (todaysInfo.sessionCount > 3)
        //     return;

        // check if current session has a coin acquire 
        const acquireForCurrentSession = await this._ormService
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
            .insertCoinAcquiredFn({ userId, amount: 10, activitySessionId });
    }

    /**
     * Activity streak coins are given after 3-5-10 days of countinous activity
     * the cuntion also adds a notification event that the frontend will pick up and display. 
     * 
     * @param userId 
     * @returns 
     */
    private acquireActivityStreakCoin = async (userId: number) => {

        const currentActivityStreak = await this._ormService
            .getRepository(ActivityStreakView)
            .findOneOrFail({
                where: {
                    isFinalized: false
                }
            });

        const coinsForActivityStreak = await this._ormService
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
            .insertCoinAcquiredFn({ userId, amount, activityStreakId: currentActivityStreakId });

        // add acquire event 
        this._eventService
            .addEvent("coin_acquire", {
                amount,
                reason
            });
    }
}