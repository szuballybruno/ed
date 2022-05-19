import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsDeletedFlag } from '../../services/ORMConnectionService/ORMConnectionDecorators';
import { AnswerGivenAnswerBridge } from './AnswerGivenAnswerBridge';
import { Question } from './Question';

@Entity()
export class Answer {

    @PrimaryGeneratedColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    deletionDate: Date | null;

    @Column()
    text: string;

    @Column({ type: 'bool', nullable: true })
    isCorrect: boolean | null;

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