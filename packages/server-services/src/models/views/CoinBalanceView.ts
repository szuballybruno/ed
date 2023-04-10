import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CoinBalanceView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    coinBalance: number;
}