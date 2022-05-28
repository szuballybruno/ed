import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CoinTransactionView {

    @ViewColumn()
    @XViewColumn()
    id: number;

    @ViewColumn()
    @XViewColumn()
    userId: number;

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