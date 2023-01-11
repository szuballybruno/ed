import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

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