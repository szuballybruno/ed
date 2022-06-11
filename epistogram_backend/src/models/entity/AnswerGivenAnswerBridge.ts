import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { IsDeletedFlag } from '../../services/XORM/XORMDecorators';
import { AnswerData } from './answer/AnswerData';
import { GivenAnswer } from './GivenAnswer';

@Entity()
export class AnswerGivenAnswerBridge {

    @PrimaryGeneratedColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    deletionDate: Date;

    // given answer
    @Column()
    givenAnswerId: number;

    @ManyToOne(_ => GivenAnswer, x => x.answerBridges)
    @JoinColumn({ name: 'given_answer_id' })
    givenAnswer: Relation<GivenAnswer>;

    // answer
    @Column()
    answerId: number;

    @ManyToOne(_ => AnswerData, answer => answer.givenAnswerBridges)
    @JoinColumn({ name: 'answer_id' })
    answer: Relation<AnswerData>;
}