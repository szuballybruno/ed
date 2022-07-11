import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { User } from './User';

@Entity()
export class JobTitle {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<JobTitle>;

    @Column()
    @XViewColumn()
    name: string;

    // TO MANY

    // users
    @OneToMany(_ => User, x => x.jobTitle)
    @JoinColumn()
    users: User[];
}