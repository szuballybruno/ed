import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./Answer";
import { GivenAnswer } from "./GivenAnswer";

@Entity()
export class AnswerGivenAnswerBridge {

    @PrimaryGeneratedColumn()
    id: number;

    // given answer
    @Column()
    givenAnswerId: number;

    @ManyToOne(_ => GivenAnswer, x => x.answerBridges)
    @JoinColumn({ name: "givenAnswer_id" })
    givenAnswer: GivenAnswer;

    // answer
    @Column()
    answerId: number;

    @ManyToOne(_ => Answer, answer => answer.givenAnswerBridges)
    @JoinColumn({ name: "answer_id" })
    answer: Answer;
}