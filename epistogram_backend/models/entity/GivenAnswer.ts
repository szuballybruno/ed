import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./Answer";
import { AnswerGivenAnswerBridge } from "./AnswerGivenAnswerBridge";
import { AnswerSession } from "./AnswerSession";
import { GivenAnswerStreakGivenAnswerBridge } from "./GivenAnswerStreakGivenAnswerBridge";
import { Question } from "./Question";

@Entity()
export class GivenAnswer {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ default: () => "timezone('utc'::text, now())" })
    creationDate: Date;

    @Column()
    isCorrect: boolean;

    @Column({ default: false })
    isPractiseAnswer: boolean;

    // question
    @Column()
    questionId: number;

    @ManyToOne(_ => Question, x => x.givenAnswers)
    @JoinColumn({ name: "question_id" })
    question: Question;

    // answer session
    @Column()
    answerSessionId: number;

    @ManyToOne(_ => AnswerSession, x => x.givenAnswers)
    @JoinColumn({ name: "answerSession_id" })
    answerSession: AnswerSession;

    // answer bridges
    @OneToMany(_ => AnswerGivenAnswerBridge, x => x.givenAnswer)
    @JoinColumn()
    answerBridges: AnswerGivenAnswerBridge[];

    // givenAnswerStreakBridges
    @JoinColumn()
    @OneToMany(_ => GivenAnswerStreakGivenAnswerBridge, x => x.givenAnswer)
    givenAnswerStreakBridges: GivenAnswerStreakGivenAnswerBridge[];
}