import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GivenAnswer } from "./GivenAnswer";
import { GivenAnswerStreak } from "./GivenAnswerStreak";

@Entity()
export class GivenAnswerStreakGivenAnswerBridge {

    @PrimaryGeneratedColumn()
    id: number;

    // given answers
    @Column()
    givenAnswerId: number;

    @JoinColumn({ name: "givenAnswerId" })
    @ManyToOne(_ => GivenAnswer, x => x.givenAnswerStreakBridges)
    givenAnswer: GivenAnswer;

    // given answer streak
    @Column()
    givenAnswerStreakId: number;

    @JoinColumn({ name: "givenAnswerStreakId" })
    @ManyToOne(_ => GivenAnswerStreak, x => x.givenAnswerBridges)
    givenAnswerStreak: GivenAnswerStreak;
}