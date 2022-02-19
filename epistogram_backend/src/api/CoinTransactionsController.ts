import { CoinTransactionService } from "../services/CoinTransactionService";
import { ActionParams } from "../utilities/helpers";

export class CoinTransactionsController {

    private _coinTransactionService: CoinTransactionService;

    constructor(cts: CoinTransactionService) {

        this._coinTransactionService = cts;
    }

    getCoinTransactionsAction = async (params: ActionParams) => {

        return this._coinTransactionService
            .getCoinTransactionsAsync(params.currentUserId);
    }

    getCoinBalanceAction = async (params: ActionParams) => {

        return this._coinTransactionService
            .getCoinBalance(params.currentUserId);
    }

    getCoinBalanceOfUserAction = async (params: ActionParams) => {

        const userId = params
            .getQuery<any>()
            .getValue(x => x.userId, "int");

        return this._coinTransactionService
            .getCoinBalance(userId);
    }

    giftCoinsToUser = async (params: ActionParams) => {

        const dto = params
            .getBody<{ userId: number, amount: number }>();

        const userId = dto
            .getValue(x => x.userId, "int");

        const amount = dto
            .getValue(x => x.amount, "int");

        return await this._coinTransactionService
            .giftCoinsToUserAsync(userId, amount);
    }
}