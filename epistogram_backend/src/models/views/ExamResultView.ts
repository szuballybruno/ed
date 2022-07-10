import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { Answer } from '../entity/answer/Answer';
import { AnswerVersion } from '../entity/answer/AnswerVersion';
import { AnswerGivenAnswerBridge } from '../entity/AnswerGivenAnswerBridge';
import { AnswerSession } from '../entity/AnswerSession';
import { Exam } from '../entity/exam/Exam';
import { ExamVersion } from '../entity/exam/ExamVersion';
import { GivenAnswer } from '../entity/GivenAnswer';
import { Question } from '../entity/question/Question';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class ExamResultView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<User>;


    @ViewColumn()
    @XViewColumn()
    examId: Id<Exam>;

    @ViewColumn()
    @XViewColumn()
    examVersionId: Id<ExamVersion>;

    @ViewColumn()
    @XViewColumn()
    isFinalExam: boolean;

    @ViewColumn()
    @XViewColumn()
    questionId: Id<Question>;

    @ViewColumn()
    @XViewColumn()
    questionText: string;

    @ViewColumn()
    @XViewColumn()
    answerSessionId: Id<AnswerSession>;

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
    givenAnswerId: Id<GivenAnswer>;

    @ViewColumn()
    @XViewColumn()
    isCorrect: boolean;

    @ViewColumn()
    @XViewColumn()
    answerBridgeId: Id<AnswerGivenAnswerBridge>;

    @ViewColumn()
    @XViewColumn()
    userAnswerId: Id<AnswerVersion>;

    @ViewColumn()
    @XViewColumn()
    answerId: Id<Answer>;

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