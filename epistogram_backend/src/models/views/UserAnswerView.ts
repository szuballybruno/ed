import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserAnswerView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    givenAnswerId: number;

    @ViewColumn()
    answerSessionId: number;

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    isCorrect: boolean;

    @ViewColumn()
    elapsedSeconds: number;

    @ViewColumn()
    givenAnswerType: string;
}