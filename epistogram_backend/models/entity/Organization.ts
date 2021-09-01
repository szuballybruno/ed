import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "./User";
import {Course} from "./Course";

@Entity()
export class Organization {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => User, user => user.organization)
    @JoinColumn()
    users: User[];

    @OneToMany(type => Course, course => course.organization)
    @JoinColumn()
    courses: Course[];
}