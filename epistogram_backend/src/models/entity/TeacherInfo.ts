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

    @Column({ type: "double precision" })
    rating: number;

    @Column()
    description: string;

    @Column()
    badges: string;

    // user 
    @Column()
    userId: number;

    @OneToOne(_ => User, x => x.teacherInfo)
    @JoinColumn({ name: "user_id" })
    user: User;
}