import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CourseModeType } from "../shared_models/types/sharedTypes";
import { Course } from "./Course";
import { User } from "./User";

@Entity()
export class UserCourseBridge {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text", default: "beginner" })
    courseMode: CourseModeType;

    // user
    @Column()
    userId: number;

    @ManyToOne(_ => User, x => x.userCourseBridges)
    @JoinColumn({ name: "userId" })
    user: User;

    // course
    @Column()
    courseId: number;

    @ManyToOne(_ => Course, x => x.userCourseBridges)
    @JoinColumn({ name: "courseId" })
    course: Course;
}