import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @Column()
    thumbnailUrl: string;

    @Column()
    orderIndex: number;

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