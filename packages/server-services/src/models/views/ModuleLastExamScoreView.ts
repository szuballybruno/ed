import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class ModuleLastExamScoreView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    examScore: number;

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    courseId: Id<'Course'>;
}