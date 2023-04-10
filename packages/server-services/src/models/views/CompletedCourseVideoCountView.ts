import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CompletedCourseVideoCountView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    completedVideoCount: number;
}