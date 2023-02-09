import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class AnswerSessionEvaluationView {

    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    questionCount: number;

    @XViewColumn()
    answeredQuestionCount: number;

    @XViewColumn()
    isCompleted: boolean;

    @XViewColumn()
    correctAnswerCount: number;

    @XViewColumn()
    isSuccessful: boolean;

    @XViewColumn()
    correctAnswerRate: number;
}