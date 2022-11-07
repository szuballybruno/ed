import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


export class CoinBalanceView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    coinBalance: number;
}
