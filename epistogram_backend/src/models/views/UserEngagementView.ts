import { ViewColumn, ViewEntity } from 'typeorm';
import { SessionActivityType } from '../../shared/types/sharedTypes';

@ViewEntity({
    synchronize: false,
    expression: ''
})

export class UserEngagementView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    engagementPoints: number;
}