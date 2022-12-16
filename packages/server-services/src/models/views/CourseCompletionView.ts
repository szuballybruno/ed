import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class CourseCompletionView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    userId: Id<'User'>;
}