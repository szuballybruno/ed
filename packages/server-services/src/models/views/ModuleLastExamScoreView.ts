import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

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