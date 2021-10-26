import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AnswerSession } from "./AnswerSession";
import { Course } from "./Course";
import { Question } from "./Question";
import { User } from "./User";
import { UserCourseBridge } from "./UserCourseBridge";

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

    @Column({ nullable: true })
    thumbnailUrl: string;

    @Column({ nullable: true })
    orderIndex: number;

    @Column({ default: false })
    isFinalExam: boolean;

    // users
    @OneToMany(type => UserCourseBridge, x => x.currentExam)
    @JoinColumn()
    userCourseBridges: UserCourseBridge[];

    // course
    @Column({ nullable: true })
    courseId: number;

    @ManyToOne(type => Course, course => course.exams)
    @JoinColumn({ name: "courseId" })
    course: Course | null

    // questions 
    @OneToMany(_ => Question, q => q.exam, { onDelete: "CASCADE", cascade: ["remove"] })
    @JoinColumn()
    questions: Question[];

    // answer sessions
    @OneToMany(_ => AnswerSession, as => as.exam)
    @JoinColumn()
    answerSessions: AnswerSession[];
}