import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { ActivityStreak } from './ActivityStreak';
import { CoinTransaction } from './CoinTransaction';
import { User } from './User';
import { UserSessionActivity } from './UserSessionActivity';

@Entity()
export class ActivitySession {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamptz' })
    startDate: Date;

    @Column({ type: 'timestamptz' })
    endDate: Date;

    @Column()
    isFinalized: boolean;

    //
    // many to one
    //

    // user 
    userId: number;

    @ManyToOne(_ => User, x => x.activitySessions)
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;

    // activity streak
    @Column({ nullable: true, type: 'integer' })
    activityStreakId: number | null;

    @JoinColumn({ name: 'activity_streak_id' })
    @ManyToOne(_ => ActivityStreak, x => x.activitySessions)
    activityStreak: Relation<ActivityStreak> | null;

    // 
    // one to many
    //

    // activities 
    @OneToMany(_ => UserSessionActivity, x => x.activitySession)
    @JoinColumn()
    activities: Relation<UserSessionActivity>[];

    // coin acquires 
    @JoinColumn()
    @OneToMany(_ => CoinTransaction, x => x.activitySession)
    coinAcquires: Relation<CoinTransaction>[];
}