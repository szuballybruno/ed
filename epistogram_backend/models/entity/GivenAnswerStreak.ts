import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CoinAcquire } from "./CoinAcquire";
import { GivenAnswer } from "./GivenAnswer";
import { User } from "./User";

@Entity()
export class GivenAnswerStreak {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isFinalized: boolean;

    // user 
    userId: number;

    @ManyToOne(_ => User, x => x.activitySessions)
    @JoinColumn({ name: "user_id" })
    user: User;

    // given answers
    @JoinColumn()
    @OneToMany(_ => GivenAnswer, x => x.givenAnswerStreak)
    givenAnswers: GivenAnswer[];

    // coin acquires 
    @JoinColumn()
    @OneToMany(_ => CoinAcquire, x => x.activitySession)
    coinAcquires: CoinAcquire[];
}