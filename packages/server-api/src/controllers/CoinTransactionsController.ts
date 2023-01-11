import { CoinTransactionService } from '@episto/server-services';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { IXGatewayServiceProvider } from '@thinkhub/x-gateway';
import { ActionParams } from '../helpers/ActionParams';
import { XControllerAction } from '@thinkhub/x-gateway';
import { IController } from '../interfaces/IController';

export class CoinTransactionsController implements IController<CoinTransactionsController> {

    private _coinTransactionService: CoinTransactionService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

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