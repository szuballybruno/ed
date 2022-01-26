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

    @JoinColumn({ name: "questionId" })
    @ManyToOne(_ => PrequizQuestion, x => x.answers)
    question: PrequizQuestion;

    // answers 
    @OneToMany(_ => PrequizUserAnswer, x => x.question)
    @JoinColumn()
    userAnswers: PrequizUserAnswer[];
}