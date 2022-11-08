import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';

export class CourseAllItemsCompletedView {

    @XViewColumn()
    courseVersionId: Id<'Course'>;
    @XViewColumn()
    userId: Id<'User'>;
}