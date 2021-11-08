import { JoinColumn, OneToMany, OneToOne, ViewColumn, ViewEntity } from "typeorm";
import { Answer } from "../entity/Answer";
import { Question } from "../entity/Question";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class PractiseQuestionView {

    @ViewColumn()
    questionId: number;

    @ViewColumn()
    userId: number;

    @ViewColumn()
    latestGivenAnswerId: number;

    @ViewColumn()
    givenAnswerCount: number;

    @ViewColumn()
    practiseAnswerCount: number;

    @ViewColumn()
    questionText: string;

    @ViewColumn()
    questionTypeId: number;

    @ViewColumn()
    answerId: number;

    @ViewColumn()
    answerText: string;
}