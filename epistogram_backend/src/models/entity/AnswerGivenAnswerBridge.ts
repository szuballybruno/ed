import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { IsDeletedFlag } from '../../services/ORMConnectionService/ORMConnectionDecorators';
import { Answer } from './Answer';
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

    @ManyToOne(_ => Answer, answer => answer.givenAnswerBridges)
    @JoinColumn({ name: 'answer_id' })
    answer: Relation<Answer>;
}