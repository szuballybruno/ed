import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CoinAcquire } from "./CoinAcquire";
import { GivenAnswerStreakGivenAnswerBridge } from "./GivenAnswerStreakGivenAnswerBridge";

@Entity()
export class GivenAnswerStreak {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    isFinished: boolean;

    // given answer bridges
    @JoinColumn()
    @OneToMany(_ => GivenAnswerStreakGivenAnswerBridge, x => x.givenAnswerStreak)
    givenAnswerBridges: GivenAnswerStreakGivenAnswerBridge[];

    // coin acquires 
    @JoinColumn()
    @OneToMany(_ => CoinAcquire, x => x.activitySession)
    coinAcquires: CoinAcquire[];
}