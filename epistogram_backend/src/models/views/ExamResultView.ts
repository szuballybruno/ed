import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class ExamResultView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @ViewColumn()
    @XViewColumn()
    isFinalExam: boolean;

    @ViewColumn()
    @XViewColumn()
    questionVersionId: Id<'QuestionVersion'>;

    @ViewColumn()
    @XViewColumn()
    questionText: string;

    @ViewColumn()
    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;

    @ViewColumn()
    @XViewColumn()
    isCompletedSession: boolean;

    @ViewColumn()
    @XViewColumn()
    correctGivenAnswerCount: number;

    @ViewColumn()
    @XViewColumn()
    questionCount: number;

    @ViewColumn()
    @XViewColumn()
    isSuccessfulSession: boolean;

    @ViewColumn()
    @XViewColumn()
    onlySuccessfulSession: boolean;

    @ViewColumn()
    @XViewColumn()
    givenAnswerId: Id<'GivenAnswer'>;

    @ViewColumn()
    @XViewColumn()
    isCorrect: boolean;

    @ViewColumn()
    @XViewColumn()
    answerBridgeId: Id<'AnswerGivenAnswerBridge'>;

    @ViewColumn()
    @XViewColumn()
    userAnswerVersionId: Id<'AnswerVersion'>;

    @ViewColumn()
    @XViewColumn()
    answerId: Id<'Answer'>;

    @ViewColumn()
    @XViewColumn()
    isAnswerCorrect: boolean;

    @ViewColumn()
    @XViewColumn()
    isGivenAnswer: boolean;

    @ViewColumn()
    @XViewColumn()
    answerText: string;
}