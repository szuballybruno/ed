import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

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