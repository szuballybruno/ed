import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./Course";
import { User } from "./User";

@Entity()
export class UserCourseAccessBridge {

    @PrimaryGeneratedColumn()
    id: number;

    // users 
    @Column()
    userId: number;

    @ManyToOne(_ => User, user => user.courseAccessBridges)
    @JoinColumn({ name: "user_id" })
    user: User;

    // courses 
    @Column()
    courseId: number;

    @ManyToOne(_ => Course, course => course.userAccessBridges)
    @JoinColumn({ name: "course_id" })
    course: Course;
}