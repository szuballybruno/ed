import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    // users 
    @Column()
    userId: number;

    @ManyToOne(type => User, user => user.tasks)
    @JoinColumn({ name: "userId" })
    user: User;
}