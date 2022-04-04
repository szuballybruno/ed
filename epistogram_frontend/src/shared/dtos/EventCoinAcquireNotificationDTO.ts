import { CoinAcquireReasonType } from '../types/sharedTypes';

export type EventCoinAcquireNotificationDTO = {
    amount: number,
    reason: CoinAcquireReasonType
}