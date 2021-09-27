import { JoinColumn, OneToMany, ViewColumn, ViewEntity } from "typeorm";
import { Answer } from "../entity/Answer";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class PractiseQuestionView {

    @ViewColumn()
    id: number;

    @ViewColumn()
    userId: number;

    @ViewColumn()
    questionText: string;

    // answers 
    @OneToMany(_ => Answer, x => x.practiseQuestionView)
    @JoinColumn()
    answers: Answer[];
}