import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TempomatModeType } from '../../shared/types/sharedTypes';
import { PrequizAnswer } from './prequiz/PrequizAnswer';

@Entity()
export class TempomatAdjustmentValue {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    minValue: number;

    @Column()
    maxValue: number;

    @Column({ type: 'text' })
    tempomatMode: TempomatModeType;

    // prequiz answer 
    @Column()
    prequizAnswerId: number;

    @JoinColumn({ name: 'prequiz_answer_id' })
    @ManyToOne(_ => PrequizAnswer, x => x.tempomatAdjustmentValues)
    prequizAnswer: PrequizAnswer;
}