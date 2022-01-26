import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PrequizAnswer } from "./PrequizAnswer";
import { PrequizQuestion } from "./PrequizQuestion";
import { User } from "./User";

@Entity()
export class PrequizUserAnswer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column({ type: "int", nullable: true })
    value: number | null;

    // question 
    @Column()
    questionId: number;

    @JoinColumn({ name: "questionId" })
    @ManyToOne(_ => PrequizQuestion, x => x.answers)
    question: PrequizQuestion;

    // answer 
    @Column({ type: "int", nullable: true })
    answerId: number | null;

    @JoinColumn({ name: "questionId" })
    @ManyToOne(_ => PrequizAnswer, x => x.userAnswers)
    answer: PrequizAnswer | null;

    // answer 
    @Column()
    userId: number;

    @JoinColumn({ name: "questionId" })
    @ManyToOne(_ => User, x => x.prequizAnswers)
    user: User;
}