import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class AnswerSessionGroupView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    answerSessionType: string;

    @XViewColumn()
    startDate: Date;

    @XViewColumn()
    answerSessionSuccessRate: number;
}