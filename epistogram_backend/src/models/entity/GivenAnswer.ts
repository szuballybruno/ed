import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AnswerGivenAnswerBridge } from "./AnswerGivenAnswerBridge";
import { AnswerSession } from "./AnswerSession";
import { CoinTransaction } from "./CoinTransaction";
import { GivenAnswerStreak } from "./GivenAnswerStreak";
import { Question } from "./Question";

@Entity()
export class GivenAnswer {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ default: () => "now()", type: "timestamptz" })
    creationDate: Date;

    @Column()
    isCorrect: boolean;

    @Column({ type: "double precision" })
    elapsedSeconds: number;

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
    @JoinColumn({ name: "answer_session_id" })
    answerSession: AnswerSession;

    // answer bridges
    @OneToMany(_ => AnswerGivenAnswerBridge, x => x.givenAnswer)
    @JoinColumn()
    answerBridges: AnswerGivenAnswerBridge[];

    // givenAnswerStreakBridges
    @Column({ nullable: true, type: "integer" })
    givenAnswerStreakId: number | null;

    @JoinColumn({ name: "given_answer_streak_id" })
    @ManyToOne(_ => GivenAnswerStreak, x => x.givenAnswers)
    givenAnswerStreak: GivenAnswerStreak;

    // coin acquires 
    @JoinColumn()
    @OneToMany(_ => CoinTransaction, x => x.givenAnswer)
    coinAcquires: CoinTransaction[];
}