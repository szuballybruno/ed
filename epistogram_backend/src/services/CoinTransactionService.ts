import { CoinTransaction } from '../models/entity/CoinTransaction';
import { CoinTransactionDTO } from '../shared/dtos/CoinTransactionDTO';
import { CoinBalanceView } from '../models/views/CoinBalanceView';
import { CoinTransactionView } from '../models/views/CoinTransactionView';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { InsertCoinFnParamsType, SQLFunctionsService } from './sqlServices/FunctionsService';
import { PrincipalId } from '../utilities/ActionParams';

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
            .getRepository(CoinBalanceView)
            .findOneOrFail({
                where: {
                    userId: userId
                }
            });

        return coinBalance.coinBalance;
    }

    async giftCoinsToUserAsync(userId: number, amount: number) {

        await this._ormConnectionService
            .getRepository(CoinTransaction)
            .insert({
                userId,
                amount,
                isGifted: true
            });
    }

    async getCoinTransactionsAsync(userId: PrincipalId) {

        const coinTransactions = await this._ormConnectionService
            .getRepository(CoinTransactionView)
            .find({
                where: {
                    userId: userId.toSQLValue()
                }
            });

        return coinTransactions
            .map(x => this._mapperService
                .map(CoinTransactionView, CoinTransactionDTO, x));
    }

    async getCoinsForQuestionAsync(userId: number, questionVersionId: number) {

        return await this._ormConnectionService
            .getRepository(CoinTransaction)
            .createQueryBuilder('ca')
            .leftJoinAndSelect('ca.givenAnswer', 'ga')
            .where('ca.userId = :userId', { userId })
            .andWhere('ga.question_version_id = :questionVersionId', { questionVersionId })
            .andWhere('ca.given_answer_id IS NOT NULL')
            .getMany();
    }

    async getCoinsForActivitySession(userId: number, activitySessionId: number) {

        return await this._ormConnectionService
            .getRepository(CoinTransaction)
            .findOne({
                where: {
                    userId,
                    activitySessionId
                }
            });
    }

    async getCoinsForActivityStreakAsync(userId: number, activityStreakId: number) {

        return await this._ormConnectionService
            .getRepository(CoinTransaction)
            .find({
                where: {
                    userId: userId,
                    activityStreakId
                }
            });
    }

    async getCoinsForAnswerStreakAsync(userId: number, answerStreakId: number) {

        return await this._ormConnectionService
            .getRepository(CoinTransaction)
            .createQueryBuilder('ca')
            .where('ca.userId = :userId', { userId })
            .andWhere('ca.given_answer_streak_id = :gasid', { gasid: answerStreakId })
            .getMany();
    }
}