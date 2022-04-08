import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ActivationCode } from './ActivationCode';
import { User } from './User';

@Entity()
export class Organization {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // users 
    @OneToMany(_ => User, user => user.organization)
    @JoinColumn()
    users: User[];

    // activation codes 
    @JoinColumn()
    @OneToMany(_ => ActivationCode, x => x.organization)
    activationCodes: ActivationCode[];
}