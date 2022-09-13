import { ViewColumn, ViewEntity } from '../MyORM';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class LatestExamView {

    @ViewColumn()
    @XViewColumn()
    examId: Id<'Exam'>;

    @ViewColumn()
    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @ViewColumn()
    @XViewColumn()
    courseId: Id<'Course'>;

    @ViewColumn()
    @XViewColumn()
    isPretest: boolean;
}