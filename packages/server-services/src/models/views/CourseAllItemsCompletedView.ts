import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class CourseAllItemsCompletedView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @XViewColumn()
    userId: Id<'User'>;
}