import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { IsDeletedFlag, XJoinColumn, XViewColumn } from '../../services/XORM/XORMDecorators';
import { AnswerVersion } from './answer/AnswerVersion';
import { GivenAnswer } from './GivenAnswer';

@Entity()
export class AnswerGivenAnswerBridge {

    @PrimaryGeneratedColumn()
@XViewColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    @XViewColumn()
    deletionDate: Date;

    // given answer
    @Column()
    @XViewColumn()
    givenAnswerId: number;
    @ManyToOne(_ => GivenAnswer, x => x.answerBridges)
    @JoinColumn({ name: 'given_answer_id' })
    givenAnswer: Relation<GivenAnswer>;

    // answer
    @Column()
    @XViewColumn()
    answerVersionId: number;
    @ManyToOne(_ => AnswerVersion, x => x.givenAnswerBridges)
    @XJoinColumn<AnswerGivenAnswerBridge>('answerVersionId')
    answerVersion: Relation<AnswerVersion>;
}