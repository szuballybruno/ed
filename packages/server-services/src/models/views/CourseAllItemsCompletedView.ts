import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class CourseAllItemsCompletedView {

    @XViewColumn()
    courseVersionId: Id<'Course'>;
    @XViewColumn()
    userId: Id<'User'>;
}