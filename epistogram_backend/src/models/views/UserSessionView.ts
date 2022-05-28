import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserSessionView {

    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    sessionStartDate: Date;

    @ViewColumn()
    @XViewColumn()
    sessionEndDate: Date;
}
