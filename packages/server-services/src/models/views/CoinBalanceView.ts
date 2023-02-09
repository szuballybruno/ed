import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class CoinBalanceView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    coinBalance: number;
}