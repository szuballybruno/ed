import {Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation} from 'typeorm';
import {IsDeletedFlag, XJoinColumn, XViewColumn} from '../../services/XORM/XORMDecorators';
import {AnswerVersion} from './answer/AnswerVersion';
import {GivenAnswer} from './GivenAnswer';
import {Id} from '../../shared/types/versionId';

@Entity()
export class AnswerGivenAnswerBridge {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'AnswerGivenAnswerBridge'>;

    @IsDeletedFlag()
    @DeleteDateColumn()
    @XViewColumn()
    deletionDate: Date | null;

    // given answer
    @Column()
    @XViewColumn()
    givenAnswerId: number;
    @ManyToOne(_ => GivenAnswer, x => x.answerBridges)
    @JoinColumn({name: 'given_answer_id'})
    givenAnswer: Relation<GivenAnswer>;

    // answer
    @Column()
    @XViewColumn()
    answerVersionId: number;
    @ManyToOne(_ => AnswerVersion, x => x.givenAnswerBridges)
    @XJoinColumn<AnswerGivenAnswerBridge>('answerVersionId')
    answerVersion: Relation<AnswerVersion>;
}
