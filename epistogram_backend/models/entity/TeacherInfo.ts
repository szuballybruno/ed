import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class TeacherInfo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    skills: string;

    @Column()
    courseCount: number;

    @Column()
    videoCount: number;

    @Column()
    studentCount: number;

    @Column()
    rating: number;

    @Column()
    badges: string;

    @JoinColumn()
    @OneToOne(_ => User, x => x.teacherInfo)
    user: User;
}