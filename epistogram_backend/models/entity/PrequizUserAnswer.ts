import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PrequizAnswer } from "./PrequizAnswer";
import { PrequizQuestion } from "./PrequizQuestion";
import { User } from "./User";

@Entity()
export class PrequizUserAnswer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int", nullable: true })
    value: number | null;

    // question 
    @Column()
    questionId: number;

    @JoinColumn({ name: "question_id" })
    @ManyToOne(_ => PrequizQuestion, x => x.userAnswers)
    question: PrequizQuestion;

    // answer 
    @Column({ type: "int", nullable: true })
    answerId: number | null;

    @JoinColumn({ name: "answer_id" })
    @ManyToOne(_ => PrequizAnswer, x => x.userAnswers)
    answer: PrequizAnswer | null;

    // user  
    @Column()
    userId: number;

    @JoinColumn({ name: "user_id" })
    @ManyToOne(_ => User, x => x.prequizAnswers)
    user: User;
}