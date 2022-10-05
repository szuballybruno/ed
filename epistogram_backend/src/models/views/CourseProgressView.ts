import { ViewColumn, ViewEntity } from '../MyORM';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { CourseStageNameType } from '../../shared/types/sharedTypes';

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
    currentItemCode: string;

    @ViewColumn()
    @XViewColumn()
    currentStageName: CourseStageNameType;
}