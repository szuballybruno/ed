import { CoinTransactionService } from "../services/coinTransactionService";
import { ActionParamsType } from "../utilities/helpers";

export class CoinTransactionsController {

    private _coinTransactionService: CoinTransactionService;

    constructor(cts: CoinTransactionService) {

        this._coinTransactionService = cts;
    }

    getCoinTransactionsAction = async (params: ActionParamsType) => {

        return this._coinTransactionService
            .getCoinTransactionsAsync(params.userId);
    }

    getCoinBalanceAction = async (params: ActionParamsType) => {

        return this._coinTransactionService.getCoinBalance(params.userId);
    }
}