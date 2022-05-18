import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { PrequizAnswer } from './PrequizAnswer';
import { PrequizQuestion } from './PrequizQuestion';
import { User } from '../User';
import { Course } from '../Course';

@Entity()
export class PrequizUserAnswer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: true })
    value: number | null;

    // question 
    @Column()
    questionId: number;

    @JoinColumn({ name: 'question_id' })
    @ManyToOne(_ => PrequizQuestion, x => x.userAnswers)
    question: Relation<PrequizQuestion>;

    // answer 
    @Column({ type: 'int', nullable: true })
    answerId: number | null;

    @JoinColumn({ name: 'answer_id' })
    @ManyToOne(_ => PrequizAnswer, x => x.userAnswers)
    answer: Relation<PrequizAnswer> | null;

    // user  
    @Column()
    userId: number;

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(_ => User, x => x.prequizAnswers)
    user: Relation<User>;
    
    // course 
    @Column()
    courseId: number;

    @JoinColumn({ name: 'course_id' })
    @ManyToOne(_ => Course, x => x.prequizUserAnswers)
    course: Relation<Course>;
}