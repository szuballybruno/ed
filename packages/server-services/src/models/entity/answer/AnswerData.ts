import { Column, Entity, PrimaryGeneratedColumn } from '../../MyORM';
import { XOneToMany, XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';
import { AnswerVersion } from './AnswerVersion';

@Entity()
export class AnswerData {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'AnswerData'>;

    @Column()
    @XViewColumn()
    text: string;

    @Column({ type: 'bool' })
    @XViewColumn()
    isCorrect: boolean | null;

    // TO MANY

    // answer versions 
    @XOneToMany<AnswerData>()(() => AnswerVersion, x => x.answerData)
    answerVersions: AnswerVersion[];
}