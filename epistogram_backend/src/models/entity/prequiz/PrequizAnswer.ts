import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TempomatAdjustmentValue } from '../TempomatAdjustmentValue';
import { PrequizQuestion } from './PrequizQuestion';
import { PrequizUserAnswer } from './PrequizUserAnswer';

@Entity()
export class PrequizAnswer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column({ type: 'double precision', nullable: true })
    value: number;

    // question 
    @Column()
    questionId: number;

    @ManyToOne(_ => PrequizQuestion, x => x.answers)
    @JoinColumn({ name: 'question_id' })
    question: PrequizQuestion;

    // user answers 
    @OneToMany(_ => PrequizUserAnswer, x => x.answer)
    @JoinColumn()
    userAnswers: PrequizUserAnswer[];

    // tempomat adjustment values
    @JoinColumn()
    @OneToMany(_ => TempomatAdjustmentValue, x => x.prequizAnswer)
    tempomatAdjustmentValues: TempomatAdjustmentValue[];
}