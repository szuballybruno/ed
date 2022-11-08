import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';
import { DailyTip } from './DailyTip';
import { User } from './User';

@Entity()
export class DailyTipOccurrence {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'DailyTipOccurrence'>;

    @CreateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    creationDate: Date;

    // TO ONE

    // daily tip
    @Column()
    @XViewColumn()
    dailyTipId: Id<'DailyTip'>;
    @ManyToOne(_ => DailyTip, x => x.occurrences)
    @JoinColumn({ name: 'daily_tip_id' })
    dailyTip: Relation<DailyTip>;

    // user
    @Column()
    @XViewColumn()
    userId: Id<'User'>;
    @ManyToOne(_ => User, x => x.dailyTipOccurrences)
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;
}