import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exam } from "./Exam";
import { User } from "./User";
import { Video } from "./Video";

@Entity()
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    category: string;

    @OneToMany(type => User, user => user.currentCourse)
    @JoinColumn()
    users: User[];

    @OneToMany(type => Video, video => video.course, { cascade: true })
    @JoinColumn()
    videos: Video[];

    @OneToMany(type => Exam, exam => exam.course, { cascade: true })
    @JoinColumn()
    exams: Exam[];
}