import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from '../Course';
import { PrequizAnswer } from './PrequizAnswer';
import { PrequizUserAnswer } from './PrequizUserAnswer';

@Entity()
export class PrequizQuestion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    isNumericAnswer: boolean;

    @Column({ type: 'int', nullable: true })
    minValue: number;

    @Column({ type: 'int', nullable: true })
    maxValue: number;

    @Column({ type: 'text', nullable: true })
    minLabel: string;

    @Column({ type: 'text', nullable: true })
    maxLabel: string;

    @Column({ type: 'int', nullable: true })
    stepValue: number;

    @Column({ type: 'text', nullable: true })
    valuePostfix: string;

    // answers 
    @OneToMany(_ => PrequizAnswer, x => x.question)
    @JoinColumn()
    answers: PrequizAnswer[];

    // user answers 
    @OneToMany(_ => PrequizUserAnswer, x => x.question)
    @JoinColumn()
    userAnswers: PrequizUserAnswer[];
}