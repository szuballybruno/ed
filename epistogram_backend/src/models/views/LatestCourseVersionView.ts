import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { IsDeletedFlag } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { Course } from '../entity/course/Course';
import { CourseVersion } from '../entity/course/CourseVersion';

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