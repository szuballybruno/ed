import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./Course";
import { Exam } from "./Exam";
import { Organization } from "./Organization";
import { Task } from "./Task";
import { Video } from "./Video";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    timeOfAdd: Date;

    @Column({ nullable: true })
    isActive: boolean;

    @Column()
    email: string;

    @Column({ nullable: true })
    username: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    userDescription: string;

    @Column({ nullable: true })
    linkedInUrl: string;

    @Column()
    role: string;

    @Column()
    jobTitle: string;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    refreshToken: string;

    // Organization 
    @Column()
    organizationId: number;

    @ManyToOne(() => Organization, organization => organization.users)
    @JoinColumn({ name: 'organizationId' })
    organization: Organization

    // Current course
    @Column({ nullable: true })
    currentCourseId: number;

    @ManyToOne(() => Course, course => course.users)
    @JoinColumn({ name: 'currentCourseId' })
    currentCourse: Course

    // Current video
    @Column({ nullable: true })
    currentVideoId: number;

    @ManyToOne(() => Video, video => video.users)
    @JoinColumn({ name: 'currentVideoId' })
    currentVideo: Video

    // Current exam
    @Column({ nullable: true })
    currentExamId: number;

    @ManyToOne(() => Exam, exam => exam.users)
    @JoinColumn({ name: 'currentExamId' })
    currentExam: Exam

    // Tasks
    @OneToMany(() => Task, task => task.users)
    @JoinColumn()
    tasks: Task[]
}