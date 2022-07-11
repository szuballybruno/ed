import { CoinTransaction } from '../models/entity/CoinTransaction';
import { CoinTransactionDTO } from '../shared/dtos/CoinTransactionDTO';
import { CoinBalanceView } from '../models/views/CoinBalanceView';
import { CoinTransactionView } from '../models/views/CoinTransactionView';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { InsertCoinFnParamsType, SQLFunctionsService } from './sqlServices/FunctionsService';
import { PrincipalId } from '../utilities/ActionParams';
import { GivenAnswer } from '../models/entity/GivenAnswer';

export class CoinTransactionService {

    private _funcService: SQLFunctionsService;
    private _mapperService: MapperService;
    private _ormConnectionService: ORMConnectionService;

    constructor(funcService: SQLFunctionsService, ormConnService: ORMConnectionService, mapperService: MapperService) {

        this._funcService = funcService;
        this._mapperService = mapperService;
        this._ormConnectionService = ormConnService;
    }

    async makeCoinTransactionAsync(insertCoinFnParamsType: InsertCoinFnParamsType) {

        await this._funcService.insertCoinAcquiredFn(insertCoinFnParamsType);
    }

    async getPrincipalCoinBalance(userId: PrincipalId) {

        return await this.getCoinBalance(userId, userId.toSQLValue());
    }

    async getCoinBalance(principalId: PrincipalId, userId: number) {

        const coinBalance = await this._ormConnectionService
            .query(CoinBalanceView, { userId })
            .where('userId', '=', 'userId')
            .getSingle();

        return coinBalance.coinBalance;
    }

    async giftCoinsToUserAsync(userId: number, amount: number) {

        await this._ormConnectionService
            .createAsync(CoinTransaction, {
                userId,
                amount,
                isGifted: true
            } as CoinTransaction);
    }

    async getCoinTransactionsAsync(userId: PrincipalId) {

        const coinTransactions = await this._ormConnectionService
            .query(CoinTransactionView, { userId: userId.toSQLValue() })
            .where('userId', '=', 'userId')
            .getMany();

        return this._mapperService
            .mapTo(CoinTransactionDTO, [coinTransactions]);
    }

    async getCoinsForQuestionAsync(userId: number, questionVersionId: number) {

        return await this._ormConnectionService
            .query(CoinTransaction, { userId, questionVersionId })
            .leftJoin(GivenAnswer, x => x
                .on('id', '=', 'givenAnswerId', CoinTransaction)
                .and('questionVersionId', '=', 'questionVersionId'))
            .where('userId', '=', 'userId')
            .and('givenAnswerId', 'IS NOT', 'NULL')
            .getMany();

    }

    async getCoinsForActivitySession(userId: number, activitySessionId: number) {

        return await this._ormConnectionService
            .query(CoinTransaction, { userId, activitySessionId })
            .where('userId', '=', 'userId')
            .and('activitySessionId', '=', 'activitySessionId')
            .getOneOrNull();
    }

    async getCoinsForActivityStreakAsync(userId: number, activityStreakId: number) {

        return await this._ormConnectionService
            .query(CoinTransaction, { userId, activityStreakId })
            .where('userId', '=', 'userId')
            .and('activityStreakId', '=', 'activityStreakId')
            .getMany();
    }

    async getCoinsForAnswerStreakAsync(userId: number, answerStreakId: number) {

        return await this._ormConnectionService
            .query(CoinTransaction, { userId, answerStreakId })
            .where('userId', '=', 'userId')
            .and('givenAnswerStreakId', '=', 'answerStreakId')
            .getMany();
    }
}