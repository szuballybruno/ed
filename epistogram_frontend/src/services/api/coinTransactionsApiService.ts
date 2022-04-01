import { useReactQuery2 } from "../../static/frontendHelpers";
import { CoinTransactionDTO } from "../../shared/dtos/CoinTransactionDTO";
import { apiRoutes } from "../../shared/types/apiRoutes";
import { usePostDataUnsafe } from "../core/httpClient";

export const useCoinTransactions = () => {

    const qr = useReactQuery2<CoinTransactionDTO[]>(apiRoutes.coinTransactions.getCoinTransactions);

    return {
        coinTransactions: qr.data ?? [],
        coinTransactionsError: qr.error,
        coinTransactionsStatus: qr.state
    };
};

export const useCoinBalance = () => {

    const qr = useReactQuery2<number>(apiRoutes.coinTransactions.getCoinBalance);

    return {
        coinBalance: qr.data ?? 0,
        coinBalanceError: qr.error,
        coinBalanceStatus: qr.state,
        refetchCoinBalance: qr.refetch
    };
};

export const useCoinBalanceOfUser = (userId: number) => {

    const qr = useReactQuery2<number>(apiRoutes.coinTransactions.getCoinBalanceOfUser, { userId });

    return {
        coinBalance: qr.data ?? 0,
        coinBalanceError: qr.error,
        coinBalanceStatus: qr.state,
        refetchCoinBalance: qr.refetch
    };
};

export const useGiftCoinsToUser = () => {

    const qr = usePostDataUnsafe<{ amount: number, userId: number }, void>(apiRoutes.coinTransactions.giftCoinsToUser);

    return {
        giftCoinsToUserAsync: qr.postDataAsync,
        giftCoinsToUserState: qr.state
    };
};