import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./Course";
import { User } from "./User";

@Entity()
export class UserCourseBridge {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text", default: "beginner" })
    courseMode: "beginner" | "advanced";

    @Column()
    userId: number;

    @ManyToOne(_ => User, x => x.userCourseBridges)
    @JoinColumn({ name: "userId" })
    user: User;

    @Column()
    courseId: number;

    @ManyToOne(_ => Course, x => x.userCourseBridges)
    @JoinColumn({ name: "courseId" })
    course: Course;
}