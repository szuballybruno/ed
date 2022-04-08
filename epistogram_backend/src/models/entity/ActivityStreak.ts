import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
    user: User;

    // activities 
    @OneToMany(_ => ActivitySession, x => x.activityStreak)
    @JoinColumn()
    activitySessions: ActivitySession[];

    // coin acquires 
    @JoinColumn()
    @OneToMany(_ => CoinTransaction, x => x.activityStreak)
    coinAcquires: CoinTransaction[];
}