import { Entity, PrimaryGeneratedColumn } from '../../MyORM';
import { XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';
import { QuestionVersion } from './QuestionVersion';

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'Question'>;

    // TO MANY

    // question versions 
    @XOneToMany<Question>()(() => QuestionVersion, x => x.question)
    questionVersions: QuestionVersion[];
}