import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

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