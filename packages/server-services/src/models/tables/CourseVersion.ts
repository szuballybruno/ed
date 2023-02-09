import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class CourseVersion {

    @XViewColumn()
    id: Id<'CourseVersion'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    courseDataId: Id<'CourseData'>;
}