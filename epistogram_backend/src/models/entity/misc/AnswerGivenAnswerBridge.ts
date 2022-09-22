import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { IsDeletedFlag, XJoinColumn, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { AnswerVersion } from '../answer/AnswerVersion';
import { GivenAnswer } from './GivenAnswer';
import { Id } from '../../../shared/types/versionId';

@Entity()
export class AnswerGivenAnswerBridge {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'AnswerGivenAnswerBridge'>;

    @IsDeletedFlag()
    @DeleteDateColumn()
    @XViewColumn()
    deletionDate: Date | null;

    @Column()
    @XViewColumn()
    score: number;

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
