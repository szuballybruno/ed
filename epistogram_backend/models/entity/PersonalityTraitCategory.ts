import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./Question";

@Entity()
export class PersonalityTraitCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    minLabel: string;

    @Column()
    maxLabel: string;

    @Column()
    minDescription: string;

    @Column()
    maxDescription: string;

    // questions
    @OneToMany(_ => Question, x => x.personalityTraitCategory)
    @JoinColumn()
    questions: Question[];
}