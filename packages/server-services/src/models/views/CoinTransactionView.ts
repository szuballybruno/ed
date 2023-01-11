import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

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
    shopItemName: string;

    @XViewColumn()
    reason: string;
}