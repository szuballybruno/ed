import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

export class CourseAllItemsCompletedView {

    @XViewColumn()
    courseId: Id<'Course'>;
    
    @XViewColumn()
    userId: Id<'User'>;
}