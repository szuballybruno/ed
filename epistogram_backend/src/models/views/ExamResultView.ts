import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class ExamResultView {

    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    examId: number;

    @ViewColumn()
    @XViewColumn()
    isFinalExam: boolean;

    @ViewColumn()
    @XViewColumn()
    questionId: number;

    @ViewColumn()
    @XViewColumn()
    questionText: string;

    @ViewColumn()
    @XViewColumn()
    answerSessionId: number;

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
    givenAnswerId: number;

    @ViewColumn()
    @XViewColumn()
    isCorrect: boolean;

    @ViewColumn()
    @XViewColumn()
    answerBridgeId: number;

    @ViewColumn()
    @XViewColumn()
    userAnswerId: number;

    @ViewColumn()
    @XViewColumn()
    answerId: number;

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