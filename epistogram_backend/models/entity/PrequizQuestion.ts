import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PrequizAnswer } from "./PrequizAnswer";
import { PrequizUserAnswer } from "./PrequizUserAnswer";

@Entity()
export class PrequizQuestion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column() 
    isNumericAnswer: boolean;

    // answers 
    @OneToMany(_ => PrequizAnswer, x => x.question)
    @JoinColumn()
    answers: PrequizAnswer[];

    // user answers 
    @OneToMany(_ => PrequizUserAnswer, x => x.question)
    @JoinColumn()
    userAnswers: PrequizUserAnswer[];
}