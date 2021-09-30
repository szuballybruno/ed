import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PersonalityCategoryDescription } from "./PersonalityCategoryDescription";
import { Question } from "./Question";

@Entity()
export class QuestionCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    minLabel: string;

    @Column()
    maxLabel: string;

    // questions
    @OneToMany(_ => Question, x => x.category)
    @JoinColumn()
    questions: Question[];

    // personality category description
    @OneToOne(_ => PersonalityCategoryDescription, x => x.questionCategory)
    @JoinColumn()
    personalityCategoryDescription: PersonalityCategoryDescription;
}