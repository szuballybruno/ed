import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class ModuleLastExamView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    examId: Id<'Exam'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    itemOrderIndex: number;
}