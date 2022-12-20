import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class CourseExamCountView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    examCount: number;
}