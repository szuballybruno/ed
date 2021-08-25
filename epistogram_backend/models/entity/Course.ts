import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
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

    @OneToMany(type => Video, video => video.courseId)
    @JoinColumn()
    videos: Video[];

    @OneToMany(type => Exam, exam => exam.courseId)
    @JoinColumn()
    exams: Exam[];
}