import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from '../../MyORM';
import { XViewColumn } from '../../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';
import { DailyTip } from './DailyTip';
import { QuestionVersion } from '../question/QuestionVersion';

@Entity()
export class PersonalityTraitCategory {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: Id<'PersonalityTraitCategory'>;

    @Column()
    @XViewColumn()
    title: string;

    @Column()
    @XViewColumn()
    minLabel: string;

    @Column()
    @XViewColumn()
    maxLabel: string;

    @Column()
    @XViewColumn()
    minDescription: string;

    @Column()
    @XViewColumn()
    maxDescription: string;

    // TO MANY

    // questions
    @OneToMany(_ => QuestionVersion, x => x.personalityTraitCategory)
    @JoinColumn()
    questionVersions: QuestionVersion[];

    // daily tips 
    @OneToMany(_ => DailyTip, x => x.personalityTraitCategory)
    @JoinColumn()
    tips: DailyTip[];
}