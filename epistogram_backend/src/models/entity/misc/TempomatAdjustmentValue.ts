import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from '../../MyORM';
import { XViewColumn } from '../../../services/XORM/XORMDecorators';
import { TempomatModeType } from '../../../shared/types/sharedTypes';
import { PrequizAnswer } from '../prequiz/PrequizAnswer';

@Entity()
export class TempomatAdjustmentValue {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    @Column()
    @XViewColumn()
    minValue: number;

    @Column()
    @XViewColumn()
    maxValue: number;

    @Column({ type: 'text' })
    @XViewColumn()
    tempomatMode: TempomatModeType;

    // TO ONE 

    // prequiz answer 
    @Column()
    @XViewColumn()
    prequizAnswerId: number;
    @JoinColumn({ name: 'prequiz_answer_id' })
    @ManyToOne(_ => PrequizAnswer, x => x.tempomatAdjustmentValues)
    prequizAnswer: Relation<PrequizAnswer>;
}