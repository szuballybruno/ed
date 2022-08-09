import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
import { Course } from '../course/Course';
import { User } from '../User';
import { CourseRatingQuestion } from './CourseRatingQuestion';

@Entity()
export class CourseRatingQuestionUserAnswer {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'CourseRatingQuestionUserAnswer'>;

    @Column({ type: 'text', nullable: true })
    @XViewColumn()
    text: string;

    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    value: number;

    // TO ONE

    // quesiton
    @Column()
    @XViewColumn()
    courseRatingQuestionId: Id<'CourseRatingQuestion'>;
    @JoinColumn({ name: 'course_rating_question_id' })
    @ManyToOne(_ => CourseRatingQuestion, x => x.userAnswers)
    courseRatingQuestion: Relation<CourseRatingQuestion>;

    // user
    @Column()
    @XViewColumn()
    userId: Id<'User'>;
    @JoinColumn({ name: 'user_id' })
    @ManyToOne(_ => User, x => x.courseRatingAnswers)
    user: Relation<User>;

    // course 
    @Column()
    @XViewColumn()
    courseId: Id<'Course'>;
    @JoinColumn({ name: 'course_id' })
    @ManyToOne(_ => Course, x => x.courseRatingUserAnswers)
    course: Relation<Course>;
}