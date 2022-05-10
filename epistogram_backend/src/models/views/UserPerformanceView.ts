import { ViewColumn, ViewEntity } from 'typeorm';
import { SessionActivityType } from '../../shared/types/sharedTypes';

@ViewEntity({
    synchronize: false,
    expression: ''
})

export class UserPerformanceView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    performancePercentage: number;

    @ViewColumn()
    userExamLengthPoints: number;

    @ViewColumn()
    userReactionTimePoints: number;
}