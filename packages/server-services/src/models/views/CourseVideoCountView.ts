import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CourseVideoCountView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    videoCount: number;
}