import { Column, Entity, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XJoinColumn, XManyToOne, XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { AnswerGivenAnswerBridge } from '../AnswerGivenAnswerBridge';
import { QuestionVersion } from '../question/QuestionVersion';
import { Answer } from './Answer';
import { AnswerData } from './AnswerData';

@Entity()
export class AnswerVersion {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    // TO ONE

    // question 
    @Column()
    @XViewColumn()
    questionVersionId: number;
    @XManyToOne<AnswerVersion>()(() => QuestionVersion, x => x.answerVersions)
    @XJoinColumn<AnswerVersion>('questionVersionId')
    questionVersion: Relation<QuestionVersion>;

    @Column()
    @XViewColumn()
    answerId: number;
    @XManyToOne<AnswerVersion>()(() => Answer, x => x.answerVersions)
    @XJoinColumn<AnswerVersion>('answerId')
    answer: Relation<Answer>;

    @Column()
    @XViewColumn()
    answerDataId: number;
    @XManyToOne<AnswerVersion>()(() => AnswerData, x => x.answerVersions)
    @XJoinColumn<AnswerVersion>('answerDataId')
    answerData: Relation<AnswerData>;

    // TO MANY

    // given answer bridges
    @XOneToMany<AnswerVersion>()(() => AnswerGivenAnswerBridge, x => x.answerVersion)
    givenAnswerBridges: Relation<AnswerGivenAnswerBridge>[];
}