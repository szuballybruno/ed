import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseItemAllView {

    @ViewColumn()
    @XViewColumn()
    courseId: number;

    @ViewColumn()
    @XViewColumn()
    videoId: number;

    @ViewColumn()
    @XViewColumn()
    examId: number;

    @ViewColumn()
    @XViewColumn()
    orderIndex: number;
}