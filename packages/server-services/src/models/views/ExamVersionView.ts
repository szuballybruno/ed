import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class ExamVersionView {

    @XViewColumn()
    examId: Id<'Exam'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    examDataId: Id<'ExamData'>;

    @XViewColumn()
    moduleVersionId: Id<'ModuleVersion'>;

    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;
}