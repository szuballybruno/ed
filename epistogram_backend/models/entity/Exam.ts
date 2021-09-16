import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AnswerSession } from "./AnswerSession";
import { Course } from "./Course";
import { Question } from "./Question";
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

    @Column({ default: false })
    isFinalExam: boolean;

    // users
    @OneToMany(type => User, user => user.currentExam)
    @JoinColumn()
    users: User[];

    // course
    @Column()
    courseId: number;

    @ManyToOne(type => Course, course => course.exams)
    @JoinColumn({ name: "courseId" })
    course: Course

    // questions 
    @OneToMany(_ => Question, q => q.exam)
    @JoinColumn()
    questions: Question[];

    // answer sessions
    @OneToMany(_ => AnswerSession, as => as.exam)
    @JoinColumn()
    answerSessions: AnswerSession[];
}