import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsDeletedFlag, XOneToMany } from '../../../services/XORM/XORMDecorators';
import { AnswerVersion } from './AnswerVersion';

@Entity()
export class AnswerData {

    @PrimaryGeneratedColumn()
    id: number;

    @IsDeletedFlag()
    @DeleteDateColumn()
    deletionDate: Date | null;

    @Column()
    text: string;

    @Column({ type: 'bool', nullable: true })
    isCorrect: boolean | null;

    // answer versions 
    @XOneToMany<AnswerData>()(() => AnswerVersion, x => x.answerData)
    answerVersions: AnswerVersion[];
}