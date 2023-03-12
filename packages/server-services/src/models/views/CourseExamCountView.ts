import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CourseExamCountView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    examCount: number;
}