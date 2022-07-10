import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { Course } from '../entity/course/Course';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserWeeklyCourseItemProgressView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<User>;

    @ViewColumn()
    @XViewColumn()
    courseId: Id<Course>;

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