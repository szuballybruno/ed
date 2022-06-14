import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { IsDeletedFlag, XJoinColumn } from '../../services/XORM/XORMDecorators';
import { AnswerData } from './answer/AnswerData';
import { AnswerVersion } from './answer/AnswerVersion';
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
    answerVersionId: number;
    @ManyToOne(_ => AnswerVersion, x => x.givenAnswerBridges)
    @XJoinColumn<AnswerGivenAnswerBridge>('answerVersionId')
    answerVersion: Relation<AnswerVersion>;
}