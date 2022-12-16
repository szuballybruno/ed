import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class CourseItemCountView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    itemCount: number;
}