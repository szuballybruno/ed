import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class UserCourseAccessBridge {

    @XViewColumn()
    id: Id<'UserCourseAccessBridge'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;
}