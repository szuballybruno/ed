import { CoinAcquireReasonType } from '@episto/commontypes';

export type CoinAcquireResultDTO = {
    amount: number;
    reason: CoinAcquireReasonType;
}