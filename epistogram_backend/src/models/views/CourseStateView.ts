import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

export class CourseStateView {

    @XViewColumn()
    courseId: Id<'Course'>;
    @XViewColumn()
    userId: Id<'User'>;
    @XViewColumn()
    isCurrent: boolean;
    @XViewColumn()
    inProgress: boolean;
    @XViewColumn()
    isCompleted: boolean;
}