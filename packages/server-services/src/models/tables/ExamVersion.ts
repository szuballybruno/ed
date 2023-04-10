import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

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