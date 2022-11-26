import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from '../../MyORM';
import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';
import { User } from './User';

@Entity()
export class Department {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'Department'>;

    @Column()
    @XViewColumn()
    name: string;

    // TO MANY

    // users
    @OneToMany(_ => User, x => x.department)
    @JoinColumn()
    users: User[];
}