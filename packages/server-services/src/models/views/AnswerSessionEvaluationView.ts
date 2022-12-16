import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

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