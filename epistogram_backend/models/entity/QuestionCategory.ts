import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./Question";

@Entity()
export class QuestionCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(_ => Question, x => x.category)
    @JoinColumn()
    questions: Question[];
}