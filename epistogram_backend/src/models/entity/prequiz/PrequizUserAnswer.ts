import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Course } from '../course/Course';
import { User } from '../User';
import { PrequizAnswer } from './PrequizAnswer';
import { PrequizQuestion } from './PrequizQuestion';

@Entity()
export class PrequizUserAnswer {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    value: number | null;

    // question 
    @Column()
    @XViewColumn()
    questionId: number;
    @JoinColumn({ name: 'question_id' })
    @ManyToOne(_ => PrequizQuestion, x => x.userAnswers)
    question: Relation<PrequizQuestion>;

    // answer 
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    answerId: number | null;
    @JoinColumn({ name: 'answer_id' })
    @ManyToOne(_ => PrequizAnswer, x => x.userAnswers)
    answer: Relation<PrequizAnswer> | null;

    // user  
    @Column()
    @XViewColumn()
    userId: number;
    @JoinColumn({ name: 'user_id' })
    @ManyToOne(_ => User, x => x.prequizAnswers)
    user: Relation<User>;

    // course 
    @Column()
    @XViewColumn()
    courseId: number;
    @JoinColumn({ name: 'course_id' })
    @ManyToOne(_ => Course, x => x.prequizUserAnswers)
    course: Relation<Course>;
}