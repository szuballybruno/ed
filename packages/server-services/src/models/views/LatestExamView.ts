import { XViewColumn } from '@episto/x-orm';
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