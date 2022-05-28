import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsDeletedFlag } from '../../services/XORM/XORMDecorators';
import { ExamType } from '../../shared/types/sharedTypes';
import { AnswerSession } from './AnswerSession';
import { Course } from './Course';
import { CourseModule } from './CourseModule';
import { Question } from './Question';
import { UserExamProgressBridge } from './UserExamProgressBridge';
import { UserSessionActivity } from './UserSessionActivity';

@Entity()
export class Exam {

    @PrimaryGeneratedColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    deletionDate: Date | null;

    @Column()
    title: string;

    @Column()
    type: ExamType;

    @Column({ type: 'text', nullable: true })
    subtitle: string | null;

    @Column({ type: 'text', nullable: true })
    description: string | null;

    @Column({ type: 'text', nullable: true })
    thumbnailUrl: string | null;

    @Column({ type: 'int', nullable: true })
    orderIndex: number | null;

    @Column({ type: 'integer', nullable: true })
    retakeLimit: number | null;

    // course
    @Column({ nullable: true })
    courseId: number | null;

    @ManyToOne(type => Course, course => course.exams)
    @JoinColumn({ name: 'course_id' })
    course: Course | null;

    // questions 
    @OneToMany(_ => Question, q => q.exam, { onDelete: 'CASCADE', cascade: ['remove'] })
    @JoinColumn()
    questions: Question[];

    // user session activity
    @OneToMany(_ => UserSessionActivity, as => as.exam)
    @JoinColumn()
    userSessionActivities: UserSessionActivity[];

    // answer sessions
    @OneToMany(_ => AnswerSession, as => as.exam)
    @JoinColumn()
    answerSessions: AnswerSession[];

    // module
    @Column({ type: 'int', nullable: true })
    moduleId: number | null;

    @ManyToOne(_ => CourseModule, x => x.exams)
    @JoinColumn({ name: 'module_id' })
    module: CourseModule | null;

    // userProgressBridges
    @JoinColumn()
    @OneToMany(_ => UserExamProgressBridge, x => x.exam)
    userProgressBridges: UserExamProgressBridge[];
}