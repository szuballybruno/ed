import { CoinTransaction } from '../models/entity/CoinTransaction';
import { CoinTransactionDTO } from '../shared/dtos/CoinTransactionDTO';
import { CoinBalanceView } from '../models/views/CoinBalanceView';
import { CoinTransactionView } from '../models/views/CoinTransactionView';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { InsertCoinFnParamsType, SQLFunctionsService } from './sqlServices/FunctionsService';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { GivenAnswer } from '../models/entity/GivenAnswer';
import { Id } from '../shared/types/versionId';
import { ControllerActionReturnType } from '../utilities/XTurboExpress/XTurboExpressTypes';
import { AuthorizationService } from './AuthorizationService';

export class CoinTransactionService {

    private _funcService: SQLFunctionsService;
    private _mapperService: MapperService;
    private _ormConnectionService: ORMConnectionService;
    private _authorizationService: AuthorizationService;

    constructor(
        funcService: SQLFunctionsService,
        ormConnService: ORMConnectionService,
        mapperService: MapperService,
        authorizationService: AuthorizationService) {

        this._funcService = funcService;
        this._mapperService = mapperService;
        this._ormConnectionService = ormConnService;
        this._authorizationService = authorizationService;
    }

    async makeCoinTransactionAsync(insertCoinFnParamsType: InsertCoinFnParamsType) {

        await this._funcService.insertCoinAcquiredFn(insertCoinFnParamsType);
    }

    getPrincipalCoinBalance(principalId: PrincipalId): ControllerActionReturnType {

        return {
            action: async () => {

                return await this.getCoinBalance(principalId, principalId.getId());
            },
            auth: async () => {
                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'ACCESS_APPLICATION')
            }
        }
    }

    private async getCoinBalance(principalId: PrincipalId, userId: Id<'User'>) {

        const coinBalance = await this._ormConnectionService
            .query(CoinBalanceView, { userId })
            .where('userId', '=', 'userId')
            .getSingle();

        return coinBalance.coinBalance;
    }

    getCoinBalanceAsync(
        principalId: PrincipalId,
        userId: Id<'User'>
    ): ControllerActionReturnType {

        return {
            action: async () => {
                const coinBalance = await this._ormConnectionService
                    .query(CoinBalanceView, { userId })
                    .where('userId', '=', 'userId')
                    .getSingle();

                return coinBalance.coinBalance;
            },
            auth: async () => {
                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'ACCESS_APPLICATION')
            }
        }


    }

    giftCoinsToUserAsync(
        principalId: PrincipalId
    ): ControllerActionReturnType {

        return {
            action: async () => {
                const coinTransactions = await this._ormConnectionService
                    .query(CoinTransactionView, { userId: principalId.toSQLValue() })
                    .where('userId', '=', 'userId')
                    .getMany();

                return this._mapperService
                    .mapTo(CoinTransactionDTO, [coinTransactions]);
            },
            auth: async () => {
                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'ADD_EPISTO_COIN_TO_USERS')
            }
        }
    }

    getCoinTransactionsAsync(
        userId: PrincipalId
    ): ControllerActionReturnType {

        return {
            action: async () => {
                const coinTransactions = await this._ormConnectionService
                    .query(CoinTransactionView, { userId: userId.toSQLValue() })
                    .where('userId', '=', 'userId')
                    .getMany();

                return this._mapperService
                    .mapTo(CoinTransactionDTO, [coinTransactions]);
            },
            auth: async () => {
                return this._authorizationService
                    .getCheckPermissionResultAsync(userId, 'ACCESS_APPLICATION')
            }
        }
    }

    async getCoinsForQuestionAsync(
        userId: Id<'User'>,
        questionVersionId: Id<'QuestionVersion'>
    ) {

        return await this._ormConnectionService
            .query(CoinTransaction, { userId, questionVersionId })
            .leftJoin(GivenAnswer, x => x
                .on('id', '=', 'givenAnswerId', CoinTransaction)
                .and('questionVersionId', '=', 'questionVersionId'))
            .where('userId', '=', 'userId')
            .and('givenAnswerId', 'IS NOT', 'NULL')
            .getMany();
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