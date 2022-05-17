import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { DailyTipOccurrence } from './DailyTipOccurrence';
import { PersonalityTraitCategory } from './PersonalityTraitCategory';
import { StorageFile } from './StorageFile';

@Entity()
export class DailyTip {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    isLive: boolean;

    @Column()
    isMax: boolean;

    // video file
    @Column({ nullable: true, type: 'int' })
    videoFileId: number | null;

    @OneToOne(_ => StorageFile)
    @JoinColumn({ name: 'video_file_id' })
    videoFile: Relation<StorageFile> | null;

    // occurrances
    @OneToMany(_ => DailyTipOccurrence, x => x.dailyTip)
    @JoinColumn()
    occurrences: Relation<DailyTipOccurrence>[];

    // personality trait 
    @Column()
    personalityTraitCategoryId: number;

    @OneToMany(_ => PersonalityTraitCategory, x => x.tips)
    @JoinColumn({ name: 'personality_trait_category_id' })
    personalityTraitCategory: Relation<PersonalityTraitCategory>;
}