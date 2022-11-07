import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from '../../MyORM';
import { XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
import { TempomatAdjustmentValue } from '../misc/TempomatAdjustmentValue';
import { PrequizQuestion } from './PrequizQuestion';
import { PrequizUserAnswer } from './PrequizUserAnswer';

@Entity()
export class PrequizAnswer {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'PrequizAnswer'>;

    @Column()
    @XViewColumn()
    text: string;

    @Column({ type: 'double precision', nullable: true })
    @XViewColumn()
    value: number | null;

    // TO ONE

    // question 
    @Column()
    @XViewColumn()
    questionId: Id<'PrequizQuestion'>;
    @ManyToOne(_ => PrequizQuestion, x => x.answers)
    @JoinColumn({ name: 'question_id' })
    question: PrequizQuestion;

    // TO MANY

    // user answers 
    @OneToMany(_ => PrequizUserAnswer, x => x.answer)
    @JoinColumn()
    userAnswers: PrequizUserAnswer[];

    // tempomat adjustment values
    @JoinColumn()
    @OneToMany(_ => TempomatAdjustmentValue, x => x.prequizAnswer)
    tempomatAdjustmentValues: TempomatAdjustmentValue[];
}