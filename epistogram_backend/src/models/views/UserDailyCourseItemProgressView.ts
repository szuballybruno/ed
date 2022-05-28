import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserDailyCourseItemProgressView {

    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    courseId: number;

    @ViewColumn()
    @XViewColumn()
    completionDate: Date;

    @ViewColumn()
    @XViewColumn()
    completedItemCount: number;

    @ViewColumn()
    @XViewColumn()
    completedPercentage: number;

    @ViewColumn()
    @XViewColumn()
    isCurrent: number;

    @ViewColumn()
    @XViewColumn()
    offsetDaysFromStart: number;
}