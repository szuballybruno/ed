import { JoinColumn, OneToMany, OneToOne, ViewColumn, ViewEntity } from "typeorm";
import { Answer } from "../entity/Answer";
import { Question } from "../entity/Question";

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

    // question 
    @OneToOne(_ => Question, x => x.practiseQuestionView)
    @JoinColumn({ name: "id" })
    question: Question;
}