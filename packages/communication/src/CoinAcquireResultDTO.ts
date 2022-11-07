import { CoinAcquireReasonType } from '../types/sharedTypes';

export type CoinAcquireResultDTO = {
    amount: number;
    reason: CoinAcquireReasonType;
}