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
    givenAnswerId: number;

    @ViewColumn()
    givenAnswerType: string;

    @ViewColumn()
    givenAnswerIsCorrect: boolean;
}