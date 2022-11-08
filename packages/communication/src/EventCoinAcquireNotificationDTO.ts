import { CoinAcquireReasonType } from '@episto/commontypes';

export type EventCoinAcquireNotificationDTO = {
    amount: number,
    reason: CoinAcquireReasonType
}