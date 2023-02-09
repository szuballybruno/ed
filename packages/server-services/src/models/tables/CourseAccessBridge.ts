import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class CourseAccessBridge {

    @XViewColumn()
    id: Id<'CourseAccessBridge'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    userId: Id<'User'> | null;

    @XViewColumn()
    companyId: Id<'Company'> | null;
}