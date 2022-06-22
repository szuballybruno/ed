import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsDeletedFlag, XOneToMany, XViewColumn } from '../../../services/XORM/XORMDecorators';
import { AnswerVersion } from './AnswerVersion';

@Entity()
export class AnswerData {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

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