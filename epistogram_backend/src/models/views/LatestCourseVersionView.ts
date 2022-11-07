import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


export class LatestCourseVersionView {

    @XViewColumn()
    versionId: Id<'CourseVersion'>;

    @XViewColumn()
    courseId: Id<'Course'>;
}