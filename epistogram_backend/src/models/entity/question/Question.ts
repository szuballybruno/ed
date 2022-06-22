import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { QuestionVersion } from './QuestionVersion';

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    // TO MANY

    // question versions 
    @XOneToMany<Question>()(() => QuestionVersion, x => x.question)
    questionVersions: QuestionVersion[];
}