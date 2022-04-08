import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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
    videoFile: StorageFile | null;

    // occurrances
    @OneToMany(_ => DailyTipOccurrence, x => x.dailyTip)
    @JoinColumn()
    occurrences: DailyTipOccurrence[];

    // personality trait 
    @Column()
    personalityTraitCategoryId: number;

    @OneToMany(_ => PersonalityTraitCategory, x => x.tips)
    @JoinColumn({ name: 'personality_trait_category_id' })
    personalityTraitCategory: PersonalityTraitCategory;
}