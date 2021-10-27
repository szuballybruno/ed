import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

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
}