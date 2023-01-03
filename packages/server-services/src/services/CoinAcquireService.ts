import { CoinAcquireResultDTO } from '@episto/communication';
import { ActivityStreakView } from '../models/views/ActivityStreakView';
import { UserSessionDailyView } from '../models/views/UserSessionDailyView';
import { CoinTransactionService } from './CoinTransactionService';
import { EventService } from './EventService';
import { ORMConnectionService } from './ORMConnectionService';
import { Id } from '@episto/commontypes';
import { GlobalConfigurationService } from './GlobalConfigurationService';
import { LoggerService } from './LoggerService';
import { CoinTransaction } from '../models/tables/CoinTransaction';
import { instantiate } from '@episto/commonlogic';
import { InsertEntity } from '../utilities/misc';
import { CoinAcquireReasonType } from '@episto/commontypes';
import { GivenAnswer } from '../models/tables/GivenAnswer';

export class CoinAcquireService {

    private _ormService: ORMConnectionService;
    private _eventService: EventService;
    private _coinTransactionService: CoinTransactionService;

    constructor(
        coinTransactionService: CoinTransactionService,
        ormService: ORMConnectionService,
        es: EventService,
        private _config: GlobalConfigurationService,
        private _loggerService: LoggerService) {

        this._ormService = ormService;
        this._eventService = es;
        this._coinTransactionService = coinTransactionService;
    }

    /**
     * This will add reward coins for session activity,
     * and also, new notification events, if necessary
     */
    handleSessionActivityCoinsAsync = async (userId: Id<'User'>, activitySessionId: Id<'ActivitySession'>) => {

        await this.acquireGenericActivityCoin(userId, activitySessionId);
        await this.acquireActivityStreakCoin(userId);
    };

    /**
     * Reward user after a video is watched fo the first time
     */
    acquireVideoWatchedCoinsAsync = async (userId: Id<'User'>, videoId: Id<'Video'>) => {

        await this._coinTransactionService
            .makeCoinTransactionAsync({ userId, amount: this._config.coinRewardAmounts.videoWatched, videoId });
    };

    /**
     * Reward user after a question is answered correctly for the first time
     */
    async acquireGivenAnswerCoinsAsync(
        userId: Id<'User'>,
        givenAnswers: GivenAnswer[]) {

        const questionVersionIds = givenAnswers
            .map(x => x.questionVersionId);

        const nonRewardedQuestionVersionIds = await this
            ._coinTransactionService
            .getUnrewardedQuestionVersionIds(userId, questionVersionIds);

        const nonRewardedGivenAnswers = givenAnswers
            .filter(x => nonRewardedQuestionVersionIds
                .some(y => y === x.questionVersionId));

        const newTransactions = givenAnswers
            .map(givenAnswer => instantiate<InsertEntity<CoinTransaction>>({
                userId,
                amount: this._config.coinRewardAmounts.questionCorrectAnswer,
                activitySessionId: null,
                activityStreakId: null,
                givenAnswerId: givenAnswer.id,
                givenAnswerStreakId: null,
                videoId: null,
                creationDate: new Date(Date.now()),
                isGifted: false,
                shopItemId: null
            }));

        const inserted = await this._ormService
            .createManyAsync(CoinTransaction, newTransactions);

        return inserted;
    }

