import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { IsDeletedFlag } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class LatestCourseVersionView {

    @ViewColumn()
    @XViewColumn()
    versionId: number;

    @ViewColumn()
    @XViewColumn()
    courseId: number;
}