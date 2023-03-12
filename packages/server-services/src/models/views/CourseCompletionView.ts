import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CourseCompletionView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    userId: Id<'User'>;
}