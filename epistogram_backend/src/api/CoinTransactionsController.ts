import { CoinTransactionService } from '../services/CoinTransactionService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class CoinTransactionsController {

    private _coinTransactionService: CoinTransactionService;

    constructor(cts: CoinTransactionService) {

        this._coinTransactionService = cts;
    }

    @XControllerAction(apiRoutes.coinTransactions.getCoinTransactions)
    getCoinTransactionsAction = async (params: ActionParams) => {

        return this._coinTransactionService
            .getCoinTransactionsAsync(params.principalId);
    };

    @XControllerAction(apiRoutes.coinTransactions.getCoinBalance)
    getCoinBalanceAction = async (params: ActionParams) => {

        return this._coinTransactionService
            .getPrincipalCoinBalance(params.principalId);
    };

    @XControllerAction(apiRoutes.coinTransactions.getCoinBalanceOfUser)
    getCoinBalanceOfUserAction = async (params: ActionParams) => {

        const userId = params
            .getQuery<any>()
            .getValue(x => x.userId, 'int');

        return this._coinTransactionService
            .getCoinBalance(params.principalId, userId);
    };

    @XControllerAction(apiRoutes.coinTransactions.giftCoinsToUser, { isPost: true })
    giftCoinsToUser = async (params: ActionParams) => {

        const dto = params
            .getBody<{ userId: number, amount: number }>();

        const userId = dto
            .getValue(x => x.userId, 'int');

        const amount = dto
            .getValue(x => x.amount, 'int');

        return await this._coinTransactionService
            .giftCoinsToUserAsync(userId, amount);
    };
}