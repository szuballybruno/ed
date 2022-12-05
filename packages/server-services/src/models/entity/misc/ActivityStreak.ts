import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';
import { ActivitySession } from './ActivitySession';
import { CoinTransaction } from './CoinTransaction';
import { User } from './User';

@Entity()
export class ActivityStreak {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'ActivityStreak'>;

    @Column({ type: 'timestamptz' })
    @XViewColumn()
    startDate: Date;

    @Column({ type: 'timestamptz' })
    @XViewColumn()
    endDate: Date;

    @Column()
    @XViewColumn()
    isFinalized: boolean;

    // TO ONE

    // user 
    @Column()
    @XViewColumn()
    userId: Id<'User'>;
    @ManyToOne(_ => User, x => x.activitySessions)
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;

    // TO MANY

    // activities 
    @OneToMany(_ => ActivitySession, x => x.activityStreak)
    @JoinColumn()
    activitySessions: Relation<ActivitySession>[];

    // coin acquires 
    @JoinColumn()
    @OneToMany(_ => CoinTransaction, x => x.activityStreak)
    coinAcquires: Relation<CoinTransaction>[];
}