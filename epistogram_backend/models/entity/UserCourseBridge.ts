import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CourseModeType } from "../shared_models/types/sharedTypes";
import { Course } from "./Course";
import { Exam } from "./Exam";
import { User } from "./User";
import { Video } from "./Video";

@Entity()
export class UserCourseBridge {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text", default: "beginner" })
    courseMode: CourseModeType;

    @Column({ default: false })
    isCurrent: boolean;

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

    // Current video
    @Column({ nullable: true })
    currentVideoId: number | null;

    @ManyToOne(() => Video, video => video.userCourseBridges)
    @JoinColumn({ name: 'currentVideoId' })
    currentVideo: Video | null

    // Current exam
    @Column({ nullable: true })
    currentExamId: number | null;

    @ManyToOne(() => Exam, exam => exam.userCourseBridges)
    @JoinColumn({ name: 'currentExamId' })
    currentExam: Exam | null;
}