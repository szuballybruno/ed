import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class CourseItemCountView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    itemCount: number;
}