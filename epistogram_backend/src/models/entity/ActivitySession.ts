import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { ActivityStreak } from './ActivityStreak';
import { CoinTransaction } from './CoinTransaction';
import { User } from './User';
import { UserSessionActivity } from './UserSessionActivity';

@Entity()
export class ActivitySession {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'ActivitySession'>;

    @Column({ type: 'timestamptz' })
    @XViewColumn()
    startDate: Date;

    @Column({ type: 'timestamptz' })
    @XViewColumn()
    endDate: Date;

    @Column()
    @XViewColumn()
    isFinalized: boolean;

    //
    // many to one
    //

    // user 
    @Column()
    @XViewColumn()
    userId: Id<'User'>;
    @ManyToOne(_ => User, x => x.activitySessions)
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;

    // activity streak
    @Column({ nullable: true, type: 'int' })
    @XViewColumn()
    activityStreakId: Id<'ActivityStreak'> | null;
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