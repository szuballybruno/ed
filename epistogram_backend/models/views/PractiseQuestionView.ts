import { ViewColumn, ViewEntity } from "typeorm";

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
    questionText: number;
}