import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '../../../shared/types/versionId';
import { PrequizAnswer } from './PrequizAnswer';
import { PrequizUserAnswer } from './PrequizUserAnswer';

@Entity()
export class PrequizQuestion {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<PrequizQuestion>;

    @Column()
    @XViewColumn()
    text: string;

    @Column()
    @XViewColumn()
    isNumericAnswer: boolean;

    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    minValue: number | null;

    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    maxValue: number | null;

    @Column({ type: 'text', nullable: true })
    @XViewColumn()
    minLabel: string | null;

    @Column({ type: 'text', nullable: true })
    @XViewColumn()
    maxLabel: string | null;

    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    stepValue: number | null;

    @Column({ type: 'text', nullable: true })
    @XViewColumn()
    valuePostfix: string | null;

    // TO MANY

    // answers 
    @OneToMany(_ => PrequizAnswer, x => x.question)
    @JoinColumn()
    answers: PrequizAnswer[];

    // user answers 
    @OneToMany(_ => PrequizUserAnswer, x => x.question)
    @JoinColumn()
    userAnswers: PrequizUserAnswer[];
}