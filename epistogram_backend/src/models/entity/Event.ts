import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { EventCodeType } from '../../shared/types/sharedTypes';
import { User } from './User';

@Entity()
export class Event {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    creationDate: Date;

    @Column({ type: 'text' })
    type: EventCodeType;

    @Column()
    isFulfilled: boolean;

    @Column()
    data: string;

    @Column()
    userId: number;

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(_ => User, x => x.events)
    user: Relation<User>;
}