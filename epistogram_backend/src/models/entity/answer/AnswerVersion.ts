import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { XJoinColumn, XManyToOne, XOneToMany } from '../../../services/XORM/XORMDecorators';
import { AnswerGivenAnswerBridge } from '../AnswerGivenAnswerBridge';
import { QuestionVersion } from '../question/QuestionVersion';
import { Answer } from './Answer';
import { AnswerData } from './AnswerData';

@Entity()
export class AnswerVersion {

    @PrimaryGeneratedColumn()
    id: number;

    // question 
    @Column()
    questionVersionId: number;
    @XManyToOne<AnswerVersion>()(() => QuestionVersion, x => x.answerVersions)
    @XJoinColumn<AnswerVersion>('questionVersionId')
    questionVersion: QuestionVersion;

    @Column()
    answerId: number;
    @XManyToOne<AnswerVersion>()(() => Answer, x => x.answerVersions)
    @XJoinColumn<AnswerVersion>('answerId')
    answer: Answer;

    @Column()
    answerDataId: number;
    @XManyToOne<AnswerVersion>()(() => AnswerData, x => x.answerVersions)
    @XJoinColumn<AnswerVersion>('answerDataId')
    answerData: AnswerData;

    // given answer bridges
    @XOneToMany<AnswerVersion>()(() => AnswerGivenAnswerBridge, x => x.answerVersion)
    givenAnswerBridges: AnswerGivenAnswerBridge[];
}