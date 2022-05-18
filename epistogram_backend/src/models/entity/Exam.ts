import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsDeletedFlag } from '../../services/ORMConnectionService/ORMConnectionDecorators';
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
    deletionDate: Date;

    @Column()
    title: string;

    @Column()
    type: ExamType;

    @Column({ nullable: true })
    subtitle: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    thumbnailUrl: string;

    @Column({ nullable: true })
    orderIndex: number;

    @Column({ type: 'integer', nullable: true })
    retakeLimit: number | null;

    // course
    @Column({ nullable: true })
    courseId: number;

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
    @Column({ nullable: true, type: 'int' })
    moduleId: number | null;

    @ManyToOne(_ => CourseModule, x => x.exams)
    @JoinColumn({ name: 'module_id' })
    module: CourseModule | null;
    
    // userProgressBridges
    @JoinColumn()
    @OneToMany(_ => UserExamProgressBridge, x => x.exam)
    userProgressBridges: UserExamProgressBridge[];
}