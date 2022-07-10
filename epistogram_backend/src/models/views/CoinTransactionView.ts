import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { CoinTransaction } from '../entity/CoinTransaction';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CoinTransactionView {

    @ViewColumn()
    @XViewColumn()
    id: Id<CoinTransaction>;

    @ViewColumn()
    @XViewColumn()
    userId: Id<User>;

    @ViewColumn()
    @XViewColumn()
    creationDate: Date;

    @ViewColumn()
    @XViewColumn()
    amount: number;

    @ViewColumn()
    @XViewColumn()
    videoTitle: string;

    @ViewColumn()
    @XViewColumn()
    questionText: string;

    @ViewColumn()
    @XViewColumn()
    reason: string;
}