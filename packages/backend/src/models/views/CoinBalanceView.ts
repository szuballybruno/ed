import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';


export class CoinBalanceView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    coinBalance: number;
}
