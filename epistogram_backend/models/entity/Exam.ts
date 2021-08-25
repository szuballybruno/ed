import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Course } from "./Course";
import { User } from "./User";

@Entity()
export class Exam {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    subtitle: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(type => User, user => user.currentCourse)
    @JoinColumn()
    users: User[];

    // course
    @Column()
    courseId: number;
    
    @ManyToOne(type => Course, course => course.exams)
    @JoinColumn({ name: "courseId" })
    course: Course
}