import { CoinTransactionService } from '../services/CoinTransactionService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { Id } from '../shared/types/versionId';
import { ServiceProvider } from '../startup/serviceDependencyContainer';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class CoinTransactionsController implements XController<CoinTransactionsController> {

    private _coinTransactionService: CoinTransactionService;

    constructor(serviceProvider: ServiceProvider) {

        this._coinTransactionService = serviceProvider.getService(CoinTransactionService);
    }

    @XControllerAction(apiRoutes.coinTransactions.getCoinTransactions)
    getCoinTransactionsAction(params: ActionParams) {

        return this._coinTransactionService
            .getCoinTransactionsAsync(params.principalId);
    }

    @XControllerAction(apiRoutes.coinTransactions.getCoinBalance)
    getCoinBalanceAction(params: ActionParams) {

        return this._coinTransactionService
            .getPrincipalCoinBalance(params.principalId);
    }

    @XControllerAction(apiRoutes.coinTransactions.getCoinBalanceOfUser)
    getCoinBalanceOfUserAction(params: ActionParams) {

        const userId = params
            .getQuery<{ userId: Id<'User'> }>()
            .getValue(x => x.userId, 'int');

        return this._coinTransactionService
            .getCoinBalance(params.principalId, userId);
    }

    @XControllerAction(apiRoutes.coinTransactions.giftCoinsToUser, { isPost: true })
    giftCoinsToUser(params: ActionParams) {

        const dto = params
            .getBody<{ userId: Id<'User'>, amount: number }>();

        const userId = dto
            .getValue(x => x.userId, 'int');

        const amount = dto
            .getValue(x => x.amount, 'int');

        return this._coinTransactionService
            .giftCoinsToUserAsync(params.principalId, userId, amount);
    }
}