import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class AnswerSessionView {

    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    startDate: Date;

    @XViewColumn()
    answerSessionAcquiredPoints: number;

    @XViewColumn()
    answerSessionSuccessRate: number;

    @XViewColumn()
    isSuccessful: boolean;

    @XViewColumn()
    correctGivenAnswerCount: number;

    @XViewColumn()
    givenAnswerCount: number;

    @XViewColumn()
    isCompleted: boolean;

    @XViewColumn()
    endDate: Date;

    @XViewColumn()
    answeredQuestionCount: number;

    @XViewColumn()
    answerSessionType: string;
}