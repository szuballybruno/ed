import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


export class CoinTransactionView {

    @XViewColumn()
    id: Id<'CoinTransaction'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    creationDate: Date;

    @XViewColumn()
    amount: number;

    @XViewColumn()
    videoTitle: string;

    @XViewColumn()
    questionText: string;

    @XViewColumn()
    reason: string;
}