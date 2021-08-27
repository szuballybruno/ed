import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    dueData: Date;

    @Column()
    objective: string;

    @OneToMany(type => User, user => user.tasks)
    @JoinColumn()
    users: User[];
}