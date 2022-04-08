import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class AnswerSessionView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    answerSessionId: number;

    @ViewColumn()
    examId: number;

    @ViewColumn()
    isSuccessful: boolean;
}
