import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CourseVersion {

    @XViewColumn()
    id: Id<'CourseVersion'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    courseDataId: Id<'CourseData'>;
}