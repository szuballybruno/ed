import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class CourseExamCountView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    examCount: number;
}