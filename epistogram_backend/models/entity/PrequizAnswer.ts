import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PrequizQuestion } from "./PrequizQuestion";
import { PrequizUserAnswer } from "./PrequizUserAnswer";

@Entity()
export class PrequizAnswer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    // question 
    @Column()
    questionId: number;

    @ManyToOne(_ => PrequizQuestion, x => x.answers)
    @JoinColumn({ name: "question_id" })
    question: PrequizQuestion;

    // user answers 
    @OneToMany(_ => PrequizUserAnswer, x => x.answer)
    @JoinColumn()
    userAnswers: PrequizUserAnswer[];
}