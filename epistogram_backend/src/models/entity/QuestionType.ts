import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./Question";

@Entity()
export class QuestionType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // questions
    @OneToMany(_ => Question, x => x.type)
    @JoinColumn()
    questions: Question[];
}