import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { XOneToMany } from '../../../services/XORM/XORMDecorators';
import { AnswerVersion } from './AnswerVersion';

@Entity()
export class Answer {

    @PrimaryGeneratedColumn()
    id: number;

    // answer versions 
    @XOneToMany<Answer>()(AnswerVersion, x => x.answer)
    answerVersions: AnswerVersion[];
}