import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { DeletionDateColumn, XJoinColumn, XViewColumn } from '@episto/xorm';
import { AnswerVersion } from '../answer/AnswerVersion';
import { GivenAnswer } from './GivenAnswer';
import { Id } from '@episto/commontypes';

@Entity()
export class AnswerGivenAnswerBridge {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'AnswerGivenAnswerBridge'>;

    @DeletionDateColumn()
    @DeleteDateColumn()
    @XViewColumn()
    deletionDate: Date | null;

    // given answer
    @Column()
    @XViewColumn()
    givenAnswerId: Id<'GivenAnswer'>;
    @ManyToOne(_ => GivenAnswer, x => x.answerBridges)
    @JoinColumn({ name: 'given_answer_id' })
    givenAnswer: Relation<GivenAnswer>;

    // answer
    @Column()
    @XViewColumn()
    answerVersionId: Id<'AnswerVersion'>;
    @ManyToOne(_ => AnswerVersion, x => x.givenAnswerBridges)
    @XJoinColumn<AnswerGivenAnswerBridge>('answerVersionId')
    answerVersion: Relation<AnswerVersion>;
}
