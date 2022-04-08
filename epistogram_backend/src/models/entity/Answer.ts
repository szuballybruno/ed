import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AnswerGivenAnswerBridge } from './AnswerGivenAnswerBridge';
import { Question } from './Question';

@Entity()
export class Answer {

    @PrimaryGeneratedColumn()
    id: number;

    @DeleteDateColumn()
    deletionDate: Date;
    
    @Column()
    text: string;

    @Column({ nullable: true })
    isCorrect: boolean;

    // question 
    @Column()
    questionId: number;

    @ManyToOne(() => Question, question => question.answers)
    @JoinColumn({ name: 'question_id' })
    question: Question;

    // given answer bridges
    @OneToMany(() => AnswerGivenAnswerBridge, x => x.answer)
    @JoinColumn()
    givenAnswerBridges: AnswerGivenAnswerBridge[];
}