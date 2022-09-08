import {CoinTransaction} from '../models/entity/CoinTransaction';
import {CoinTransactionDTO} from '../shared/dtos/CoinTransactionDTO';
import {CoinBalanceView} from '../models/views/CoinBalanceView';
import {CoinTransactionView} from '../models/views/CoinTransactionView';
import {MapperService} from './MapperService';
import {ORMConnectionService} from './ORMConnectionService/ORMConnectionService';
import {InsertCoinFnParamsType, SQLFunctionsService} from './sqlServices/FunctionsService';
import {PrincipalId} from '../utilities/XTurboExpress/ActionParams';
import {GivenAnswer} from '../models/entity/GivenAnswer';
import {Id} from '../shared/types/versionId';
import {AuthorizationService} from './AuthorizationService';
import {LoggerService} from './LoggerService';

export class CoinTransactionService {

    private _funcService: SQLFunctionsService;
    private _mapperService: MapperService;
    private _ormConnectionService: ORMConnectionService;
    private _authorizationService: AuthorizationService;

    constructor(
        funcService: SQLFunctionsService,
        ormConnService: ORMConnectionService,
        mapperService: MapperService,
        authorizationService: AuthorizationService,
        private _loggerService: LoggerService) {

        this._funcService = funcService;
        this._mapperService = mapperService;
        this._ormConnectionService = ormConnService;
        this._authorizationService = authorizationService;
    }

    async makeCoinTransactionAsync(params: InsertCoinFnParamsType) {

        this._loggerService
            .logScoped('COINS', `Adding new coin... ${params.userId} - ${params.amount}`);

        await this._ormConnectionService
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
            .query(CoinBalanceView, {userId})
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
            .query(CoinTransactionView, {userId: userId.toSQLValue()})
            .where('userId', '=', 'userId')
            .getMany();

        return this._mapperService
            .mapTo(CoinTransactionDTO, [coinTransactions]);
    }

    async getCoinsForQuestionAsync(
        userId: Id<'User'>,
        givenAnswerId: Id<'GivenAnswer'>
    ) {

        const givenAnswer = await this._ormConnectionService
            .query(GivenAnswer, {givenAnswerId})
            .where('id', '=', 'givenAnswerId')
            .and('isCorrect', '=', 'true')
            .getOneOrNull();

        if (!givenAnswer)
            return [0];

        return await this._ormConnectionService
            .query(CoinTransaction, {userId, questionVersionId: givenAnswer.questionVersionId})
            .innerJoin(GivenAnswer, x => x
                .on('id', '=', 'givenAnswerId', CoinTransaction)
                .and('questionVersionId', '=', 'questionVersionId'))
            .where('userId', '=', 'userId')
            .getMany();
    }

    async getCoinsForActivitySession(
        userId: Id<'User'>,
        activitySessionId: Id<'ActivitySession'>
    ) {
        return await this._ormConnectionService
            .query(CoinTransaction, {userId, activitySessionId})
            .where('userId', '=', 'userId')
            .and('activitySessionId', '=', 'activitySessionId')
            .getOneOrNull();
    }

    async getCoinsForActivityStreakAsync(
        userId: Id<'User'>,
        activityStreakId: Id<'ActivityStreak'>
    ) {
        return await this._ormConnectionService
            .query(CoinTransaction, {userId, activityStreakId})
            .where('userId', '=', 'userId')
            .and('activityStreakId', '=', 'activityStreakId')
            .getMany();
    }

    async getCoinsForAnswerStreakAsync(
        userId: Id<'User'>,
        answerStreakId: Id<'GivenAnswerStreak'>
    ) {

        return await this._ormConnectionService
            .query(CoinTransaction, {userId, answerStreakId})
            .where('userId', '=', 'userId')
            .and('givenAnswerStreakId', '=', 'answerStreakId')
            .getMany();
    }
}
