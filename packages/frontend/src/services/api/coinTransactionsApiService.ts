import { QueryService } from '../../static/XQuery/XQueryReact';
import { CoinTransactionDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { usePostDataUnsafe } from '../core/httpClient';
import { Id } from '@episto/commontypes';

export const useCoinTransactions = () => {

    const qr = QueryService.useXQuery<CoinTransactionDTO[]>(apiRoutes.coinTransactions.getCoinTransactions);

    return {
        coinTransactions: qr.data ?? [],
        coinTransactionsError: qr.error,
        coinTransactionsStatus: qr.state
    };
};

export const useCoinBalance = () => {

    const qr = QueryService.useXQuery<number>(apiRoutes.coinTransactions.getCoinBalance);

    return {
        coinBalance: qr.data ?? 0,
        coinBalanceError: qr.error,
        coinBalanceStatus: qr.state,
        refetchCoinBalance: qr.refetch
    };
};

export const useCoinBalanceOfUser = (userId: Id<'User'> | null) => {

    const qr = QueryService.useXQuery<{ coinBalance: number }>(apiRoutes.coinTransactions.getCoinBalanceOfUser, { userId }, !!userId);

    return {
        coinBalance: qr.data?.coinBalance ?? 0,
        coinBalanceError: qr.error,
        coinBalanceStatus: qr.state,
        refetchCoinBalance: qr.refetch
    };
};

export const useGiftCoinsToUser = () => {

    const qr = usePostDataUnsafe<{ amount: number, userId: Id<'User'> }, void>(apiRoutes.coinTransactions.giftCoinsToUser);

    return {
        giftCoinsToUserAsync: qr.postDataAsync,
        giftCoinsToUserState: qr.state
    };
};