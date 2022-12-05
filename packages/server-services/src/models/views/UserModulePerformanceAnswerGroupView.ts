import { Id } from '@episto/commontypes';
import { XViewColumn } from '@episto/x-orm';


export class UserModulePerformanceAnswerGroupView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    examCorrectAnswerRate: number;

    @XViewColumn()
    practiseCorrectAnswerRate: number;

    @XViewColumn()
    videoCorrectAnswerRate: number;
}