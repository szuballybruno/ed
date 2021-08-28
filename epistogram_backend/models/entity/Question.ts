import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./Answer";
import { QuestionAnswer } from "./QuestionAnswer";

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    questionId: number;

    @Column()
    questionText: string;

    @Column()
    imageUrl?: string;

    @Column()
    isSignupQuestion: boolean;

    // answers
    @OneToMany(type => Answer, answer => answer.question)
    @JoinColumn()
    answers: Answer[];

    // question answers
    @OneToMany(() => QuestionAnswer, qa => qa.answer)
    @JoinColumn()
    questionAnswers: QuestionAnswer[]
}