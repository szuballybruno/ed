import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./Question";
import { QuestionAnswer } from "./QuestionAnswer";

@Entity()
export class Answer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    // question 
    @Column()
    questionId: number;

    @ManyToOne(() => Question, question => question.answers)
    @JoinColumn({ name: "questionId" })
    question: Question

    // question answers
    @OneToMany(() => QuestionAnswer, qa => qa.answer)
    @JoinColumn()
    questionAnswers: QuestionAnswer[]
}