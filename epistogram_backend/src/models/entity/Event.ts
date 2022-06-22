import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { EventCodeType } from '../../shared/types/sharedTypes';
import { User } from './User';

@Entity()
export class Event {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

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
    userId: number;
    @JoinColumn({ name: 'user_id' })
    @ManyToOne(_ => User, x => x.events)
    user: Relation<User>;
}