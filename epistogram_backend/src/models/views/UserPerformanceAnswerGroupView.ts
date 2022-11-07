import { Id } from '../../shared/types/versionId';
import { XViewColumn } from '../../services/XORM/XORMDecorators';


export class UserPerformanceAnswerGroupView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    examCorrectAnswerRate: number;

    @XViewColumn()
    practiseCorrectAnswerRate: number;

    @XViewColumn()
    videoCorrectAnswerRate: number;
}