import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { AnswerVersion } from './AnswerVersion';

@Entity()
export class Answer {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    // TO MANY

    // answer versions 
    @XOneToMany<Answer>()(() => AnswerVersion, x => x.answer)
    answerVersions: AnswerVersion[];
}