import { ViewColumn, ViewEntity } from 'typeorm';
import { SessionActivityType } from '../../shared/types/sharedTypes';

@ViewEntity({
    synchronize: false,
    expression: ''
})

export class UserInactiveCourseView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    inactiveCourseCount: number;
}