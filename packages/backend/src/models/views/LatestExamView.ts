import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';


export class LatestExamView {

    @XViewColumn()
    examId: Id<'Exam'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    isPretest: boolean;
}