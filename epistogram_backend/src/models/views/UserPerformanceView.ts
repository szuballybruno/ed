import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})

export class UserPerformanceView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    performancePercentage: number;

    /*     @ViewColumn()
        @XViewColumn()
        userExamLengthPoints: number;
    
        @ViewColumn()
        @XViewColumn()
        userReactionTimePoints: number; */
}