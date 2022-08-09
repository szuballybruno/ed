import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class AnswerSessionView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;

    @ViewColumn()
    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @ViewColumn()
    @XViewColumn()
    isSuccessful: boolean;

    @ViewColumn()
    @XViewColumn()
    isCompleted: boolean;

    @ViewColumn()
    @XViewColumn()
    answeredQuestionCount: number;

    @ViewColumn()
    @XViewColumn()
    correctGivenAnswerCount: number;

    @ViewColumn()
    @XViewColumn()
    givenAnswerCount: number;

    @ViewColumn()
    @XViewColumn()
    answerSessionAcquiredPoints: number;

    @ViewColumn()
    @XViewColumn()
    answerSessionSuccessRate: number;
}
