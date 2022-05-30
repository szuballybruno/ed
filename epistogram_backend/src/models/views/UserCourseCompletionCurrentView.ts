import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserCourseCompletionCurrentView {

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
    previsionedCompletionDate: Date;

    @ViewColumn()
    @XViewColumn()
    previsionedLengthDays: number;

    @ViewColumn()
    @XViewColumn()
    startDate: Date;
}