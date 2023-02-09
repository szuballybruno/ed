import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class CourseVideoCountView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    videoCount: number;
}