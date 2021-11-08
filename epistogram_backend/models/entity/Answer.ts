import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PractiseQuestionView } from "../views/PractiseQuestionView";
import { Question } from "./Question";
import { AnswerGivenAnswerBridge } from "./AnswerGivenAnswerBridge";

@Entity()
export class Answer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column({ nullable: true })
    isCorrect: boolean;

    // question 
    @Column()
    questionId: number;

    @ManyToOne(() => Question, question => question.answers)
    @JoinColumn({ name: "questionId" })
    question: Question;

    // given answer bridges
    @OneToMany(() => AnswerGivenAnswerBridge, x => x.answer)
    @JoinColumn()
    givenAnswerBridges: AnswerGivenAnswerBridge[];
}