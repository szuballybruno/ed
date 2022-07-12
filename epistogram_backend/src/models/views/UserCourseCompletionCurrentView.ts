import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { Course } from '../entity/course/Course';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserCourseCompletionCurrentView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    courseId: Id<'Course'>;

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
    requiredLengthDays: number;

    @ViewColumn()
    @XViewColumn()
    requiredCompletionDate: Date;

    @ViewColumn()
    @XViewColumn()
    requiredRemainingDays: number;

    @ViewColumn()
    @XViewColumn()
    requiredItemsPerDay: number;

    @ViewColumn()
    @XViewColumn()
    requiredItemsCompletedByNow: number;

    @ViewColumn()
    @XViewColumn()
    requiredPercentCompletedByNow: number;

    @ViewColumn()
    @XViewColumn()
    startDate: Date;
}