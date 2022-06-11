import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { XOneToMany } from '../../../services/XORM/XORMDecorators';
import { QuestionVersion } from './QuestionVersion';

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    // question versions 
    @XOneToMany<Question>()(QuestionVersion, x => x.question)
    questionVersions: QuestionVersion[];
}