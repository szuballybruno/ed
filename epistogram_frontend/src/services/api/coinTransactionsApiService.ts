import { useReactQuery2 } from "../../static/frontendHelpers";
import { CoinTransactionDTO } from "../../models/shared_models/CoinTransactionDTO";
import { apiRoutes } from "../../models/shared_models/types/apiRoutes";

export const useCoinTransactions = () => {

    const qr = useReactQuery2<CoinTransactionDTO[]>(apiRoutes.coinTransactions.getCoinTransactions);

    return {
        coinTransactions: qr.data ?? [],
        coinTransactionsError: qr.error,
        coinTransactionsStatus: qr.state
    }
}

export const useCoinBalance = () => {

    const qr = useReactQuery2<number>(apiRoutes.coinTransactions.getCoinBalance);

    return {
        coinBalance: qr.data ?? 0,
        coinBalanceError: qr.error,
        coinBalanceStatus: qr.state,
        refetchCoinBalance: qr.refetch
    }
}