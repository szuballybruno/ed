import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

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