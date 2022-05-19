import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { CourseModeType, CourseStageNameType, TempomatModeType } from '../../shared/types/sharedTypes';
import { Course } from './Course';
import { User } from './User';

@Entity()
export class UserCourseBridge {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    creationDate: Date;

    @Column({ type: 'text', default: 'beginner' })
    courseMode: CourseModeType;

    @Column()
    isCurrent: boolean;

    @Column({ type: 'text', nullable: true })
    currentItemCode: string | null;

    @Column({ type: 'text' })
    stageName: CourseStageNameType;

    @Column({ type: 'text' })
    tempomatMode: TempomatModeType;

    @Column({ type: 'timestamptz', nullable: true  })
    previsionedCompletionDate: Date;

    // user
    @Column()
    userId: number;

    @ManyToOne(_ => User, x => x.userCourseBridges)
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;

    // course
    @Column()
    courseId: number;

    @ManyToOne(_ => Course, x => x.userCourseBridges)
    @JoinColumn({ name: 'course_id' })
    course: Relation<Course>;
}