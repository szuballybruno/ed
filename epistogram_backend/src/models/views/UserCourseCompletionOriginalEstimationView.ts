import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserCourseCompletionOriginalEstimationView {

    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    courseId: number;

    @ViewColumn()
    @XViewColumn()
    previsionedItemsPerDay: number;

    @ViewColumn()
    @XViewColumn()
    previsionedDurationDays: number;

    @ViewColumn()
    @XViewColumn()
    previsionedCompletionDate: Date;
}