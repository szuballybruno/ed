import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class ExamResultView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    examId: number;

    @ViewColumn()
    isFinalExam: boolean;

    @ViewColumn()
    questionId: number;

    @ViewColumn()
    questionText: string;

    @ViewColumn()
    answerSessionId: number;

    @ViewColumn()
    isCompletedSession: boolean;

    @ViewColumn()
    correctGivenAnswerCount: number;

    @ViewColumn()
    questionCount: number;

    @ViewColumn()
    isSuccessfulSession: boolean;

    @ViewColumn()
    onlySuccessfulSession: boolean;

    @ViewColumn()
    givenAnswerId: number;

    @ViewColumn()
    isCorrectAnswer: boolean;

    @ViewColumn()
    answerBridgeId: number;

    @ViewColumn()
    userAnswerId: number;

    @ViewColumn()
    answerId: number;

    @ViewColumn()
    isGivenAnswer: boolean;

    @ViewColumn()
    answerText: string;
}