import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CourseAllItemsCompletedView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @XViewColumn()
    userId: Id<'User'>;
}