import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserWeeklyCourseItemProgressView {

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
    isCurrent: boolean;

    @ViewColumn()
    @XViewColumn()
    completedItemCount: number;
}