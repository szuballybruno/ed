import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseProgressView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    courseId: Id<'Course'>;

    @ViewColumn()
    @XViewColumn()
    totalCourseItemCount: number;

    @ViewColumn()
    @XViewColumn()
    completedCourseItemCount: number;

    @ViewColumn()
    @XViewColumn()
    progressPercentage: number;

    @ViewColumn()
    @XViewColumn()
    courseTitle: string;

    @ViewColumn()
    @XViewColumn()
    continueItemCode: string;
}