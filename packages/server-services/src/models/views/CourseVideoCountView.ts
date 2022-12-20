import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class CourseVideoCountView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    videoCount: number;
}