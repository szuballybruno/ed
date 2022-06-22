import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { DailyTip } from './DailyTip';
import { User } from './User';

@Entity()
export class DailyTipOccurrence {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    @CreateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    creationDate: Date;

    // TO ONE

    // daily tip
    @Column()
    @XViewColumn()
    dailyTipId: number;
    @ManyToOne(_ => DailyTip, x => x.occurrences)
    @JoinColumn({ name: 'daily_tip_id' })
    dailyTip: Relation<DailyTip>;

    // user
    @Column()
    @XViewColumn()
    userId: number;
    @ManyToOne(_ => User, x => x.dailyTipOccurrences)
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;
}