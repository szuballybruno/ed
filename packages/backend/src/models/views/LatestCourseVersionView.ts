import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';


export class LatestCourseVersionView {

    @XViewColumn()
    versionId: Id<'CourseVersion'>;

    @XViewColumn()
    courseId: Id<'Course'>;
}