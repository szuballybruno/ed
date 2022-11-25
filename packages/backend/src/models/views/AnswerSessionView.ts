import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';


export class AnswerSessionView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    isSuccessful: boolean;

    @XViewColumn()
    isCompleted: boolean;

    @XViewColumn()
    answeredQuestionCount: number;

    @XViewColumn()
    correctGivenAnswerCount: number;

    @XViewColumn()
    givenAnswerCount: number;

    @XViewColumn()
    answerSessionAcquiredPoints: number;

    @XViewColumn()
    answerSessionSuccessRate: number;
}
