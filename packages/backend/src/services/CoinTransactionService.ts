import { Id } from '@episto/commontypes';
import { CoinTransactionDTO } from '@episto/communication';
import { CoinTransaction } from '../models/entity/misc/CoinTransaction';
import { GivenAnswer } from '../models/entity/misc/GivenAnswer';
import { CoinBalanceView } from '../models/views/CoinBalanceView';
import { CoinTransactionView } from '../models/views/CoinTransactionView';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { LoggerService } from './LoggerService';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class CoinTransactionService {

    private _mapperService: MapperService;
    private _ormConnectionService: ORMConnectionService;

    constructor(
        ormConnService: ORMConnectionService,
        mapperService: MapperService,
        private _loggerService: LoggerService) {

        this._mapperService = mapperService;
        this._ormConnectionService = ormConnService;
    }

    async makeCoinTransactionAsync(params: any) {

        this._loggerService
            .logScoped('COINS', `Adding new coin... ${params.userId} - ${params.amount}`);

        return await this
            ._ormConnectionService
            .createAsync(CoinTransaction, {
                activityStreakId: params.activityStreakId || null,
                givenAnswerStreakId: params.givenAnswerStreakId || null,
                shopItemId: params.shopItemId || null,
                userId: params.userId,
                amount: params.amount,
                givenAnswerId: params.givenAnswerId || null,
                videoId: params.videoId || null,
                activitySessionId: params.activitySessionId || null,
                creationDate: new Date(Date.now()),
                isGifted: false
            });
    }

    async getPrincipalCoinBalance(principalId: PrincipalId) {

        return this
            .getCoinBalance(principalId, principalId.getId());
    }

    async getCoinBalance(
        principalId: PrincipalId,
        userId: Id<'User'>
    ) {

        const coinBalance = await this._ormConnectionService
            .query(CoinBalanceView, { userId })
            .where('userId', '=', 'userId')
            .getSingle();

        return coinBalance.coinBalance;
    }

    async giftCoinsToUserAsync(
        principalId: PrincipalId,
        userId: Id<'User'>,
        amount: number
    ) {

        return this._ormConnectionService
            .createAsync(CoinTransaction, {
                userId,
                amount,
                isGifted: true
            } as CoinTransaction);
    }

    async getCoinTransactionsAsync(
        userId: PrincipalId
    ) {

        const coinTransactions = await this._ormConnectionService
            .query(CoinTransactionView, { userId: userId.toSQLValue() })
            .where('userId', '=', 'userId')
            .getMany();

        return this._mapperService
            .mapTo(CoinTransactionDTO, [coinTransactions]);
    }

    /**
     * Find coin transactions by given answer ids
     */
    async getUnrewardedQuestionVersionIds(
        userId: Id<'User'>,
        questionVersionIds: Id<'QuestionVersion'>[]
    ) {

        const views = await this
            ._ormConnectionService
            .withResType<{ questionVersionId: Id<'QuestionVersion'> }>()
            .query(CoinTransaction, { userId, questionVersionIds })
            .selectFrom(x => x
                .columns(GivenAnswer, {
                    questionVersionId: 'questionVersionId'
                }))
            .innerJoin(GivenAnswer, x => x
                .on('id', '=', 'givenAnswerId', CoinTransaction)
                .and('questionVersionId', '=', 'questionVersionIds'))
            .where('userId', '=', 'userId')
            .getMany();

        const rewardedQuestionVersionIds = views
            .map(x => x.questionVersionId);

        return questionVersionIds
            .filter(x => !rewardedQuestionVersionIds
                .some(y => y === x));
    }

    async getCoinsForActivitySession(
        userId: Id<'User'>,
        activitySessionId: Id<'ActivitySession'>
    ) {
        return await this._ormConnectionService
            .query(CoinTransaction, { userId, activitySessionId })
            .where('userId', '=', 'userId')
            .and('activitySessionId', '=', 'activitySessionId')
            .getOneOrNull();
    }

    async getCoinsForActivityStreakAsync(
        userId: Id<'User'>,
        activityStreakId: Id<'ActivityStreak'>
    ) {
        return await this._ormConnectionService
            .query(CoinTransaction, { userId, activityStreakId })
            .where('userId', '=', 'userId')
            .and('activityStreakId', '=', 'activityStreakId')
            .getMany();
    }

    async getCoinsForAnswerStreakAsync(
        userId: Id<'User'>,
        answerStreakId: Id<'GivenAnswerStreak'>
    ) {

        return await this._ormConnectionService
            .query(CoinTransaction, { userId, answerStreakId })
            .where('userId', '=', 'userId')
            .and('givenAnswerStreakId', '=', 'answerStreakId')
            .getMany();
    }
}
