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
import { LoggerService } from './LoggerService';

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

        await this
            ._funcService
            .insertCoinAcquiredFn(params);
    }

    getPrincipalCoinBalance(principalId: PrincipalId) {

        return {
            action: async () => {

                return this
                    .getCoinBalance(principalId, principalId.getId())
                    .action();
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'ACCESS_APPLICATION');
            }
        };
    }

    getCoinBalance(
        principalId: PrincipalId,
        userId: Id<'User'>
    ) {

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
                    .checkPermissionAsync(principalId, 'ACCESS_APPLICATION');
            }
        };
    }

    giftCoinsToUserAsync(
        principalId: PrincipalId,
        userId: Id<'User'>,
        amount: number
    ) {

        return {
            action: async () => {

                return this._ormConnectionService
                    .createAsync(CoinTransaction, {
                        userId,
                        amount,
                        isGifted: true
                    } as CoinTransaction);
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'ADD_EPISTO_COIN_TO_USERS');
            }
        };
    }

    getCoinTransactionsAsync(
        userId: PrincipalId
    ) {

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
                    .checkPermissionAsync(userId, 'ACCESS_APPLICATION');
            }
        };
    }

    async getCoinsForQuestionAsync(
        userId: Id<'User'>,
        questionVersionId: Id<'QuestionVersion'>
    ) {

        return await this._ormConnectionService
            .query(CoinTransaction, { userId, questionVersionId })
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