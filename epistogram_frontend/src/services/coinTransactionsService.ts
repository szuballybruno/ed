import { useReactQuery } from "../frontendHelpers";
import { CoinTransactionDTO } from "../models/shared_models/CoinTransactionDTO";
import { apiRoutes } from "../models/shared_models/types/apiRoutes";
import { httpGetAsync } from "./httpClient";

export const useCoinTransactions = () => {

    const qr = useReactQuery<CoinTransactionDTO[]>(
        ["getCoinTransactions"],
        () => httpGetAsync(apiRoutes.coinTransactions.getCoinTransactions));

    return {
        coinTransactions: qr.data ?? [],
        coinTransactionsError: qr.error,
        coinTransactionsStatus: qr.status
    }
}

export const useCoinBalance = () => {

    const qr = useReactQuery<number>(
        ["getCoinBalance"],
        () => httpGetAsync(apiRoutes.coinTransactions.getCoinBalance));

    return {
        coinBalance: qr.data ?? 0,
        coinBalanceError: qr.error,
        coinBalanceStatus: qr.status
    }
}