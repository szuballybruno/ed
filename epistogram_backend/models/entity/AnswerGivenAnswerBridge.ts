import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./Answer";
import { AnswerSession } from "./AnswerSession";
import { GivenAnswer } from "./GivenAnswer";
import { Question } from "./Question";

@Entity()
export class AnswerGivenAnswerBridge {

    @PrimaryGeneratedColumn()
    id: number;

    // given answer
    @Column()
    givenAnswerId: number;

    @ManyToOne(_ => GivenAnswer, x => x.answerBridges)
    @JoinColumn({ name: "givenAnswerId" })
    givenAnswer: GivenAnswer;

    // answer
    @Column()
    answerId: number;

    @ManyToOne(_ => Answer, answer => answer.givenAnswerBridges)
    @JoinColumn({ name: "answerId" })
    answer: Answer;
}