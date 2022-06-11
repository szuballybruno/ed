import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DailyTip } from './DailyTip';
import { QuestionData } from './question/QuestionData';

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
    @OneToMany(_ => QuestionData, x => x.personalityTraitCategory)
    @JoinColumn()
    questions: QuestionData[];

    // daily tips 
    @OneToMany(_ => DailyTip, x => x.personalityTraitCategory)
    @JoinColumn()
    tips: DailyTip[];
}