import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class ExamVersion {

    @XViewColumn()
    id: Id<'ExamVersion'>;

    @XViewColumn()
    examDataId: Id<'ExamData'>;

    @XViewColumn()
    moduleVersionId: Id<'ModuleVersion'>;

    @XViewColumn()
    examId: Id<'Exam'>;
}