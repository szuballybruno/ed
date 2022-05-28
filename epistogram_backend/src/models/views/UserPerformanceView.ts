import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { SessionActivityType } from '../../shared/types/sharedTypes';

@ViewEntity({
    synchronize: false,
    expression: ''
})

export class UserPerformanceView {

    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    performancePercentage: number;

    @ViewColumn()
    @XViewColumn()
    totalPerformancePercentage: number;

    @ViewColumn()
    @XViewColumn()
    userExamLengthPoints: number;

    @ViewColumn()
    @XViewColumn()
    userReactionTimePoints: number;
}