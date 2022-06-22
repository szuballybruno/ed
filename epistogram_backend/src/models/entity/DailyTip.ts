import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { DailyTipOccurrence } from './DailyTipOccurrence';
import { PersonalityTraitCategory } from './PersonalityTraitCategory';
import { StorageFile } from './StorageFile';

@Entity()
export class DailyTip {

    @PrimaryGeneratedColumn()
    @XViewColumn()
    id: number;

    @Column()
    @XViewColumn()
    description: string;

    @Column()
    @XViewColumn()
    isLive: boolean;

    @Column()
    @XViewColumn()
    isMax: boolean;

    // TO MANY

    // occurrances
    @OneToMany(_ => DailyTipOccurrence, x => x.dailyTip)
    @JoinColumn()
    occurrences: Relation<DailyTipOccurrence>[];

    // TO ONE 

    // personality trait 
    @Column()
    @XViewColumn()
    personalityTraitCategoryId: number;
    @OneToMany(_ => PersonalityTraitCategory, x => x.tips)
    @JoinColumn({ name: 'personality_trait_category_id' })
    personalityTraitCategory: Relation<PersonalityTraitCategory>;

    // video file
    @Column({ type: 'int', nullable: true })
    @XViewColumn()
    videoFileId: number | null;
    @OneToOne(_ => StorageFile)
    @JoinColumn({ name: 'video_file_id' })
    videoFile: Relation<StorageFile> | null;
}