    /**
     * Reward user with coins based on the given answer streak length
     */
    handleGivenAnswerStreakCoinsAsync = async (userId: Id<'User'>, streakId: Id<'GivenAnswerStreak'>, streakLength: number) => {

        const prevCoinsGivenForStreak = await this
            ._coinTransactionService
            .getCoinsForAnswerStreakAsync(userId, streakId);

        const { longStreak, shortStreak } = this._config.coinRewardAmounts.answerStreak;

        /**
         * Reward streak fn 
         */
        const rewardStrekAsync = async ({
            reason,
            prevCoinsGiven,
            length,
            rewardAmount
        }: {
            reason: CoinAcquireReasonType,
            prevCoinsGiven: number,
            rewardAmount: number,
            length: number
        }) => {

            if (streakLength < length)
                return;

            if (prevCoinsGivenForStreak.length > prevCoinsGiven)
                return;

            const res = await this
                ._coinTransactionService
                .makeCoinTransactionAsync({
                    userId,
                    amount: rewardAmount,
                    givenAnswerStreakId: streakId
                });

            return {
                amount: res.amount,
                reason
            } as CoinAcquireResultDTO;
        };

        /**
         * Reward short streak
         */
        const shortStreakRes = await rewardStrekAsync({
            prevCoinsGiven: 0,
            reason: 'answer_streak_5',
            ...shortStreak
        });

        if (shortStreakRes)
            return shortStreakRes;

        /**
         * Reward long streak
         */
        const longStreakRes = await rewardStrekAsync({
            prevCoinsGiven: 1,
            reason: 'answer_streak_10',
            ...longStreak
        });

        if (longStreakRes)
            return longStreakRes;

        return null;
    };

    // ------------------------ PRIVATE

    /**
     * Generic activity coins are given at the start of each new activity session,
     * only 3 can be given in one day's period (by date, not 24h)
     */
    private acquireGenericActivityCoin = async (userId: Id<'User'>, activitySessionId: Id<'ActivitySession'>) => {

        // check if it's not more than 3 sessions today
        const todaysInfo = await this._ormService
            .query(UserSessionDailyView, { userId })
            .where('userId', '=', 'userId')
            .getSingle();

        if (todaysInfo.sessionCount > 3)
            return;

        // check if current session has a coin acquire
        const acquireForCurrentSession = await this._coinTransactionService
            .getCoinsForActivitySession(userId, activitySessionId);

        if (acquireForCurrentSession)
            return;

        // add acquire
        await this._coinTransactionService
            .makeCoinTransactionAsync({
                userId,
                amount: this._config.coinRewardAmounts.genericActivity,
                activitySessionId
            });
    };

    /**
     * Activity streak coins are given after 3-5-10 days of countinous activity
     * the cuntion also adds a notification event that the frontend will pick up and display.
     */
    private acquireActivityStreakCoin = async (userId: Id<'User'>) => {

        const currentActivityStreak = await this._ormService
            .query(ActivityStreakView, { userId })
            .where('isFinalized', 'IS', 'false')
            .and('userId', '=', 'userId')
            .getSingle();

        const coinsForActivityStreak = await this._coinTransactionService
            .getCoinsForActivityStreakAsync(userId, currentActivityStreak.id);

        const alreadyGivenCoinsLegth = coinsForActivityStreak.length;
        const currentActivityStreakLenght = currentActivityStreak.lengthDays;
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
                    amount: this._config.coinRewardAmounts.activityStreak3Days,
                    reason: 'activity_streak_3_days'
                } as CoinAcquireResultDTO;
            }

            if (alreadyGivenCoinsLegth === 1 && currentActivityStreakLenght === 5) {

                return {
                    amount: this._config.coinRewardAmounts.activityStreak5Days,
                    reason: 'activity_streak_5_days'
                } as CoinAcquireResultDTO;
            }

            if (alreadyGivenCoinsLegth === 2 && currentActivityStreakLenght === 10) {

                return {
                    amount: this._config.coinRewardAmounts.activityStreak10Days,
                    reason: 'activity_streak_10_days'
                } as CoinAcquireResultDTO;
            }

            return {
                amount: 0,
                reason: 'activity_streak_10_days'
            } as CoinAcquireResultDTO;
        })();

        // streak is not in a state that would result in coin acquire
        if (amount === 0)
            return;

        // actually insert the new coin acquire
        await this._coinTransactionService
            .makeCoinTransactionAsync({ userId, amount, activityStreakId: currentActivityStreakId });

        // add acquire event
        await this._eventService
            .addSessionStreakEventAsync(userId, { amount, reason });
    };
}
