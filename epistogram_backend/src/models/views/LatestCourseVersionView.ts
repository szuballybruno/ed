import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class LatestCourseVersionView {

    @ViewColumn()
    @XViewColumn()
    versionId: Id<'CourseVersion'>;

    @ViewColumn()
    @XViewColumn()
    courseId: Id<'Course'>;
}