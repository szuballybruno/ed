import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PractiseQuestionView } from "../views/PractiseQuestionView";
import { Question } from "./Question";
import { QuestionAnswer } from "./QuestionAnswer";

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
    question: Question

    // question answers
    @OneToMany(() => QuestionAnswer, qa => qa.answer)
    @JoinColumn()
    questionAnswers: QuestionAnswer[]

    // practise question
    @ManyToOne(_ => PractiseQuestionView, x => x.answers)
    @JoinColumn({ name: "questionId" })
    practiseQuestionView: PractiseQuestionView;
}