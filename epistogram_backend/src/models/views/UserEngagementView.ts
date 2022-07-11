import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { SessionActivityType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})

export class UserEngagementView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    engagementPoints: number;
}