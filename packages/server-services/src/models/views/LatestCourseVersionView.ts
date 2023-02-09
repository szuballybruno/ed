import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class LatestCourseVersionView {

    @XViewColumn()
    versionId: Id<'CourseVersion'>;

    @XViewColumn()
    courseId: Id<'Course'>;
}