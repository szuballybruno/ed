import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class CompletedCourseItemCountView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    completedCourseItemCount: number;
}