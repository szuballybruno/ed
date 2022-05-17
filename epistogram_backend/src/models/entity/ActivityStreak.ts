import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { ActivitySession } from './ActivitySession';
import { CoinTransaction } from './CoinTransaction';
import { User } from './User';

@Entity()
export class ActivityStreak {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamptz' })
    startDate: Date;

    @Column({ type: 'timestamptz' })
    endDate: Date;

    @Column()
    isFinalized: boolean;

    // user 
    userId: number;

    @ManyToOne(_ => User, x => x.activitySessions)
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;

    // activities 
    @OneToMany(_ => ActivitySession, x => x.activityStreak)
    @JoinColumn()
    activitySessions: Relation<ActivitySession>[];

    // coin acquires 
    @JoinColumn()
    @OneToMany(_ => CoinTransaction, x => x.activityStreak)
    coinAcquires: Relation<CoinTransaction>[];
}