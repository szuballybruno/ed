import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionData } from './question/QuestionData';

@Entity()
export class QuestionType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // questions
    @OneToMany(_ => QuestionData, x => x.type)
    @JoinColumn()
    questions: QuestionData[];
}