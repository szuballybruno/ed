import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from '../../MyORM';
import { XViewColumn } from '@episto/xorm';
import { QuestionData } from '../question/QuestionData';

@Entity()
export class QuestionType {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    @Column()
    @XViewColumn()
    name: string;

    // TO MANY

    // questions
    @OneToMany(_ => QuestionData, x => x.type)
    @JoinColumn()
    questions: QuestionData[];
}