import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


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
