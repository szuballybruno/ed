import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CourseItemCountView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    itemCount: number;
}