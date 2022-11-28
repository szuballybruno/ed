import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';
import { Course } from '../course/Course';
import { User } from '../misc/User';
import { PrequizAnswer } from './PrequizAnswer';
import { PrequizQuestion } from './PrequizQuestion';

@Entity()
export class PrequizUserAnswer {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'PrequizUserAnswer'>;

    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    value: number | null;

    // question 
    @Column()
    @XViewColumn()
    questionId: Id<'PrequizQuestion'>;
    @JoinColumn({ name: 'question_id' })
    @ManyToOne(_ => PrequizQuestion, x => x.userAnswers)
    question: Relation<PrequizQuestion>;

    // answer 
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    answerId: Id<'PrequizAnswer'> | null;
    @JoinColumn({ name: 'answer_id' })
    @ManyToOne(_ => PrequizAnswer, x => x.userAnswers)
    answer: Relation<PrequizAnswer> | null;

    // user  
    @Column()
    @XViewColumn()
    userId: Id<'User'>;
    @JoinColumn({ name: 'user_id' })
    @ManyToOne(_ => User, x => x.prequizAnswers)
    user: Relation<User>;

    // course 
    @Column()
    @XViewColumn()
    courseId: Id<'Course'>;
    @JoinColumn({ name: 'course_id' })
    @ManyToOne(_ => Course, x => x.prequizUserAnswers)
    course: Relation<Course>;
}