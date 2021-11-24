import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AnswerSession } from "./AnswerSession";
import { Course } from "./Course";
import { CourseModule } from "./CourseModule";
import { Question } from "./Question";

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

    // course
    @Column({ nullable: true })
    courseId: number;

    @ManyToOne(type => Course, course => course.exams)
    @JoinColumn({ name: "course_id" })
    course: Course | null

    // questions 
    @OneToMany(_ => Question, q => q.exam, { onDelete: "CASCADE", cascade: ["remove"] })
    @JoinColumn()
    questions: Question[];

    // answer sessions
    @OneToMany(_ => AnswerSession, as => as.exam)
    @JoinColumn()
    answerSessions: AnswerSession[];

    // module
    @Column()
    moduleId: number;

    @ManyToOne(_ => CourseModule, x => x.exams)
    @JoinColumn({ name: "module_id" })
    module: CourseModule;
}