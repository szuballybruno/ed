import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserSpentTimeRatioView {

    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    totalExamSessionElapsedTime: number;

    @ViewColumn()
    @XViewColumn()
    totalVideoWatchElapsedTime: number;

    @ViewColumn()
    @XViewColumn()
    totalQuestionElapsedTime: number;

    @ViewColumn()
    @XViewColumn()
    otherTotalSpentSeconds: number;
}
