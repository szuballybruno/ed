import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GivenAnswerStreak } from "./GivenAnswerStreak";
import { User } from "./User";
import { UserSessionActivity } from "./UserSessionActivity";
import { Video } from "./Video";

@Entity()
export class CoinAcquire {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    // user 
    @Column()
    userId: number;

    @ManyToOne(_ => User, x => x.coinAcquires)
    @JoinColumn({ name: "userId" })
    user: User;

    // user session activity
    @Column({ nullable: true, type: "integer" })
    sessionActivityId: number;

    @JoinColumn()
    @ManyToOne(_ => UserSessionActivity, x => x.coinAcquires)
    sessionActivity: UserSessionActivity | null;

    // video
    @Column({ nullable: true, type: "integer" })
    videoId: number;

    @JoinColumn()
    @ManyToOne(_ => Video, x => x.coinAcquires)
    video: Video | null;

    // given answer streak 
    @Column({ nullable: true, type: "integer" })
    givenAnswerStreakId: number;

    @JoinColumn()
    @ManyToOne(_ => GivenAnswerStreak, x => x.coinAcquires)
    givenAnswerStreak: GivenAnswerStreak | null;
}