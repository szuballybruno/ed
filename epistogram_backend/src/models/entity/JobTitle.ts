import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class JobTitle {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // user 
    @OneToMany(_ => User, x => x.jobTitle)
    @JoinColumn()
    users: User[];
}