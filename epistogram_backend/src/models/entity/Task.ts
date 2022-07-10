import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { User } from './User';

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<Task>;

    @Column()
    @XViewColumn()
    name: string;

    @Column()
    @XViewColumn()
    dueData: Date;

    @Column()
    @XViewColumn()
    objective: string;

    // TO ONE 

    // user
    @Column()
    @XViewColumn()
    userId: Id<User>;
    @ManyToOne(type => User, user => user.tasks)
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;
}