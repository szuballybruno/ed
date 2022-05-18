import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { DailyTip } from './DailyTip';
import { User } from './User';

@Entity()
export class DailyTipOccurrence {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    creationDate: Date;

    // daily tip
    @Column()
    dailyTipId: number;

    @ManyToOne(_ => DailyTip, x => x.occurrences)
    @JoinColumn({ name: 'daily_tip_id' })
    dailyTip: Relation<DailyTip>;

    // user
    @Column()
    userId: number;

    @ManyToOne(_ => User, x => x.dailyTipOccurrences)
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;
}