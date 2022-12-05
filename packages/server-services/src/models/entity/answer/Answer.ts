import { Entity, PrimaryGeneratedColumn } from '../../MyORM';
import { XOneToMany, XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';
import { AnswerVersion } from './AnswerVersion';

@Entity()
export class Answer {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'Answer'>;

    // TO MANY

    // answer versions 
    @XOneToMany<Answer>()(() => AnswerVersion, x => x.answer)
    answerVersions: AnswerVersion[];
}