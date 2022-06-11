import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CourseData } from '../course/CourseData';
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
    minValue: number | null;

    @Column({ type: 'int', nullable: true })
    maxValue: number | null;

    @Column({ type: 'text', nullable: true })
    minLabel: string | null;

    @Column({ type: 'text', nullable: true })
    maxLabel: string | null;

    @Column({ type: 'int', nullable: true })
    stepValue: number | null;

    @Column({ type: 'text', nullable: true })
    valuePostfix: string | null;

    // answers 
    @OneToMany(_ => PrequizAnswer, x => x.question)
    @JoinColumn()
    answers: PrequizAnswer[];

    // user answers 
    @OneToMany(_ => PrequizUserAnswer, x => x.question)
    @JoinColumn()
    userAnswers: PrequizUserAnswer[];
}