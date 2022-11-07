import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XViewColumn } from '../../../services/XORM/XORMDecorators';
import { EventCodeType } from '../../../shared/types/sharedTypes';
import { Id } from '../../../shared/types/versionId';
import { User } from './User';

@Entity()
export class Event {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'Event'>;

    @CreateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    @XViewColumn()
    creationDate: Date;

    @Column({ type: 'text' })
    @XViewColumn()
    type: EventCodeType;

    @Column()
    @XViewColumn()
    isFulfilled: boolean;

    @Column()
    @XViewColumn()
    data: string;

    // TO ONE

    @Column()
    @XViewColumn()
    userId: Id<'User'>;
    @JoinColumn({ name: 'user_id' })
    @ManyToOne(_ => User, x => x.events)
    user: Relation<User>;
}