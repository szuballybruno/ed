import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';


export class LatestCourseVersionView {

    @XViewColumn()
    versionId: Id<'CourseVersion'>;

    @XViewColumn()
    courseId: Id<'Course'>;
}