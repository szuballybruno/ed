import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { CourseModeType, CourseStageNameType, TempomatModeType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';
import { Course } from './course/Course';
import { User } from './User';

@Entity()
export class UserCourseBridge {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<UserCourseBridge>;

    @CreateDateColumn({ default: () => 'now()', type: 'timestamptz' })
    @XViewColumn()
    creationDate: Date;

    @Column({ type: 'timestamptz', nullable: true })
    @XViewColumn()
    startDate: Date | null;

    @Column({ type: 'text', default: 'beginner' })
    @XViewColumn()
    courseMode: CourseModeType;

    @Column({ type: 'boolean' })
    @XViewColumn()
    isCurrent: boolean;

    @Column({ type: 'text', nullable: true })
    @XViewColumn()
    currentItemCode: string | null;

    @Column({ type: 'text' })
    @XViewColumn()
    stageName: CourseStageNameType;

    @Column({ type: 'text' })
    @XViewColumn()
    tempomatMode: TempomatModeType;

    @Column({ type: 'timestamptz', nullable: true })
    @XViewColumn()
    previsionedCompletionDate: Date;

    @Column({ type: 'timestamptz', nullable: true })
    @XViewColumn()
    requiredCompletionDate: Date | null;

    // user
    @Column()
    @XViewColumn()
    userId: Id<User>;
    @ManyToOne(_ => User, x => x.userCourseBridges)
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;

    // course
    @Column()
    @XViewColumn()
    courseId: Id<Course>;
    @ManyToOne(_ => Course, x => x.userCourseBridges)
    @JoinColumn({ name: 'course_id' })
    course: Relation<Course>;
}